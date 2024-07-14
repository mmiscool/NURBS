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
});
