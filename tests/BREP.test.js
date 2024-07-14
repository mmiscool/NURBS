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
  });

  test('should perform intersection', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const result = brep1.intersection(brep2);
    expect(result).toBeDefined();
  });

  test('should perform union', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const result = brep1.union(brep2);
    expect(result).toBeDefined();
  });

  test('should perform difference', () => {
    const brep1 = new BREP();
    const brep2 = new BREP();
    const result = brep1.difference(brep2);
    expect(result).toBeDefined();
  });

  test('should perform offset', () => {
    const brep = new BREP();
    const result = brep.offset(5);
    expect(result).toBeDefined();
  });

  test('should perform fillet', () => {
    const brep = new BREP();
    const result = brep.fillet(2);
    expect(result).toBeDefined();
  });

  test('should perform chamfer', () => {
    const brep = new BREP();
    const result = brep.chamfer(3);
    expect(result).toBeDefined();
  });
});
