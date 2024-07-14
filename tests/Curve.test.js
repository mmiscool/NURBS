import { Point } from '../src/Point';
import { Curve } from '../src/Curve';
import { Surface } from '../src/Surface';

describe('Curve', () => {
  test('should evaluate a point on the curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const pointOnCurve = curve.evaluate(0.5);
    expect(pointOnCurve).toEqual({ x: 1, y: 0.5, z: 0 });
  });

  test('should calculate the derivative of the curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const derivative = curve.derivative(0.5, 1);
    expect(derivative).toEqual({ x: 1, y: 0, z: 0 });
  });

  test('should refine the curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const refinedCurve = curve.refine([0.5]);
    expect(refinedCurve.knotVector).toEqual([0, 0, 0, 0.5, 1, 1, 1]);
  });

  test('should insert a knot into the curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const newCurve = curve.insertKnot(0.5);
    expect(newCurve.knotVector).toEqual([0, 0, 0, 0.5, 1, 1, 1]);
    expect(newCurve.controlPoints.length).toBe(5);
    expect(newCurve.weights.length).toBe(5);
  });

  test('should remove a knot from the curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 0.5, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const newCurve = curve.removeKnot(0.5);
    expect(newCurve.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should elevate the degree of the curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const newCurve = curve.elevateDegree();
    expect(newCurve.degree).toBe(3);
  });

  test('should approximate a curve', () => {
    const points = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const curve = Curve.approximate(points, degree);
    expect(curve.controlPoints).toEqual(points);
    expect(curve.degree).toBe(degree);
  });

  test('should intersect two NURBS curves', () => {
    const controlPoints1 = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree1 = 2;
    const knotVector1 = [0, 0, 0, 1, 1, 1];
    const curve1 = new Curve(controlPoints1, degree1, knotVector1);

    const controlPoints2 = [new Point(0, 1, 0), new Point(1, 0, 0), new Point(2, 1, 0)];
    const degree2 = 2;
    const knotVector2 = [0, 0, 0, 1, 1, 1];
    const curve2 = new Curve(controlPoints2, degree2, knotVector2);

    const intersections = curve1.intersect(curve2);
    expect(intersections.length).toBeGreaterThan(0);
  });

  test('should intersect a NURBS curve and a NURBS surface', () => {
    const controlPointsCurve = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degreeCurve = 2;
    const knotVectorCurve = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPointsCurve, degreeCurve, knotVectorCurve);

    const controlPointsSurface = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const degreesSurface = [2, 2];
    const knotVectorsSurface = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1]
    ];
    const surface = new Surface(controlPointsSurface, degreesSurface, knotVectorsSurface);

    const intersections = curve.intersectSurface(surface);
    expect(intersections.length).toBeGreaterThan(0);
  });
});
