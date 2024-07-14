class Curve {
  constructor(controlPoints, degree, knotVector, weights = null) {
    this.controlPoints = controlPoints;
    this.degree = degree;
    this.knotVector = knotVector;
    this.weights = weights || new Array(controlPoints.length).fill(1);
  }

  evaluate(t) {
    const n = this.controlPoints.length - 1;
    const d = this.degree;
    const k = this.knotVector;

    let basisFunctions = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
      basisFunctions[i] = this.basisFunction(i, d, t, k);
    }

    let point = { x: 0, y: 0, z: 0 };
    let weightSum = 0;
    for (let i = 0; i <= n; i++) {
      const weight = basisFunctions[i] * this.weights[i];
      point.x += weight * this.controlPoints[i].x;
      point.y += weight * this.controlPoints[i].y;
      point.z += weight * this.controlPoints[i].z;
      weightSum += weight;
    }

    point.x /= weightSum;
    point.y /= weightSum;
    point.z /= weightSum;

    return point;
  }

  basisFunction(i, d, t, k) {
    if (d === 0) {
      return k[i] <= t && t < k[i + 1] ? 1 : 0;
    }

    const a = (t - k[i]) / (k[i + d] - k[i]);
    const b = (k[i + d + 1] - t) / (k[i + d + 1] - k[i + 1]);

    return a * this.basisFunction(i, d - 1, t, k) + b * this.basisFunction(i + 1, d - 1, t, k);
  }

  derivative(t, order = 1) {
    if (order === 0) {
      return this.evaluate(t);
    }

    const n = this.controlPoints.length - 1;
    const d = this.degree;
    const k = this.knotVector;

    let basisFunctions = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
      basisFunctions[i] = this.basisFunctionDerivative(i, d, t, k, order);
    }

    let point = { x: 0, y: 0, z: 0 };
    for (let i = 0; i <= n; i++) {
      point.x += basisFunctions[i] * this.controlPoints[i].x;
      point.y += basisFunctions[i] * this.controlPoints[i].y;
      point.z += basisFunctions[i] * this.controlPoints[i].z;
    }

    return point;
  }

  basisFunctionDerivative(i, d, t, k, order) {
    if (order === 0) {
      return this.basisFunction(i, d, t, k);
    }

    const a = d / (k[i + d] - k[i]);
    const b = d / (k[i + d + 1] - k[i + 1]);

    return a * (this.basisFunctionDerivative(i, d - 1, t, k, order - 1) - this.basisFunctionDerivative(i + 1, d - 1, t, k, order - 1)) +
           b * (this.basisFunctionDerivative(i + 1, d - 1, t, k, order - 1) - this.basisFunctionDerivative(i, d - 1, t, k, order - 1));
  }

  refine(knotVector) {
    const newKnotVector = [...this.knotVector, ...knotVector].sort((a, b) => a - b);
    return new Curve(this.controlPoints, this.degree, newKnotVector, this.weights);
  }

  insertKnot(t) {
    const n = this.controlPoints.length - 1;
    const d = this.degree;
    const k = this.knotVector;

    let newControlPoints = [];
    let newWeights = [];
    for (let i = 0; i <= n; i++) {
      newControlPoints.push(this.controlPoints[i]);
      newWeights.push(this.weights[i]);
      if (k[i] <= t && t < k[i + 1]) {
        const alpha = (t - k[i]) / (k[i + d] - k[i]);
        newControlPoints.push({
          x: alpha * this.controlPoints[i + 1].x + (1 - alpha) * this.controlPoints[i].x,
          y: alpha * this.controlPoints[i + 1].y + (1 - alpha) * this.controlPoints[i].y,
          z: alpha * this.controlPoints[i + 1].z + (1 - alpha) * this.controlPoints[i].z
        });
        newWeights.push(alpha * this.weights[i + 1] + (1 - alpha) * this.weights[i]);
      }
    }

    const newKnotVector = [...k.slice(0, n + 1), t, ...k.slice(n + 1)];
    return new Curve(newControlPoints, d, newKnotVector, newWeights);
  }

  removeKnot(t) {
    const n = this.controlPoints.length - 1;
    const d = this.degree;
    const k = this.knotVector;

    let newControlPoints = [];
    let newWeights = [];
    for (let i = 0; i <= n; i++) {
      if (k[i] !== t) {
        newControlPoints.push(this.controlPoints[i]);
        newWeights.push(this.weights[i]);
      }
    }

    const newKnotVector = k.filter(knot => knot !== t);
    return new Curve(newControlPoints, d, newKnotVector, newWeights);
  }

  elevateDegree() {
    const n = this.controlPoints.length - 1;
    const d = this.degree;
    const k = this.knotVector;

    let newControlPoints = [];
    let newWeights = [];
    for (let i = 0; i <= n; i++) {
      newControlPoints.push(this.controlPoints[i]);
      newWeights.push(this.weights[i]);
      if (i < n) {
        const alpha = (k[i + d + 1] - k[i + 1]) / (k[i + d + 1] - k[i]);
        newControlPoints.push({
          x: alpha * this.controlPoints[i + 1].x + (1 - alpha) * this.controlPoints[i].x,
          y: alpha * this.controlPoints[i + 1].y + (1 - alpha) * this.controlPoints[i].y,
          z: alpha * this.controlPoints[i + 1].z + (1 - alpha) * this.controlPoints[i].z
        });
        newWeights.push(alpha * this.weights[i + 1] + (1 - alpha) * this.weights[i]);
      }
    }

    const newKnotVector = [...k.slice(0, n + 1), ...k.slice(n + 1)];
    return new Curve(newControlPoints, d + 1, newKnotVector, newWeights);
  }

  intersect(curve) {
    const intersections = [];
    const tolerance = 1e-6;

    for (let t1 = 0; t1 <= 1; t1 += 0.01) {
      const point1 = this.evaluate(t1);
      for (let t2 = 0; t2 <= 1; t2 += 0.01) {
        const point2 = curve.evaluate(t2);
        if (Math.abs(point1.x - point2.x) < tolerance &&
            Math.abs(point1.y - point2.y) < tolerance &&
            Math.abs(point1.z - point2.z) < tolerance) {
          intersections.push({ t1, t2, point: point1 });
        }
      }
    }

    return intersections;
  }

  approximate(points, degree) {
    const n = points.length - 1;
    const k = new Array(n + degree + 2).fill(0).map((_, i) => i / (n + degree + 1));

    const controlPoints = points.map(point => ({ x: point.x, y: point.y, z: point.z }));
    const weights = new Array(points.length).fill(1);

    return new Curve(controlPoints, degree, k, weights);
  }
}

export { Curve };
