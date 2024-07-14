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
  return {
    controlPoints,
    degrees,
    knotVectors
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
  return {
    controlPoints,
    degrees,
    knotVectors
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
  return {
    controlPoints,
    degrees,
    knotVectors
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
  return {
    controlPoints,
    degrees,
    knotVectors
  };
}

export { createPlane, createCylinder, createCone, createSphere };
