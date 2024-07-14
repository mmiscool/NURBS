class Curve {
  constructor(controlPoints, degree, knotVector) {
    this.controlPoints = controlPoints;
    this.degree = degree;
    this.knotVector = knotVector;
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
    for (let i = 0; i <= n; i++) {
      point.x += basisFunctions[i] * this.controlPoints[i].x;
      point.y += basisFunctions[i] * this.controlPoints[i].y;
      point.z += basisFunctions[i] * this.controlPoints[i].z;
    }

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
}

export { Curve };
