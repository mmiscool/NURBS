class BREPFace {
  constructor(surface, id) {
    this.surface = surface;
    this.id = id;
  }

  // Method to offset the face by a given distance
  offset(distance) {
    const offsetSurface = this.surface.offset(distance);
    return new BREPFace(offsetSurface, this.id);
  }

  // Method to trim the face with given parameters
  trim(uStart, uEnd, vStart, vEnd) {
    const trimmedSurface = this.surface.trim(uStart, uEnd, vStart, vEnd);
    return new BREPFace(trimmedSurface, this.id);
  }

  // Method to refine the face with given knot vectors
  refine(knotVectors) {
    const refinedSurface = this.surface.refine(knotVectors);
    return new BREPFace(refinedSurface, this.id);
  }

  // Method to insert a knot into the face
  insertKnot(u, v) {
    const newSurface = this.surface.insertKnot(u, v);
    return new BREPFace(newSurface, this.id);
  }

  // Method to remove a knot from the face
  removeKnot(u, v) {
    const newSurface = this.surface.removeKnot(u, v);
    return new BREPFace(newSurface, this.id);
  }

  // Method to elevate the degree of the face
  elevateDegree() {
    const newSurface = this.surface.elevateDegree();
    return new BREPFace(newSurface, this.id);
  }

  // Method to intersect the face with another face
  intersect(face) {
    const intersections = this.surface.intersect(face.surface);
    return intersections.map(intersection => new BREPFace(intersection, this.id));
  }
}

export { BREPFace };
