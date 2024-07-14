function exportToSTL(brep) {
  let stlContent = 'solid BREP\n';

  brep.faces.forEach(face => {
    const surface = face.surface;
    const controlPoints = surface.controlPoints;

    for (let i = 0; i < controlPoints.length - 1; i++) {
      for (let j = 0; j < controlPoints[i].length - 1; j++) {
        const p1 = controlPoints[i][j];
        const p2 = controlPoints[i + 1][j];
        const p3 = controlPoints[i][j + 1];
        const p4 = controlPoints[i + 1][j + 1];

        stlContent += generateFacet(p1, p2, p3);
        stlContent += generateFacet(p3, p2, p4);
      }
    }
  });

  stlContent += 'endsolid BREP\n';
  return stlContent;
}

function generateFacet(p1, p2, p3) {
  const normal = calculateNormal(p1, p2, p3);
  return `facet normal ${normal.x} ${normal.y} ${normal.z}\n` +
         `  outer loop\n` +
         `    vertex ${p1.x} ${p1.y} ${p1.z}\n` +
         `    vertex ${p2.x} ${p2.y} ${p2.z}\n` +
         `    vertex ${p3.x} ${p3.y} ${p3.z}\n` +
         `  endloop\n` +
         `endfacet\n`;
}

function calculateNormal(p1, p2, p3) {
  const u = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z
  };
  const v = {
    x: p3.x - p1.x,
    y: p3.y - p1.y,
    z: p3.z - p1.z
  };

  return {
    x: u.y * v.z - u.z * v.y,
    y: u.z * v.x - u.x * v.z,
    z: u.x * v.y - u.y * v.x
  };
}

export { exportToSTL };
