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

  test('should compare curve derivatives with verb NURBS', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const derivative = curve.derivative(0.5, 1);

    const verbCurve = new verb.geom.NurbsCurve.byKnotsControlPointsWeights(degree, knotVector, controlPoints.map(p => [p.x, p.y, p.z]), [1, 1, 1]);
    const verbDerivative = verbCurve.derivatives(0.5, 1)[1];

    expect(derivative).toEqual({ x: verbDerivative[0], y: verbDerivative[1], z: verbDerivative[2] });
  });

  test('should compare surface derivatives with verb NURBS', () => {
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
    const derivative = surface.derivative(0.5, 0.5, 1, 1);

    const verbSurface = new verb.geom.NurbsSurface.byKnotsControlPointsWeights(degrees[0], degrees[1], knotVectors[0], knotVectors[1], controlPoints.map(row => row.map(p => [p.x, p.y, p.z])), [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
    const verbDerivative = verbSurface.derivatives(0.5, 0.5, 1, 1)[1][1];

    expect(derivative).toEqual({ x: verbDerivative[0], y: verbDerivative[1], z: verbDerivative[2] });
  });

  test('should compare curve refinements with verb NURBS', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const refinedCurve = curve.refine([0.5]);

    const verbCurve = new verb.geom.NurbsCurve.byKnotsControlPointsWeights(degree, knotVector, controlPoints.map(p => [p.x, p.y, p.z]), [1, 1, 1]);
    const verbRefinedCurve = verbCurve.refine([0.5]);

    expect(refinedCurve.knotVector).toEqual(verbRefinedCurve.knots());
  });

  test('should compare surface refinements with verb NURBS', () => {
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
    const refinedSurface = surface.refine([[0.5], [0.5]]);

    const verbSurface = new verb.geom.NurbsSurface.byKnotsControlPointsWeights(degrees[0], degrees[1], knotVectors[0], knotVectors[1], controlPoints.map(row => row.map(p => [p.x, p.y, p.z])), [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
    const verbRefinedSurface = verbSurface.refine([[0.5], [0.5]]);

    expect(refinedSurface.knotVectors).toEqual([verbRefinedSurface.knotsU(), verbRefinedSurface.knotsV()]);
  });

  test('should compare curve intersections with verb NURBS', () => {
    const controlPoints1 = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree1 = 2;
    const knotVector1 = [0, 0, 0, 1, 1, 1];
    const curve1 = new Curve(controlPoints1, degree1, knotVector1);

    const controlPoints2 = [new Point(0, 1, 0), new Point(1, 0, 0), new Point(2, 1, 0)];
    const degree2 = 2;
    const knotVector2 = [0, 0, 0, 1, 1, 1];
    const curve2 = new Curve(controlPoints2, degree2, knotVector2);

    const intersections = curve1.intersect(curve2);

    const verbCurve1 = new verb.geom.NurbsCurve.byKnotsControlPointsWeights(degree1, knotVector1, controlPoints1.map(p => [p.x, p.y, p.z]), [1, 1, 1]);
    const verbCurve2 = new verb.geom.NurbsCurve.byKnotsControlPointsWeights(degree2, knotVector2, controlPoints2.map(p => [p.x, p.y, p.z]), [1, 1, 1]);
    const verbIntersections = verb.geom.Intersect.curveCurve(verbCurve1, verbCurve2);

    expect(intersections.length).toBe(verbIntersections.length);
  });

  test('should compare surface intersections with verb NURBS', () => {
    const controlPoints1 = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const degrees1 = [2, 2];
    const knotVectors1 = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1]
    ];
    const surface1 = new Surface(controlPoints1, degrees1, knotVectors1);

    const controlPoints2 = [
      [new Point(0, 0, 1), new Point(1, 0, 1), new Point(2, 0, 1)],
      [new Point(0, 1, 1), new Point(1, 1, 1), new Point(2, 1, 1)],
      [new Point(0, 2, 1), new Point(1, 2, 1), new Point(2, 2, 1)]
    ];
    const degrees2 = [2, 2];
    const knotVectors2 = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1]
    ];
    const surface2 = new Surface(controlPoints2, degrees2, knotVectors2);

    const intersections = surface1.intersect(surface2);

    const verbSurface1 = new verb.geom.NurbsSurface.byKnotsControlPointsWeights(degrees1[0], degrees1[1], knotVectors1[0], knotVectors1[1], controlPoints1.map(row => row.map(p => [p.x, p.y, p.z])), [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
    const verbSurface2 = new verb.geom.NurbsSurface.byKnotsControlPointsWeights(degrees2[0], degrees2[1], knotVectors2[0], knotVectors2[1], controlPoints2.map(row => row.map(p => [p.x, p.y, p.z])), [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
    const verbIntersections = verb.geom.Intersect.surfaceSurface(verbSurface1, verbSurface2);

    expect(intersections.length).toBe(verbIntersections.length);
  });
});
