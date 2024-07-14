import { Point } from './Point';

function createPlane(width, height) {
  const controlPoints = [
    [new Point(0, 0, 0), new Point(width, 0, 0)],
    [new Point(0, height, 0), new Point(width, height, 0)]
  ];
  const degrees = [1, 1];
  const knotVectors = [
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ];
  const weights = [
    [1, 1],
    [1, 1]
  ];
  return {
    controlPoints,
    degrees,
    knotVectors,
    weights
  };
}

function createCylinder(radius, height) {
  const controlPoints = [
    [new Point(radius, 0, 0), new Point(radius, height, 0)],
    [new Point(-radius, 0, 0), new Point(-radius, height, 0)]
  ];
  const degrees = [1, 1];
  const knotVectors = [
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ];
  const weights = [
    [1, 1],
    [1, 1]
  ];
  return {
    controlPoints,
    degrees,
    knotVectors,
    weights
  };
}

function createCone(radius, height) {
  const controlPoints = [
    [new Point(radius, 0, 0), new Point(0, height, 0)],
    [new Point(-radius, 0, 0), new Point(0, height, 0)]
  ];
  const degrees = [1, 1];
  const knotVectors = [
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ];
  const weights = [
    [1, 1],
    [1, 1]
  ];
  return {
    controlPoints,
    degrees,
    knotVectors,
    weights
  };
}

function createSphere(radius) {
  const controlPoints = [
    [new Point(radius, 0, 0), new Point(0, radius, 0)],
    [new Point(-radius, 0, 0), new Point(0, -radius, 0)]
  ];
  const degrees = [1, 1];
  const knotVectors = [
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ];
  const weights = [
    [1, 1],
    [1, 1]
  ];
  return {
    controlPoints,
    degrees,
    knotVectors,
    weights
  };
}

function createRationalNURBSSurface(controlPoints, weights, degrees) {
  const knotVectors = [
    Array(controlPoints.length + degrees[0] + 1).fill(0).map((_, i) => i / (controlPoints.length + degrees[0])),
    Array(controlPoints[0].length + degrees[1] + 1).fill(0).map((_, i) => i / (controlPoints[0].length + degrees[1]))
  ];
  return {
    controlPoints,
    weights,
    degrees,
    knotVectors
  };
}

function trimSurface(surface, uStart, uEnd, vStart, vEnd) {
  const trimmedControlPoints = surface.controlPoints.slice(uStart, uEnd + 1).map(row => row.slice(vStart, vEnd + 1));
  const trimmedWeights = surface.weights.slice(uStart, uEnd + 1).map(row => row.slice(vStart, vEnd + 1));
  const trimmedKnotVectors = [
    surface.knotVectors[0].slice(uStart, uEnd + surface.degrees[0] + 1),
    surface.knotVectors[1].slice(vStart, vEnd + surface.degrees[1] + 1)
  ];
  return {
    controlPoints: trimmedControlPoints,
    weights: trimmedWeights,
    degrees: surface.degrees,
    knotVectors: trimmedKnotVectors
  };
}

function createNURBSFace(controlPoints, degrees, knotVectors, weights = null) {
  return {
    controlPoints,
    degrees,
    knotVectors,
    weights: weights || controlPoints.map(row => new Array(row.length).fill(1))
  };
}

function createTorus(radius, tubeRadius) {
  const controlPoints = [];
  const degrees = [2, 2];
  const knotVectors = [
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 1, 1]
  ];
  const weights = [];

  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      const u = (i * Math.PI) / 2;
      const v = (j * Math.PI) / 2;
      const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
      const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
      const z = tubeRadius * Math.sin(v);
      row.push(new Point(x, y, z));
    }
    controlPoints.push(row);
    weights.push([1, 1, 1, 1]);
  }

  return {
    controlPoints,
    degrees,
    knotVectors,
    weights
  };
}

function createCube(x, y, z) {
  const controlPoints = [
    [
      new Point(0, 0, 0),
      new Point(x, 0, 0),
      new Point(x, y, 0),
      new Point(0, y, 0)
    ],
    [
      new Point(0, 0, z),
      new Point(x, 0, z),
      new Point(x, y, z),
      new Point(0, y, z)
    ]
  ];
  const degrees = [1, 1];
  const knotVectors = [
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ];
  const weights = [
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  ];

  return {
    controlPoints,
    degrees,
    knotVectors,
    weights
  };
}

export { createPlane, createCylinder, createCone, createSphere, createRationalNURBSSurface, trimSurface, createNURBSFace, createTorus, createCube };
