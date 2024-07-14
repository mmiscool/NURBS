class Surface {
  constructor(controlPoints, degrees, knotVectors) {
    this.controlPoints = controlPoints;
    this.degrees = degrees;
    this.knotVectors = knotVectors;
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
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= m; j++) {
        point.x += basisFunctionsU[i] * basisFunctionsV[j] * this.controlPoints[i][j].x;
        point.y += basisFunctionsU[i] * basisFunctionsV[j] * this.controlPoints[i][j].y;
        point.z += basisFunctionsU[i] * basisFunctionsV[j] * this.controlPoints[i][j].z;
      }
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
