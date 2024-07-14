import { Point } from '../src/NURBS/Point';
import { Curve } from '../src/NURBS/Curve';
import { Surface } from '../src/NURBS/Surface';
import verb from 'verb-nurbs';

describe('VerbNURBSComparison', () => {
  test('should compare curve evaluation with verb NURBS', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const pointOnCurve = curve.evaluate(0.5);

    const verbCurve = new verb.geom.NurbsCurve.byKnotsControlPointsWeights(degree, knotVector, controlPoints.map(p => [p.x, p.y, p.z]), [1, 1, 1]);
    const verbPointOnCurve = verbCurve.point(0.5);

    expect(pointOnCurve).toEqual({ x: verbPointOnCurve[0], y: verbPointOnCurve[1], z: verbPointOnCurve[2] });
  });

  test('should compare surface evaluation with verb NURBS', () => {
    const controlPoints = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const degrees = [2, 2];
    const knotVectors = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1]
    ];
    const surface = new Surface(controlPoints, degrees, knotVectors);
    const pointOnSurface = surface.evaluate(0.5, 0.5);

    const verbSurface = new verb.geom.NurbsSurface.byKnotsControlPointsWeights(degrees[0], degrees[1], knotVectors[0], knotVectors[1], controlPoints.map(row => row.map(p => [p.x, p.y, p.z])), [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
    const verbPointOnSurface = verbSurface.point(0.5, 0.5);

    expect(pointOnSurface).toEqual({ x: verbPointOnSurface[0], y: verbPointOnSurface[1], z: verbPointOnSurface[2] });
  });
});
