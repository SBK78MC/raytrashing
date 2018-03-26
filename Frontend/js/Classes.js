
class RayTracer {
	//to encompass all the objects in one parent class - RayTracer
	constructor(imagePlane, camera, scene) {
		this.ImagePlane = imagePlane;
		this.Camera 	= camera;
		this.Scene 		= scene;
	}
}

class Scene {
	//to add all the shapes, lights and ambient light to a single class for cleaner JSON
	constructor(shapes, light, ambientLight, floor) {
		this.Object3D 	  = shapes;
		this.Light 		  = light;
		this.AmbientLight = ambientLight;
		this.Floor		  = floor;
	}
}

class ImagePlane {
	//to populate the size of the screen which is also the size of the Image Plane
	constructor(width, height) {
		this.width  = width;
		this.height = height;
	}
}

class CameraCoord {
	//to populate the position and direction of the camera
	constructor(x, y, z) {
		this.x	= x;
		this.y	= y;
		this.z	= z;
	}
}

class Camera {
	//to populate the collective values of pos and dir of camera
	constructor(pos, dir, ang) {
		this.position 	 	  = pos;
		this.pointOfView 	  = dir; 
		this.cameraRightAngle = ang;
	}
}

class CenterForShapesAndLight {
	//to populate coordinates for the centers of shapes and also the light source
	constructor(x, y, z) {
    	this.x = x;
    	this.y = y;
		this.z = z;
	}
}

class colorObj {
	//for fetching rgb from hex
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
}

class LightSource {
	constructor(center, brightness) {
		this.center = center;
		this.brightness = brightness / 100;
	}
}

class AmbientLight {
	constructor(active, value) {
		this.active = active;
		this.brightness = value;
	}
}

class Floor {
	constructor(active) {
		this.active = active;
	}
}

class SphereObj {
	//to encompass all the values of the sphere
	constructor(sphere) {
		this.Sphere = sphere;
	}
}

class CubeObj {
	//to encompass all the values of the cube
	constructor(cube) {
		this.Cube = cube;
	}
}

class CylinderObj {
	//to encompass all values of Cylinder
	constructor(cylinder) {
		this.Cylinder = cylinder;
	}
}

class PyramidObj {
	//to encompass all values of Pyramid
	constructor(pyramid) {
		this.Pyramid = pyramid;
	}
}

class ConeObj {
	//to encompass all values of Cone
	constructor(cone) {
		this.Cone = cone;
	}
}

class Shape {
	//shape class for both sphere and cube.
	constructor(center, radius, height, color, specular, reflection, transparency, refIndex, shape) {
		this.center 	= center;
		if (shape == "Sphere" || shape == "Cylinder" || shape == "Cone") this.radius = radius;
		else if(shape == "Cube" || shape == "Pyramid") this.sideLength = radius;

		if(shape == "Cylinder" || shape == "Pyramid" || shape == "Cone") this.height = height;
		this.color  		 = color;
		this.specular		 = specular;
		this.reflection 	 = reflection;
		this.transparency 	 = transparency;
		this.refractiveIndex = refIndex;
	}
}
