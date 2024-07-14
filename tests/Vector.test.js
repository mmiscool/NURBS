import { Vector } from '../src/Vector';

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
