class BREPNode {
  constructor() {
    this.edges = [];
    this.faces = [];
    this.vertices = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  addFace(face) {
    this.faces.push(face);
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
  }
}

export { BREPNode };
