import { Point } from '../src/NURBS/Point';
import { Curve } from '../src/NURBS/Curve';
import { Surface } from '../src/NURBS/Surface';
import { createCylinder } from '../src/NURBS/SurfacePrimitives';

describe('Bottle', () => {
  test('should create a bottle shape', () => {
    // Define control points, degrees, and knot vectors for the bottle's profile curve
    const profileControlPoints = [
      new Point(0, 0, 0),
      new Point(1, 2, 0),
      new Point(1, 3, 0),
      new Point(0.5, 4, 0),
      new Point(0.5, 5, 0),
      new Point(0, 6, 0)
    ];
    const profileDegree = 2;
    const profileKnotVector = [0, 0, 0, 1, 2, 3, 4, 4, 4];

    const profileCurve = new Curve(profileControlPoints, profileDegree, profileKnotVector);

    // Define control points, degrees, and knot vectors for the bottle's surface
    const surfaceControlPoints = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const surfaceDegrees = [2, 2];
    const surfaceKnotVectors = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1]
    ];

    const bottleSurface = new Surface(surfaceControlPoints, surfaceDegrees, surfaceKnotVectors);

    // Create the main body of the bottle using extrusion
    const mainBody = createCylinder(1, 5);

    // Add assertions to verify the properties of the created bottle
    expect(profileCurve).toBeDefined();
    expect(bottleSurface).toBeDefined();
    expect(mainBody).toBeDefined();
  });
});
