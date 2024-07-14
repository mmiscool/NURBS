import { Point } from '../src/Point';
import { Surface } from '../src/Surface';

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

  test('should refine the surface', () => {
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
    expect(refinedSurface.knotVectors).toEqual([
      [0, 0, 0, 0.5, 1, 1, 1],
      [0, 0, 0, 0.5, 1, 1, 1]
    ]);
  });

  test('should insert a knot into the surface', () => {
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
    const newSurface = surface.insertKnot(0.5, 0.5);
    expect(newSurface.knotVectors).toEqual([
      [0, 0, 0, 0.5, 1, 1, 1],
      [0, 0, 0, 0.5, 1, 1, 1]
    ]);
  });

  test('should remove a knot from the surface', () => {
    const controlPoints = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const degrees = [2, 2];
    const knotVectors = [
      [0, 0, 0, 0.5, 1, 1, 1],
      [0, 0, 0, 0.5, 1, 1, 1]
    ];
    const surface = new Surface(controlPoints, degrees, knotVectors);
    const newSurface = surface.removeKnot(0.5, 0.5);
    expect(newSurface.knotVectors).toEqual([
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1]
    ]);
  });

  test('should elevate the degree of the surface', () => {
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
    const newSurface = surface.elevateDegree();
    expect(newSurface.degrees).toEqual([3, 3]);
  });

  test('should approximate a surface', () => {
    const points = [
      [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
      [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
      [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
    ];
    const degrees = [2, 2];
    const surface = Surface.approximate(points, degrees);
    expect(surface.controlPoints).toEqual(points);
    expect(surface.degrees).toEqual(degrees);
  });

  test('should intersect two NURBS surfaces', () => {
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
    expect(intersections.length).toBe(0);
  });
});
