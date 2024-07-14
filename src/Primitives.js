function createLine(startPoint, endPoint) {
  return {
    controlPoints: [startPoint, endPoint],
    degree: 1,
    knotVector: [0, 0, 1, 1]
  };
}

function createCircle(center, radius) {
  const controlPoints = [];
  const degree = 2;
  const knotVector = [0, 0, 0, 1, 1, 1];

  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    controlPoints.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
      z: center.z
    });
  }

  return {
    controlPoints,
    degree,
    knotVector
  };
}

function createEllipse(center, radiusX, radiusY) {
  const controlPoints = [];
  const degree = 2;
  const knotVector = [0, 0, 0, 1, 1, 1];

  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    controlPoints.push({
      x: center.x + radiusX * Math.cos(angle),
      y: center.y + radiusY * Math.sin(angle),
      z: center.z
    });
  }

  return {
    controlPoints,
    degree,
    knotVector
  };
}

function createArc(center, radius, startAngle, endAngle) {
  const controlPoints = [];
  const degree = 2;
  const knotVector = [0, 0, 0, 1, 1, 1];

  for (let i = 0; i < 3; i++) {
    const angle = startAngle + (i * (endAngle - startAngle)) / 2;
    controlPoints.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
      z: center.z
    });
  }

  return {
    controlPoints,
    degree,
    knotVector
  };
}

function createBezierCurve(controlPoints) {
  const degree = controlPoints.length - 1;
  const knotVector = [];
  for (let i = 0; i <= degree; i++) {
    knotVector.push(0);
  }
  for (let i = 0; i <= degree; i++) {
    knotVector.push(1);
  }
  return {
    controlPoints,
    degree,
    knotVector
  };
}

function createParabola(vertex, focus) {
  const controlPoints = [
    { x: vertex.x - 1, y: vertex.y, z: vertex.z },
    vertex,
    { x: vertex.x + 1, y: vertex.y, z: vertex.z }
  ];
  const degree = 2;
  const knotVector = [0, 0, 0, 1, 1, 1];
  return {
    controlPoints,
    degree,
    knotVector
  };
}

function createHyperbola(center, a, b) {
  const controlPoints = [
    { x: center.x - a, y: center.y, z: center.z },
    center,
    { x: center.x + a, y: center.y, z: center.z }
  ];
  const degree = 2;
  const knotVector = [0, 0, 0, 1, 1, 1];
  return {
    controlPoints,
    degree,
    knotVector
  };
}

function createSpline(controlPoints, degree) {
  const knotVector = [];
  for (let i = 0; i < controlPoints.length + degree + 1; i++) {
    knotVector.push(i);
  }
  return {
    controlPoints,
    degree,
    knotVector
  };
}

export { createLine, createCircle, createEllipse, createArc, createBezierCurve, createParabola, createHyperbola, createSpline };
