class BREPVertex {
  constructor(point) {
    this.point = point;
  }

  // Method to move the vertex by a given vector
  move(vector) {
    this.point.x += vector.x;
    this.point.y += vector.y;
    this.point.z += vector.z;
  }

  // Method to scale the vertex by a given factor
  scale(factor) {
    this.point.x *= factor;
    this.point.y *= factor;
    this.point.z *= factor;
  }

  // Method to rotate the vertex around a given axis and angle
  rotate(axis, angle) {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const x = this.point.x;
    const y = this.point.y;
    const z = this.point.z;

    switch (axis) {
      case 'x':
        this.point.y = y * cosAngle - z * sinAngle;
        this.point.z = y * sinAngle + z * cosAngle;
        break;
      case 'y':
        this.point.x = x * cosAngle + z * sinAngle;
        this.point.z = -x * sinAngle + z * cosAngle;
        break;
      case 'z':
        this.point.x = x * cosAngle - y * sinAngle;
        this.point.y = x * sinAngle + y * cosAngle;
        break;
      default:
        throw new Error(`Unknown axis: ${axis}`);
    }
  }
}

export { BREPVertex };
