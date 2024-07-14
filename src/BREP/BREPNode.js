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

  removeEdge(edge) {
    const index = this.edges.indexOf(edge);
    if (index !== -1) {
      this.edges.splice(index, 1);
    }
  }

  removeFace(face) {
    const index = this.faces.indexOf(face);
    if (index !== -1) {
      this.faces.splice(index, 1);
    }
  }

  removeVertex(vertex) {
    const index = this.vertices.indexOf(vertex);
    if (index !== -1) {
      this.vertices.splice(index, 1);
    }
  }

  findEdgeById(id) {
    return this.edges.find(edge => edge.id === id);
  }

  findFaceById(id) {
    return this.faces.find(face => face.id === id);
  }

  findVertexById(id) {
    return this.vertices.find(vertex => vertex.id === id);
  }
}

export { BREPNode };
