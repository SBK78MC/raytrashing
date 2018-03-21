var arrayListForLight 		 = [];
var arrayListForObject 		 = [];
var paintOrder               = [];
var windowSize               = [];
var globalImagePlaneSizeObject, globalCameraPositionObject, globalSceneObject, globalRaytracerObject, globalAmbientLight, globalFloor, globalItem;
var convertSize;
var currentView = "front";
var receivedImage            = [];

	
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

class Camera {
	//to populate the position of the camera
	constructor(x, y, z) {
		this.x	= x;
		this.y	= y;
		this.z	= z;
	}
}

class CenterForShapesAndLight {
	//to populate coordinates for the centers of shapes and also the light source
	constructor(x, y, z) {
    	this.x = x / 71.4285714286;
    	this.y = y / 71.4285714286;
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
	constructor(center, radius, height, color, specular, reflection, transparency, shape) {
		this.center 	= center;
		if (shape == "Sphere" || shape == "Cylinder" || shape == "Cone") this.radius = radius;
		else if(shape == "Cube" || shape == "Pyramid") this.sideLength = radius;

		if(shape == "Cylinder" || shape == "Pyramid" || shape == "Cone") this.height = height;
		this.color  		= color;
		this.specular		= specular;
		this.reflection 	= reflection;
		this.transparency 	= transparency;
	}
}

/* for slider menu */
$('#lightNav').click(function(){
	if($(this).css("left") <= "10px") {
		$('#lightDiv').animate({'left':'0'},250);
		$('#lightNav').animate({'left':"100%"}, 250);
	}
	else {
		$('#lightDiv').animate({"left": '-400%'}, 250);
		$('#lightNav').animate({"left": '-6%'}, 250);
	}
});

$('#shapesNav').click(function(){
	if($(this).css("left") <= "10px") {
		$('#shapesDiv').animate({'left':'0'}, 250);
		$('#shapesNav').animate({'left':"100%"}, 250);
	}
	else {
		$('#shapesDiv').animate({"left": '-400%'}, 250);
		$('#shapesNav').animate({"left": '-6%'}, 250);
	}
});

$('#settingsNav').click(function(){
	if($(this).css("left") <= "10px") {
		$('#settingsDiv').animate({'left':'0'}, 250);
		$('#settingsNav').animate({'left':"100%"}, 250);
	}
	else {
		$('#settingsDiv').animate({"left": '-400%'}, 250);
		$('#settingsNav').animate({"left": '-6%'}, 250);
	}
});

function hexToRgb(hex) {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    throw new Error('Bad Hex');
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function clearGrid() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	arrayListForLight      		= [];
	arrayListForObject	 	    = [];
	paintOrder                  = [];
	globalRaytracerObject 		= "";
	globalAmbientLight			= "";
	globalSceneObject			= "";
	globalImagePlaneSizeObject  = "";
	globalCameraPositionObject	= "";
};
