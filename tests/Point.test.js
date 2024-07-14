import { Point } from '../src/NURBS/Point';

describe('Point', () => {
  test('should create a point with given coordinates', () => {
    const point = new Point(1, 2, 3);
    expect(point.getX()).toBe(1);
    expect(point.getY()).toBe(2);
    expect(point.getZ()).toBe(3);
  });
});
