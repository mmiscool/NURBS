import { BREPNode } from './BREPNode';
import { BREPEdge } from './BREPEdge';
import { BREPFace } from './BREPFace';
import { BREPVertex } from './BREPVertex';
import { createTorus, createCylinder, createCone, createCube } from '../NURBS/SurfacePrimitives';

class BREP {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.faces = [];
    this.vertices = [];
    this.edgeIdCounter = 0;
    this.faceIdCounter = 0;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addEdge(edge) {
    edge.id = this.edgeIdCounter++;
    this.edges.push(edge);
  }

  addFace(face) {
    face.id = this.faceIdCounter++;
    this.faces.push(face);
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
  }

  // Implement boolean operation
  booleanOperation(operation, brep) {
    switch (operation) {
      case 'union':
        return this.union(brep);
      case 'intersection':
        return this.intersection(brep);
      case 'difference':
        return this.difference(brep);
      default:
        throw new Error(`Unknown boolean operation: ${operation}`);
    }
  }

  // Implement intersection
  intersection(brep) {
    const result = new BREP();
    this.faces.forEach(face1 => {
      brep.faces.forEach(face2 => {
        const intersections = face1.surface.intersect(face2.surface);
        intersections.forEach(intersection => {
          const vertex = new BREPVertex(intersection.point);
          result.addVertex(vertex);
        });
      });
    });
    return result;
  }

  // Implement union
  union(brep) {
    const result = new BREP();
    this.faces.forEach(face => result.addFace(face));
    brep.faces.forEach(face => result.addFace(face));
    return result;
  }

  // Implement difference
  difference(brep) {
    const result = new BREP();
    this.faces.forEach(face1 => {
      let isDifferent = true;
      brep.faces.forEach(face2 => {
        if (face1.surface.intersect(face2.surface).length > 0) {
          isDifferent = false;
        }
      });
      if (isDifferent) {
        result.addFace(face1);
      }
    });
    return result;
  }

  // Implement offset
  offset(distance) {
    const result = new BREP();
    this.faces.forEach(face => {
      const offsetSurface = face.surface.offset(distance);
      const offsetFace = new BREPFace(offsetSurface, face.id);
      result.addFace(offsetFace);
    });
    return result;
  }

  // Implement fillet
  fillet(radius) {
    const result = new BREP();
    this.edges.forEach(edge => {
      const filletEdge = edge.fillet(radius);
      result.addEdge(filletEdge);
    });
    return result;
  }

  // Implement chamfer
  chamfer(distance) {
    const result = new BREP();
    this.edges.forEach(edge => {
      const chamferEdge = edge.chamfer(distance);
      result.addEdge(chamferEdge);
    });
    return result;
  }

  createBREPTaurus(radius, tubeRadius) {
    if (radius <= 0 || tubeRadius <= 0) {
      throw new Error("Radius and tube radius must be positive values.");
    }
    const torus = createTorus(radius, tubeRadius);
    const brepNode = new BREPNode();
    torus.controlPoints.forEach(row => {
      row.forEach(point => {
        const vertex = new BREPVertex(point);
        brepNode.addVertex(vertex);
      });
    });
    this.addNode(brepNode);
    return brepNode;
  }

  createBREPCylinder(radius, height) {
    if (radius <= 0 || height <= 0) {
      throw new Error("Radius and height must be positive values.");
    }
    const cylinder = createCylinder(radius, height);
    const brepNode = new BREPNode();
    cylinder.controlPoints.forEach(row => {
      row.forEach(point => {
        const vertex = new BREPVertex(point);
        brepNode.addVertex(vertex);
      });
    });
    this.addNode(brepNode);
    return brepNode;
  }

  createBREPCone(radius, height) {
    if (radius <= 0 || height <= 0) {
      throw new Error("Radius and height must be positive values.");
    }
    const cone = createCone(radius, height);
    const brepNode = new BREPNode();
    cone.controlPoints.forEach(row => {
      row.forEach(point => {
        const vertex = new BREPVertex(point);
        brepNode.addVertex(vertex);
      });
    });
    this.addNode(brepNode);
    return brepNode;
  }

  createBREPCube(x, y, z) {
    if (x <= 0 || y <= 0 || z <= 0) {
      throw new Error("Dimensions must be positive values.");
    }
    const cube = createCube(x, y, z);
    const brepNode = new BREPNode();
    cube.controlPoints.forEach(row => {
      row.forEach(point => {
        const vertex = new BREPVertex(point);
        brepNode.addVertex(vertex);
      });
    });
    this.addNode(brepNode);
    return brepNode;
  }
}

export { BREP };
