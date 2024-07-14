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

  // Stub for typical BREP kernel function: boolean operation
  booleanOperation(operation, brep) {
    // TODO: Implement boolean operation
  }

  // Stub for typical BREP kernel function: intersection
  intersection(brep) {
    // TODO: Implement intersection
  }

  // Stub for typical BREP kernel function: union
  union(brep) {
    // TODO: Implement union
  }

  // Stub for typical BREP kernel function: difference
  difference(brep) {
    // TODO: Implement difference
  }

  // Stub for typical BREP kernel function: offset
  offset(distance) {
    // TODO: Implement offset
  }

  // Stub for typical BREP kernel function: fillet
  fillet(radius) {
    // TODO: Implement fillet
  }

  // Stub for typical BREP kernel function: chamfer
  chamfer(distance) {
    // TODO: Implement chamfer
  }

  createBREPTaurus(radius, tubeRadius) {
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
