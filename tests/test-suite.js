import { Point } from '../src/Point';
import { Vector } from '../src/Vector';
import { Curve } from '../src/Curve';
import { Surface } from '../src/Surface';
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
  trimCurve
} from '../src/CurvePrimitives';
import {
  createPlane,
  createCylinder,
  createCone,
  createSphere,
  createRationalNURBSSurface,
  trimSurface
} from '../src/SurfacePrimitives';

describe('Point', () => {
  test('should create a point with given coordinates', () => {
    const point = new Point(1, 2, 3);
    expect(point.getX()).toBe(1);
    expect(point.getY()).toBe(2);
    expect(point.getZ()).toBe(3);
  });
});

describe('Vector', () => {
  test('should add two vectors', () => {
    const vector1 = new Vector(1, 2, 3);
    const vector2 = new Vector(4, 5, 6);
    const result = vector1.add(vector2);
    expect(result).toEqual(new Vector(5, 7, 9));
  });

  test('should subtract two vectors', () => {
    const vector1 = new Vector(1, 2, 3);
    const vector2 = new Vector(4, 5, 6);
    const result = vector1.subtract(vector2);
    expect(result).toEqual(new Vector(-3, -3, -3));
  });

  test('should calculate dot product of two vectors', () => {
    const vector1 = new Vector(1, 2, 3);
    const vector2 = new Vector(4, 5, 6);
    const result = vector1.dot(vector2);
    expect(result).toBe(32);
  });

  test('should calculate cross product of two vectors', () => {
    const vector1 = new Vector(1, 2, 3);
    const vector2 = new Vector(4, 5, 6);
    const result = vector1.cross(vector2);
    expect(result).toEqual(new Vector(-3, 6, -3));
  });
});

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
});

describe('Surface', () => {
  test('should evaluate a point on the surface', () => {
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
    expect(pointOnSurface).toEqual({ x: 1, y: 1, z: 0 });
  });

  test('should calculate the derivative of the surface', () => {
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
    expect(derivative).toEqual({ x: 1, y: 1, z: 0 });
  });
});

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
});

describe('SurfacePrimitives', () => {
  test('should create a plane', () => {
    const width = 2;
    const height = 2;
    const plane = createPlane(width, height);
    expect(plane.controlPoints.length).toBe(2);
    expect(plane.controlPoints[0].length).toBe(2);
    expect(plane.degrees).toEqual([1, 1]);
    expect(plane.knotVectors[0].length).toBe(4);
    expect(plane.knotVectors[1].length).toBe(4);
  });

  test('should create a cylinder', () => {
    const radius = 1;
    const height = 2;
    const cylinder = createCylinder(radius, height);
    expect(cylinder.controlPoints.length).toBe(2);
    expect(cylinder.controlPoints[0].length).toBe(2);
    expect(cylinder.degrees).toEqual([1, 1]);
    expect(cylinder.knotVectors[0].length).toBe(4);
    expect(cylinder.knotVectors[1].length).toBe(4);
  });

  test('should create a cone', () => {
    const radius = 1;
    const height = 2;
    const cone = createCone(radius, height);
    expect(cone.controlPoints.length).toBe(2);
    expect(cone.controlPoints[0].length).toBe(2);
    expect(cone.degrees).toEqual([1, 1]);
    expect(cone.knotVectors[0].length).toBe(4);
    expect(cone.knotVectors[1].length).toBe(4);
  });

  test('should create a sphere', () => {
    const radius = 1;
    const sphere = createSphere(radius);
    expect(sphere.controlPoints.length).toBe(2);
    expect(sphere.controlPoints[0].length).toBe(2);
    expect(sphere.degrees).toEqual([1, 1]);
    expect(sphere.knotVectors[0].length).toBe(4);
    expect(sphere.knotVectors[1].length).toBe(4);
  });

  test('should create a rational NURBS surface', () => {
    const controlPoints = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const weights = [
      [1, 0.5, 1],
      [0.5, 0.25, 0.5],
      [1, 0.5, 1]
    ];
    const degrees = [2, 2];
    const rationalSurface = createRationalNURBSSurface(controlPoints, weights, degrees);
    expect(rationalSurface.controlPoints).toEqual(controlPoints);
    expect(rationalSurface.weights).toEqual(weights);
    expect(rationalSurface.degrees).toEqual(degrees);
    expect(rationalSurface.knotVectors[0].length).toBe(controlPoints.length + degrees[0] + 1);
    expect(rationalSurface.knotVectors[1].length).toBe(controlPoints[0].length + degrees[1] + 1);
  });

  test('should trim a surface', () => {
    const controlPoints = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const weights = [
      [1, 0.5, 1],
      [0.5, 0.25, 0.5],
      [1, 0.5, 1]
    ];
    const degrees = [2, 2];
    const surface = createRationalNURBSSurface(controlPoints, weights, degrees);
    const trimmedSurface = trimSurface(surface, 0, 1, 0, 1);
    expect(trimmedSurface.controlPoints.length).toBe(2);
    expect(trimmedSurface.controlPoints[0].length).toBe(2);
    expect(trimmedSurface.weights.length).toBe(2);
    expect(trimmedSurface.weights[0].length).toBe(2);
    expect(trimmedSurface.degrees).toEqual(degrees);
    expect(trimmedSurface.knotVectors[0].length).toBe(degrees[0] + 2);
    expect(trimmedSurface.knotVectors[1].length).toBe(degrees[1] + 2);
  });
});
