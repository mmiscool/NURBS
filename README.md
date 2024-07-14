# NURBS
Complete Javascript NURBS library

## Features
- Handle NURBS curves and surfaces
- Basic primitives (points, vectors)
- Utility functions for creating standard geometry pieces (lines, circles, ellipses, arcs)
- Trimming NURBS curves and surfaces
- Rational NURBS (weights for control points)
- NURBS curve and surface derivatives
- NURBS curve and surface refinement
- NURBS curve and surface knot insertion and removal
- NURBS curve and surface degree elevation
- NURBS curve and surface intersection
- NURBS curve and surface approximation

## Usage

### Creating a Point
```javascript
const point = new Point(1, 2, 3);
console.log(point.getX()); // 1
console.log(point.getY()); // 2
console.log(point.getZ()); // 3
```

### Creating a Vector
```javascript
const vector1 = new Vector(1, 2, 3);
const vector2 = new Vector(4, 5, 6);
const result = vector1.add(vector2);
console.log(result); // Vector { x: 5, y: 7, z: 9 }
```

### Creating a NURBS Curve
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const knotVector = [0, 0, 0, 1, 1, 1];
const curve = new Curve(controlPoints, degree, knotVector);
const pointOnCurve = curve.evaluate(0.5);
console.log(pointOnCurve); // { x: 1, y: 0.5, z: 0 }
```

### Creating a NURBS Surface
```javascript
const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const knotVectors = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface = new Surface(controlPoints, degrees, knotVectors);
const pointOnSurface = surface.evaluate(0.5, 0.5);
console.log(pointOnSurface); // { x: 1, y: 1, z: 0 }
```

### Creating a Line
```javascript
import { createLine } from './src/CurvePrimitives';

const startPoint = new Point(0, 0, 0);
const endPoint = new Point(1, 1, 1);
const line = createLine(startPoint, endPoint);
console.log(line);
```

### Creating a Circle
```javascript
import { createCircle } from './src/CurvePrimitives';

const center = new Point(0, 0, 0);
const radius = 1;
const circle = createCircle(center, radius);
console.log(circle);
```

### Creating an Ellipse
```javascript
import { createEllipse } from './src/CurvePrimitives';

const center = new Point(0, 0, 0);
const radiusX = 2;
const radiusY = 1;
const ellipse = createEllipse(center, radiusX, radiusY);
console.log(ellipse);
```

### Creating an Arc
```javascript
import { createArc } from './src/CurvePrimitives';

const center = new Point(0, 0, 0);
const radius = 1;
const startAngle = 0;
const endAngle = Math.PI / 2;
const arc = createArc(center, radius, startAngle, endAngle);
console.log(arc);
```

### Creating a Bezier Curve
```javascript
import { createBezierCurve } from './src/CurvePrimitives';

const controlPoints = [new Point(0, 0, 0), new Point(1, 2, 0), new Point(2, 0, 0)];
const bezierCurve = createBezierCurve(controlPoints);
console.log(bezierCurve);
```

### Creating a Parabola
```javascript
import { createParabola } from './src/CurvePrimitives';

const vertex = new Point(0, 0, 0);
const focus = new Point(0, 1, 0);
const parabola = createParabola(vertex, focus);
console.log(parabola);
```

### Creating a Hyperbola
```javascript
import { createHyperbola } from './src/CurvePrimitives';

const center = new Point(0, 0, 0);
const a = 1;
const b = 1;
const hyperbola = createHyperbola(center, a, b);
console.log(hyperbola);
```

### Creating a Spline
```javascript
import { createSpline } from './src/CurvePrimitives';

const controlPoints = [new Point(0, 0, 0), new Point(1, 2, 0), new Point(2, 0, 0)];
const degree = 2;
const spline = createSpline(controlPoints, degree);
console.log(spline);
```

### Creating a Rational NURBS Curve
```javascript
import { createRationalNURBSCurve } from './src/CurvePrimitives';

const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const weights = [1, 0.5, 1];
const degree = 2;
const rationalCurve = createRationalNURBSCurve(controlPoints, weights, degree);
console.log(rationalCurve);
```

### Trimming a NURBS Curve
```javascript
import { trimCurve } from './src/CurvePrimitives';

const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const weights = [1, 0.5, 1];
const degree = 2;
const curve = createRationalNURBSCurve(controlPoints, weights, degree);
const trimmedCurve = trimCurve(curve, 0, 1);
console.log(trimmedCurve);
```

### Creating a Plane
```javascript
import { createPlane } from './src/SurfacePrimitives';

const width = 2;
const height = 2;
const plane = createPlane(width, height);
console.log(plane);
```

### Creating a Cylinder
```javascript
import { createCylinder } from './src/SurfacePrimitives';

const radius = 1;
const height = 2;
const cylinder = createCylinder(radius, height);
console.log(cylinder);
```

### Creating a Cone
```javascript
import { createCone } from './src/SurfacePrimitives';

const radius = 1;
const height = 2;
const cone = createCone(radius, height);
console.log(cone);
```

### Creating a Sphere
```javascript
import { createSphere } from './src/SurfacePrimitives';

const radius = 1;
const sphere = createSphere(radius);
console.log(sphere);
```

### Creating a Rational NURBS Surface
```javascript
import { createRationalNURBSSurface } from './src/SurfacePrimitives';

const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const weights = [
  [1, 0.5, 1],
  [0.5, 0.25, 0.5],
  [1, 0.5, 1]
];
const degrees = [2, 2];
const rationalSurface = createRationalNURBSSurface(controlPoints, weights, degrees);
console.log(rationalSurface);
```

### Trimming a NURBS Surface
```javascript
import { trimSurface } from './src/SurfacePrimitives';

const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const weights = [
  [1, 0.5, 1],
  [0.5, 0.25, 0.5],
  [1, 0.5, 1]
];
const degrees = [2, 2];
const surface = createRationalNURBSSurface(controlPoints, weights, degrees);
const trimmedSurface = trimSurface(surface, 0, 1, 0, 1);
console.log(trimmedSurface);
```

### Evaluating NURBS Curve Derivatives
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const knotVector = [0, 0, 0, 1, 1, 1];
const curve = new Curve(controlPoints, degree, knotVector);
const derivative = curve.derivative(0.5, 1);
console.log(derivative); // { x: 1, y: 0, z: 0 }
```

### Evaluating NURBS Surface Derivatives
```javascript
const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const knotVectors = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface = new Surface(controlPoints, degrees, knotVectors);
const derivative = surface.derivative(0.5, 0.5, 1, 1);
console.log(derivative); // { x: 1, y: 1, z: 0 }
```

### Refining a NURBS Curve
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const knotVector = [0, 0, 0, 1, 1, 1];
const curve = new Curve(controlPoints, degree, knotVector);
const refinedCurve = curve.refine([0.5]);
console.log(refinedCurve);
```

### Refining a NURBS Surface
```javascript
const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const knotVectors = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface = new Surface(controlPoints, degrees, knotVectors);
const refinedSurface = surface.refine([[0.5], [0.5]]);
console.log(refinedSurface);
```

### Inserting a Knot into a NURBS Curve
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const knotVector = [0, 0, 0, 1, 1, 1];
const curve = new Curve(controlPoints, degree, knotVector);
const newCurve = curve.insertKnot(0.5);
console.log(newCurve);
```

### Inserting a Knot into a NURBS Surface
```javascript
const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const knotVectors = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface = new Surface(controlPoints, degrees, knotVectors);
const newSurface = surface.insertKnot(0.5, 0.5);
console.log(newSurface);
```

### Removing a Knot from a NURBS Curve
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const knotVector = [0, 0, 0, 0.5, 1, 1, 1];
const curve = new Curve(controlPoints, degree, knotVector);
const newCurve = curve.removeKnot(0.5);
console.log(newCurve);
```

### Removing a Knot from a NURBS Surface
```javascript
const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const knotVectors = [
  [0, 0, 0, 0.5, 1, 1, 1],
  [0, 0, 0, 0.5, 1, 1, 1]
];
const surface = new Surface(controlPoints, degrees, knotVectors);
const newSurface = surface.removeKnot(0.5, 0.5);
console.log(newSurface);
```

### Elevating the Degree of a NURBS Curve
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const knotVector = [0, 0, 0, 1, 1, 1];
const curve = new Curve(controlPoints, degree, knotVector);
const newCurve = curve.elevateDegree();
console.log(newCurve);
```

### Elevating the Degree of a NURBS Surface
```javascript
const controlPoints = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const knotVectors = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface = new Surface(controlPoints, degrees, knotVectors);
const newSurface = surface.elevateDegree();
console.log(newSurface);
```

### Intersecting NURBS Curves
```javascript
const controlPoints1 = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree1 = 2;
const knotVector1 = [0, 0, 0, 1, 1, 1];
const curve1 = new Curve(controlPoints1, degree1, knotVector1);

const controlPoints2 = [new Point(0, 1, 0), new Point(1, 0, 0), new Point(2, 1, 0)];
const degree2 = 2;
const knotVector2 = [0, 0, 0, 1, 1, 1];
const curve2 = new Curve(controlPoints2, degree2, knotVector2);

const intersections = curve1.intersect(curve2);
console.log(intersections);
```

### Intersecting NURBS Surfaces
```javascript
const controlPoints1 = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees1 = [2, 2];
const knotVectors1 = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface1 = new Surface(controlPoints1, degrees1, knotVectors1);

const controlPoints2 = [
  [new Point(0, 0, 1), new Point(1, 0, 1), new Point(2, 0, 1)],
  [new Point(0, 1, 1), new Point(1, 1, 1), new Point(2, 1, 1)],
  [new Point(0, 2, 1), new Point(1, 2, 1), new Point(2, 2, 1)]
];
const degrees2 = [2, 2];
const knotVectors2 = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface2 = new Surface(controlPoints2, degrees2, knotVectors2);

const intersections = surface1.intersect(surface2);
console.log(intersections);
```

### Intersecting a NURBS Curve and Surface
```javascript
const controlPointsCurve = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degreeCurve = 2;
const knotVectorCurve = [0, 0, 0, 1, 1, 1];
const curve = new Curve(controlPointsCurve, degreeCurve, knotVectorCurve);

const controlPointsSurface = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degreesSurface = [2, 2];
const knotVectorsSurface = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1]
];
const surface = new Surface(controlPointsSurface, degreesSurface, knotVectorsSurface);

const intersections = curve.intersectSurface(surface);
console.log(intersections);
```

### Approximating a NURBS Curve
```javascript
const points = [new Point(0, 0, 0), new Point(1, 1, 0), new Point(2, 0, 0)];
const degree = 2;
const curve = Curve.approximate(points, degree);
console.log(curve);
```

### Approximating a NURBS Surface
```javascript
const points = [
  [new Point(0, 0, 0), new Point(1, 0, 0), new Point(2, 0, 0)],
  [new Point(0, 1, 0), new Point(1, 1, 0), new Point(2, 1, 0)],
  [new Point(0, 2, 0), new Point(1, 2, 0), new Point(2, 2, 0)]
];
const degrees = [2, 2];
const surface = Surface.approximate(points, degrees);
console.log(surface);
```

## Running Tests

To run the test suite using Jest, follow these steps:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npm test
   ```

The test files are located in the `tests/test-suite.js` file.
