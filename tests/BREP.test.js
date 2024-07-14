import { BREP } from '../src/BREP/BREP';

describe('BREP', () => {
  test('should create a BREP Taurus', () => {
    const brep = new BREP();
    const taurus = brep.createBREPTaurus(5, 2);
    expect(taurus).toBeDefined();
    // Add more assertions to verify the properties of the created Taurus
  });

  test('should create a BREP Cylinder', () => {
    const brep = new BREP();
    const cylinder = brep.createBREPCylinder(3, 7);
    expect(cylinder).toBeDefined();
    // Add more assertions to verify the properties of the created Cylinder
  });

  test('should create a BREP Cone', () => {
    const brep = new BREP();
    const cone = brep.createBREPCone(3, 7);
    expect(cone).toBeDefined();
    // Add more assertions to verify the properties of the created Cone
  });

  test('should create a BREP Cube', () => {
    const brep = new BREP();
    const cube = brep.createBREPCube(3, 3, 3);
    expect(cube).toBeDefined();
    // Add more assertions to verify the properties of the created Cube
  });

  test('should perform boolean operations', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const unionResult = brep1.booleanOperation('union', brep2);
    const intersectionResult = brep1.booleanOperation('intersection', brep2);
    const differenceResult = brep1.booleanOperation('difference', brep2);
    expect(unionResult).toBeDefined();
    expect(intersectionResult).toBeDefined();
    expect(differenceResult).toBeDefined();

    // Add assertions to verify the properties of the boolean operations
    expect(unionResult.faces.length).toBe(brep1.faces.length + brep2.faces.length);
    expect(intersectionResult.vertices.length).toBeGreaterThan(0);
    expect(differenceResult.faces.length).toBe(brep1.faces.length);
  });

  test('should perform intersection', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const result = brep1.intersection(brep2);
    expect(result).toBeDefined();

    // Add assertions to verify the properties of the intersection
    expect(result.vertices.length).toBeGreaterThan(0);
  });

  test('should perform union', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const result = brep1.union(brep2);
    expect(result).toBeDefined();

    // Add assertions to verify the properties of the union
    expect(result.faces.length).toBe(brep1.faces.length + brep2.faces.length);
  });

  test('should perform difference', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const result = brep1.difference(brep2);
    expect(result).toBeDefined();

    // Add assertions to verify the properties of the difference
    expect(result.faces.length).toBe(brep1.faces.length);
  });

  test('should perform offset', () => {
    const brep = new BREP();
    const result = brep.offset(5);
    expect(result).toBeDefined();

    // Add assertions to verify the properties of the offset
    expect(result.faces.length).toBe(brep.faces.length);
  });

  test('should perform fillet', () => {
    const brep = new BREP();
    const result = brep.fillet(2);
    expect(result).toBeDefined();

    // Add assertions to verify the properties of the fillet
    expect(result.edges.length).toBe(brep.edges.length);
  });

  test('should perform chamfer', () => {
    const brep = new BREP();
    const result = brep.chamfer(3);
    expect(result).toBeDefined();

    // Add assertions to verify the properties of the chamfer
    expect(result.edges.length).toBe(brep.edges.length);
  });

  test('should manipulate edges', () => {
    const brep = new BREP();
    const edge = brep.edges[0];
    const filletEdge = edge.fillet(2);
    const chamferEdge = edge.chamfer(3);
    expect(filletEdge).toBeDefined();
    expect(chamferEdge).toBeDefined();
  });

  test('should manipulate faces', () => {
    const brep = new BREP();
    const face = brep.faces[0];
    const offsetFace = face.offset(5);
    const trimmedFace = face.trim(0, 1, 0, 1);
    const refinedFace = face.refine([[0.5], [0.5]]);
    const insertedKnotFace = face.insertKnot(0.5, 0.5);
    const removedKnotFace = face.removeKnot(0.5, 0.5);
    const elevatedDegreeFace = face.elevateDegree();
    const intersectedFaces = face.intersect(brep.faces[1]);
    expect(offsetFace).toBeDefined();
    expect(trimmedFace).toBeDefined();
    expect(refinedFace).toBeDefined();
    expect(insertedKnotFace).toBeDefined();
    expect(removedKnotFace).toBeDefined();
    expect(elevatedDegreeFace).toBeDefined();
    expect(intersectedFaces.length).toBeGreaterThan(0);
  });

  test('should manipulate nodes', () => {
    const brep = new BREP();
    const node = brep.nodes[0];
    const edge = node.edges[0];
    const face = node.faces[0];
    const vertex = node.vertices[0];
    node.removeEdge(edge);
    node.removeFace(face);
    node.removeVertex(vertex);
    const foundEdge = node.findEdgeById(edge.id);
    const foundFace = node.findFaceById(face.id);
    const foundVertex = node.findVertexById(vertex.id);
    expect(foundEdge).toBeUndefined();
    expect(foundFace).toBeUndefined();
    expect(foundVertex).toBeUndefined();
  });

  test('should manipulate vertices', () => {
    const brep = new BREP();
    const vertex = brep.vertices[0];
    vertex.move({ x: 1, y: 1, z: 1 });
    vertex.scale(2);
    vertex.rotate('x', Math.PI / 2);
    expect(vertex.point.x).toBeCloseTo(2);
    expect(vertex.point.y).toBeCloseTo(-2);
    expect(vertex.point.z).toBeCloseTo(2);
  });
});
