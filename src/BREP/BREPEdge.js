import { Point } from '../NURBS/Point';
import { Vector } from '../NURBS/Vector';

class BREPEdge {
  constructor(startVertex, endVertex, id) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.id = id;
  }

  fillet(radius) {
    const start = this.startVertex.point;
    const end = this.endVertex.point;
    const direction = new Vector(end.x - start.x, end.y - start.y, end.z - start.z);
    const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
    const unitDirection = new Vector(direction.x / length, direction.y / length, direction.z / length);

    const filletStart = new Point(
      start.x + radius * unitDirection.x,
      start.y + radius * unitDirection.y,
      start.z + radius * unitDirection.z
    );

    const filletEnd = new Point(
      end.x - radius * unitDirection.x,
      end.y - radius * unitDirection.y,
      end.z - radius * unitDirection.z
    );

    return new BREPEdge(filletStart, filletEnd, this.id);
  }

  chamfer(distance) {
    const start = this.startVertex.point;
    const end = this.endVertex.point;
    const direction = new Vector(end.x - start.x, end.y - start.y, end.z - start.z);
    const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
    const unitDirection = new Vector(direction.x / length, direction.y / length, direction.z / length);

    const chamferStart = new Point(
      start.x + distance * unitDirection.x,
      start.y + distance * unitDirection.y,
      start.z + distance * unitDirection.z
    );

    const chamferEnd = new Point(
      end.x - distance * unitDirection.x,
      end.y - distance * unitDirection.y,
      end.z - distance * unitDirection.z
    );

    return new BREPEdge(chamferStart, chamferEnd, this.id);
  }
}

export { BREPEdge };
