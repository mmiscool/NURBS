# NURBS
Complete Javascript NURBS library

## Features
- Handle NURBS curves and surfaces
- Basic primitives (points, vectors)
- Utility functions for creating standard geometry pieces (lines, circles, ellipses, arcs)

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
const startPoint = new Point(0, 0, 0);
const endPoint = new Point(1, 1, 1);
const line = createLine(startPoint, endPoint);
console.log(line);
```

### Creating a Circle
```javascript
const center = new Point(0, 0, 0);
const radius = 1;
const circle = createCircle(center, radius);
console.log(circle);
```

### Creating an Ellipse
```javascript
const center = new Point(0, 0, 0);
const radiusX = 2;
const radiusY = 1;
const ellipse = createEllipse(center, radiusX, radiusY);
console.log(ellipse);
```

### Creating an Arc
```javascript
const center = new Point(0, 0, 0);
const radius = 1;
const startAngle = 0;
const endAngle = Math.PI / 2;
const arc = createArc(center, radius, startAngle, endAngle);
console.log(arc);
```

### Creating a Bezier Curve
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 2, 0), new Point(2, 0, 0)];
const bezierCurve = createBezierCurve(controlPoints);
console.log(bezierCurve);
```

### Creating a Parabola
```javascript
const vertex = new Point(0, 0, 0);
const focus = new Point(0, 1, 0);
const parabola = createParabola(vertex, focus);
console.log(parabola);
```

### Creating a Hyperbola
```javascript
const center = new Point(0, 0, 0);
const a = 1;
const b = 1;
const hyperbola = createHyperbola(center, a, b);
console.log(hyperbola);
```

### Creating a Spline
```javascript
const controlPoints = [new Point(0, 0, 0), new Point(1, 2, 0), new Point(2, 0, 0)];
const degree = 2;
const spline = createSpline(controlPoints, degree);
console.log(spline);
```

### Creating a Plane
```javascript
const width = 2;
const height = 2;
const plane = createPlane(width, height);
console.log(plane);
```

### Creating a Cylinder
```javascript
const radius = 1;
const height = 2;
const cylinder = createCylinder(radius, height);
console.log(cylinder);
```

### Creating a Cone
```javascript
const radius = 1;
const height = 2;
const cone = createCone(radius, height);
console.log(cone);
```

### Creating a Sphere
```javascript
const radius = 1;
const sphere = createSphere(radius);
console.log(sphere);
```
