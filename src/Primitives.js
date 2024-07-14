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

export { createLine, createCircle, createEllipse, createArc };
