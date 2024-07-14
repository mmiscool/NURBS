import { Point } from '../src/NURBS/Point';

describe('Point', () => {
  test('should create a point with given coordinates', () => {
    const point = new Point(1, 2, 3);
    expect(point.getX()).toBe(1);
    expect(point.getY()).toBe(2);
    expect(point.getZ()).toBe(3);
  });

  test('should get the x coordinate', () => {
    const point = new Point(1, 2, 3);
    expect(point.getX()).toBe(1);
  });

  test('should get the y coordinate', () => {
    const point = new Point(1, 2, 3);
    expect(point.getY()).toBe(2);
  });

  test('should get the z coordinate', () => {
    const point = new Point(1, 2, 3);
    expect(point.getZ()).toBe(3);
  });

  test('should set the x coordinate', () => {
    const point = new Point(1, 2, 3);
    point.setX(4);
    expect(point.getX()).toBe(4);
  });

  test('should set the y coordinate', () => {
    const point = new Point(1, 2, 3);
    point.setY(5);
    expect(point.getY()).toBe(5);
  });

  test('should set the z coordinate', () => {
    const point = new Point(1, 2, 3);
    point.setZ(6);
    expect(point.getZ()).toBe(6);
  });
});
