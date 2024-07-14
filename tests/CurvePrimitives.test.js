import { Point } from '../src/NURBS/Point';
import {
  createLine,
  createCircle,
  createEllipse,
  createArc,
  createBezierCurve,
  createParabola,
  createHyperbola,
  createSpline,
  createRationalNURBSCurve,
  trimCurve,
  createNURBSEdge
} from '../src/NURBS/CurvePrimitives';

describe('CurvePrimitives', () => {
  test('should create a line', () => {
    const startPoint = new Point(0, 0, 0);
    const endPoint = new Point(1, 1, 1);
    const line = createLine(startPoint, endPoint);
    expect(line).toEqual({
      controlPoints: [startPoint, endPoint],
      degree: 1,
      knotVector: [0, 0, 1, 1]
    });
  });

  test('should create a circle', () => {
    const center = new Point(0, 0, 0);
    const radius = 1;
    const circle = createCircle(center, radius);
    expect(circle.controlPoints.length).toBe(4);
    expect(circle.degree).toBe(2);
    expect(circle.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should create an ellipse', () => {
    const center = new Point(0, 0, 0);
    const radiusX = 2;
    const radiusY = 1;
    const ellipse = createEllipse(center, radiusX, radiusY);
    expect(ellipse.controlPoints.length).toBe(4);
    expect(ellipse.degree).toBe(2);
    expect(ellipse.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should create an arc', () => {
    const center = new Point(0, 0, 0);
    const radius = 1;
    const startAngle = 0;
    const endAngle = Math.PI / 2;
    const arc = createArc(center, radius, startAngle, endAngle);
    expect(arc.controlPoints.length).toBe(3);
    expect(arc.degree).toBe(2);
    expect(arc.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should create a Bezier curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 2, 0), new Point(2, 0, 0)];
    const bezierCurve = createBezierCurve(controlPoints);
    expect(bezierCurve.controlPoints).toEqual(controlPoints);
    expect(bezierCurve.degree).toBe(2);
    expect(bezierCurve.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should create a parabola', () => {
    const vertex = new Point(0, 0, 0);
    const focus = new Point(0, 1, 0);
    const parabola = createParabola(vertex, focus);
    expect(parabola.controlPoints.length).toBe(3);
    expect(parabola.degree).toBe(2);
    expect(parabola.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should create a hyperbola', () => {
    const center = new Point(0, 0, 0);
    const a = 1;
    const b = 1;
    const hyperbola = createHyperbola(center, a, b);
    expect(hyperbola.controlPoints.length).toBe(3);
    expect(hyperbola.degree).toBe(2);
    expect(hyperbola.knotVector).toEqual([0, 0, 0, 1, 1, 1]);
  });

  test('should create a spline', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 2, 0), new Point(2, 0, 0)];
    const degree = 2;
    const spline = createSpline(controlPoints, degree);
    expect(spline.controlPoints).toEqual(controlPoints);
    expect(spline.degree).toBe(degree);
    expect(spline.knotVector.length).toBe(controlPoints.length + degree + 1);
  });

  test('should create a rational NURBS curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const weights = [1, 0.5, 1];
    const degree = 2;
    const rationalCurve = createRationalNURBSCurve(controlPoints, weights, degree);
    expect(rationalCurve.controlPoints).toEqual(controlPoints);
    expect(rationalCurve.weights).toEqual(weights);
    expect(rationalCurve.degree).toBe(degree);
    expect(rationalCurve.knotVector.length).toBe(controlPoints.length + degree + 1);
  });

  test('should trim a curve', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const weights = [1, 0.5, 1];
    const degree = 2;
    const curve = createRationalNURBSCurve(controlPoints, weights, degree);
    const trimmedCurve = trimCurve(curve, 0, 1);
    expect(trimmedCurve.controlPoints.length).toBe(2);
    expect(trimmedCurve.weights.length).toBe(2);
    expect(trimmedCurve.degree).toBe(degree);
    expect(trimmedCurve.knotVector.length).toBe(degree + 2);
  });

  test('should create a NURBS edge', () => {
    const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
    const degree = 2;
    const knotVector = [0, 0, 0, 1, 1, 1];
    const edge = createNURBSEdge(controlPoints, degree, knotVector);
    expect(edge.controlPoints).toEqual(controlPoints);
    expect(edge.degree).toBe(degree);
    expect(edge.knotVector).toEqual(knotVector);
    expect(edge.weights).toEqual(new Array(controlPoints.length).fill(1));
  });
});
