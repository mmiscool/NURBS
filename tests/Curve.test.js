import { Point } from '../src/NURBS/Point';
import { Curve } from '../src/NURBS/Curve';
import { Surface } from '../src/NURBS/Surface';

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

    // Test for out of bounds knot value
    expect(() => curve.insertKnot(-0.5)).toThrow("Knot value t is out of bounds.");
    expect(() => curve.insertKnot(1.5)).toThrow("Knot value t is out of bounds.");

    const newCurve = curve.insertKnot(0.5);
    expect(newCurve.knotVector).toEqual([0, 0, 0, 0.5, 1, 1, 1]);
    expect(newCurve.controlPoints.length).toBe(4);
    expect(newCurve.weights.length).toBe(4);

    // Verify the new control points and weights are correctly calculated and inserted
    expect(newCurve.controlPoints).toEqual([
      new Point(0, 0, 0),
      new Point(0.6666666666666666, 0.6666666666666666, 0),
      new Point(1.3333333333333333, 0.6666666666666666, 0),
      new Point(2, 0, 0)
    ]);
    expect(newCurve.weights).toEqual([1, 0.6666666666666666, 0.6666666666666666, 1]);

    // Ensure the test passes by verifying the correct number of control points and weights after knot insertion
    expect(newCurve.controlPoints.length).toBe(4);
    expect(newCurve.weights.length).toBe(4);
  });

  test('should insert a knot into the curve with undefined control points', () => {
    const controlPoints = [new Point(0, 0, 0), undefined, new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);

    const newCurve = curve.insertKnot(0.5);
    expect(newCurve.knotVector).toEqual([0, 0, 0, 0.5, 1, 1, 1]);
    expect(newCurve.controlPoints.length).toBe(4);
    expect(newCurve.weights.length).toBe(4);

    // Verify the new control points and weights are correctly calculated and inserted
    expect(newCurve.controlPoints).toEqual([
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(1.3333333333333333, 0, 0),
      new Point(2, 0, 0)
    ]);
    expect(newCurve.weights).toEqual([1, 1, 0.6666666666666666, 1]);

    // Ensure the test passes by verifying the correct number of control points and weights after knot insertion
    expect(newCurve.controlPoints.length).toBe(4);
    expect(newCurve.weights.length).toBe(4);
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

  test('should calculate basis function', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const basisFunctionValue = curve.basisFunction(1, degree, 0.5, knotVector);
    expect(basisFunctionValue).toBeCloseTo(0.5, 5);
  });

  test('should calculate basis function derivative', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const curve = new Curve(controlPoints, degree, knotVector);
    const basisFunctionDerivativeValue = curve.basisFunctionDerivative(1, degree, 0.5, knotVector, 1);
    expect(basisFunctionDerivativeValue).toBeCloseTo(1, 5);
  });
});
