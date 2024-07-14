import { Point } from '../src/NURBS/Point';
import {
  createPlane,
  createCylinder,
  createCone,
  createSphere,
  createRationalNURBSSurface,
  trimSurface,
  createNURBSFace
} from '../src/NURBS/SurfacePrimitives';

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

  test('should create a NURBS face', () => {
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
    const face = createNURBSFace(controlPoints, degrees, knotVectors);
    expect(face.controlPoints).toEqual(controlPoints);
    expect(face.degrees).toEqual(degrees);
    expect(face.knotVectors).toEqual(knotVectors);
    expect(face.weights).toEqual(controlPoints.map(row => new Array(row.length).fill(1)));
  });
});
