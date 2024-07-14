class Surface {
  constructor(controlPoints, degrees, knotVectors, weights = null) {
    this.controlPoints = controlPoints;
    this.degrees = degrees;
    this.knotVectors = knotVectors;
    this.weights = weights || controlPoints.map(row => new Array(row.length).fill(1));
  }

  evaluate(u, v) {
    const n = this.controlPoints.length - 1;
    const m = this.controlPoints[0].length - 1;
    const du = this.degrees[0];
    const dv = this.degrees[1];
    const ku = this.knotVectors[0];
    const kv = this.knotVectors[1];

    let basisFunctionsU = new Array(n + 1).fill(0);
    let basisFunctionsV = new Array(m + 1).fill(0);

    for (let i = 0; i <= n; i++) {
      basisFunctionsU[i] = this.basisFunction(i, du, u, ku);
    }

    for (let j = 0; j <= m; j++) {
      basisFunctionsV[j] = this.basisFunction(j, dv, v, kv);
    }

    let point = { x: 0, y: 0, z: 0 };
    let weightSum = 0;
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= m; j++) {
        const weight = basisFunctionsU[i] * basisFunctionsV[j] * this.weights[i][j];
        point.x += weight * this.controlPoints[i][j].x;
        point.y += weight * this.controlPoints[i][j].y;
        point.z += weight * this.controlPoints[i][j].z;
        weightSum += weight;
      }
    }

    if (weightSum === 0) {
      return { x: 0, y: 0, z: 0 };
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

  derivative(u, v, orderU = 1, orderV = 1) {
    if (orderU === 0 && orderV === 0) {
      return this.evaluate(u, v);
    }

    const n = this.controlPoints.length - 1;
    const m = this.controlPoints[0].length - 1;
    const du = this.degrees[0];
    const dv = this.degrees[1];
    const ku = this.knotVectors[0];
    const kv = this.knotVectors[1];

    let basisFunctionsU = new Array(n + 1).fill(0);
    let basisFunctionsV = new Array(m + 1).fill(0);

    for (let i = 0; i <= n; i++) {
      basisFunctionsU[i] = this.basisFunctionDerivative(i, du, u, ku, orderU);
    }

    for (let j = 0; j <= m; j++) {
      basisFunctionsV[j] = this.basisFunctionDerivative(j, dv, v, kv, orderV);
    }

    let point = { x: 0, y: 0, z: 0 };
    let weightSum = 0;
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= m; j++) {
        const weight = basisFunctionsU[i] * basisFunctionsV[j] * this.weights[i][j];
        point.x += weight * this.controlPoints[i][j].x;
        point.y += weight * this.controlPoints[i][j].y;
        point.z += weight * this.controlPoints[i][j].z;
        weightSum += weight;
      }
    }

    if (weightSum === 0) {
      return { x: 0, y: 0, z: 0 };
    }

    point.x /= weightSum;
    point.y /= weightSum;
    point.z /= weightSum;

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

  refine(knotVectors) {
    const newKnotVectors = this.knotVectors.map((kv, i) => [...kv, ...knotVectors[i]].sort((a, b) => a - b));
    return new Surface(this.controlPoints, this.degrees, newKnotVectors, this.weights);
  }

  insertKnot(u, v) {
    const n = this.controlPoints.length - 1;
    const m = this.controlPoints[0].length - 1;
    const du = this.degrees[0];
    const dv = this.degrees[1];
    const ku = this.knotVectors[0];
    const kv = this.knotVectors[1];

    let newControlPoints = [];
    let newWeights = [];
    for (let i = 0; i <= n; i++) {
      newControlPoints.push([]);
      newWeights.push([]);
      for (let j = 0; j <= m; j++) {
        newControlPoints[i].push(this.controlPoints[i][j]);
        newWeights[i].push(this.weights[i][j]);
        if (ku[i] <= u && u < ku[i + 1] && kv[j] <= v && v < kv[j + 1]) {
          const alphaU = (u - ku[i]) / (ku[i + du] - ku[i]);
          const alphaV = (v - kv[j]) / (kv[j + dv] - kv[j]);
          newControlPoints[i].push({
            x: alphaU * this.controlPoints[i + 1][j].x + (1 - alphaU) * this.controlPoints[i][j].x,
            y: alphaU * this.controlPoints[i + 1][j].y + (1 - alphaU) * this.controlPoints[i][j].y,
            z: alphaU * this.controlPoints[i + 1][j].z + (1 - alphaU) * this.controlPoints[i][j].z
          });
          newWeights[i].push(alphaU * this.weights[i + 1][j] + (1 - alphaU) * this.weights[i][j]);
          newControlPoints[i].push({
            x: alphaV * this.controlPoints[i][j + 1].x + (1 - alphaV) * this.controlPoints[i][j].x,
            y: alphaV * this.controlPoints[i][j + 1].y + (1 - alphaV) * this.controlPoints[i][j].y,
            z: alphaV * this.controlPoints[i][j + 1].z + (1 - alphaV) * this.controlPoints[i][j].z
          });
          newWeights[i].push(alphaV * this.weights[i][j + 1] + (1 - alphaV) * this.weights[i][j]);
        }
      }
    }

    const newKnotVectors = [ku.slice(0, n + 1).concat(u).concat(ku.slice(n + 1)), kv.slice(0, m + 1).concat(v).concat(kv.slice(m + 1))];
    return new Surface(newControlPoints, this.degrees, newKnotVectors, newWeights);
  }

  removeKnot(u, v) {
    const n = this.controlPoints.length - 1;
    const m = this.controlPoints[0].length - 1;
    const du = this.degrees[0];
    const dv = this.degrees[1];
    const ku = this.knotVectors[0];
    const kv = this.knotVectors[1];

    let newControlPoints = [];
    let newWeights = [];
    for (let i = 0; i <= n; i++) {
      newControlPoints.push([]);
      newWeights.push([]);
      for (let j = 0; j <= m; j++) {
        if (ku[i] !== u && kv[j] !== v) {
          newControlPoints[i].push(this.controlPoints[i][j]);
          newWeights[i].push(this.weights[i][j]);
        }
      }
    }

    const newKnotVectors = [ku.filter(knot => knot !== u), kv.filter(knot => knot !== v)];
    return new Surface(newControlPoints, this.degrees, newKnotVectors, newWeights);
  }

  elevateDegree() {
    const n = this.controlPoints.length - 1;
    const m = this.controlPoints[0].length - 1;
    const du = this.degrees[0];
    const dv = this.degrees[1];
    const ku = this.knotVectors[0];
    const kv = this.knotVectors[1];

    let newControlPoints = [];
    let newWeights = [];
    for (let i = 0; i <= n; i++) {
      newControlPoints.push([]);
      newWeights.push([]);
      for (let j = 0; j <= m; j++) {
        newControlPoints[i].push(this.controlPoints[i][j]);
        newWeights[i].push(this.weights[i][j]);
        if (i < n && j < m) {
          const alphaU = (ku[i + du + 1] - ku[i + 1]) / (ku[i + du + 1] - ku[i]);
          const alphaV = (kv[j + dv + 1] - kv[j + 1]) / (kv[j + dv + 1] - kv[j]);
          newControlPoints[i].push({
            x: alphaU * this.controlPoints[i + 1][j].x + (1 - alphaU) * this.controlPoints[i][j].x,
            y: alphaU * this.controlPoints[i + 1][j].y + (1 - alphaU) * this.controlPoints[i][j].y,
            z: alphaU * this.controlPoints[i + 1][j].z + (1 - alphaU) * this.controlPoints[i][j].z
          });
          newWeights[i].push(alphaU * this.weights[i + 1][j] + (1 - alphaU) * this.weights[i][j]);
          newControlPoints[i].push({
            x: alphaV * this.controlPoints[i][j + 1].x + (1 - alphaV) * this.controlPoints[i][j].x,
            y: alphaV * this.controlPoints[i][j + 1].y + (1 - alphaV) * this.controlPoints[i][j].y,
            z: alphaV * this.controlPoints[i][j + 1].z + (1 - alphaV) * this.controlPoints[i][j].z
          });
          newWeights[i].push(alphaV * this.weights[i][j + 1] + (1 - alphaV) * this.weights[i][j]);
        }
      }
    }

    const newKnotVectors = [ku.slice(0, n + 1).concat(ku.slice(n + 1)), kv.slice(0, m + 1).concat(kv.slice(m + 1))];
    return new Surface(newControlPoints, [du + 1, dv + 1], newKnotVectors, newWeights);
  }

  intersect(surface) {
    const intersections = [];
    const tolerance = 1e-6;

    for (let u1 = 0; u1 <= 1; u1 += 0.01) {
      for (let v1 = 0; v1 <= 1; v1 += 0.01) {
        const point1 = this.evaluate(u1, v1);
        for (let u2 = 0; u2 <= 1; u2 += 0.01) {
          for (let v2 = 0; v2 <= 1; v2 += 0.01) {
            const point2 = surface.evaluate(u2, v2);
            if (Math.abs(point1.x - point2.x) < tolerance &&
                Math.abs(point1.y - point2.y) < tolerance &&
                Math.abs(point1.z - point2.z) < tolerance) {
              intersections.push({ u1, v1, u2, v2, point: point1 });
            }
          }
        }
      }
    }

    return intersections;
  }

  approximate(points, degrees) {
    const n = points.length - 1;
    const m = points[0].length - 1;
    const ku = new Array(n + degrees[0] + 2).fill(0).map((_, i) => i / (n + degrees[0] + 1));
    const kv = new Array(m + degrees[1] + 2).fill(0).map((_, i) => i / (m + degrees[1] + 1));

    const controlPoints = points.map(row => row.map(point => ({ x: point.x, y: point.y, z: point.z })));
    const weights = points.map(row => new Array(row.length).fill(1));

    return new Surface(controlPoints, degrees, [ku, kv], weights);
  }
}

export { Surface };
