
function addShape() {

	//get the canvas
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	//get shape
	var e = document.getElementById("shape");
	var shape = e.options[e.selectedIndex].value;

	//get coordinates(circle center, cube upper left corner
	var x = parseFloat(document.getElementById('shape_x').value);
	var y = parseFloat(document.getElementById('shape_y').value);
	var z = parseFloat(document.getElementById('shape_z').value);

	//get size and color
	var size = parseFloat(document.getElementById('size').value);
	var color = document.getElementById('color').value;
	
	//alert message if not all values are correct
	var modal = document.getElementById('myModal');
	if( (x || x == 0) && (y || y == 0) && (z || z == 0) && (size || size == 0) && shape != 'Shape') {
	} else {
		document.getElementById("alertMessage").innerHTML = "Please fill all necessary Shape values(Shape, x, y, z, size).";
		modal.style.display = "block";
		return;
	}	
		/*
		//awesome cube code I made myself and the team doesnt need (legacy of chikans)
		ctx.beginPath();
		ctx.rect(x, y, size, size);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + (size / 2 ), y - (size / 2));
		x = x + (size / 2 );
		y = y - (size / 2);
		ctx.lineTo(x + size, y );
		x = x + size;
		ctx.lineTo(x - (size / 2 ), y + (size / 2) );
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x , y + size);
		y = y + size;
		ctx.lineTo(x - size/2 , y + size/2);
		x = x - size/2;
		y = y + size/2;
		ctx.lineTo(x, y - size);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.stroke();
		ctx.fill();
		y = y + size;
		ctx.lineTo(x - size/2 , y + size/2);
		x = x - size/2;
		y = y + size/2;
		ctx.lineTo(x, y - size);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.stroke();
		ctx.fill();
		*/

	//for Shape
	var centerObject	     = new CenterForShapesAndLight(document.getElementById('shape_x').value, document.getElementById('shape_y').value, document.getElementById('shape_z').value);
	var radius		 		 = document.getElementById('size').value;
	var height				 = document.getElementById('height').value;
	var reflection   		 = document.getElementById('reflection').value / 100;
	var specular			 = document.getElementById('specular').value / 100;
	var transparency		 = document.getElementById('transparency').value;
	var refIndex 			 = document.getElementById('refractive').value;

	//converting Hex to RGB.
	var hexToRGB 	 		 = hexToRgb(color);
	var colorObject  		 = new colorObj((hexToRGB[0]/255), (hexToRGB[1]/255), (hexToRGB[2]/255));

	//object creation for sphere
	var sphere 		 		 = new Shape(centerObject, radius, 0, colorObject, specular, reflection, transparency, refIndex, "Sphere");
	var sphereObject 		 = new SphereObj(sphere);

	//object creation for cube
	var cube 		 		 = new Shape(centerObject, radius, 0, colorObject, specular, reflection, transparency, refIndex, "Cube");
	var cubeObject   		 = new CubeObj(cube);

	//object creation for cylinder
	var cylinder 			 = new Shape(centerObject, radius, height, colorObject, specular, reflection, transparency, refIndex, "Cylinder");
	var cylinderObject		 = new CylinderObj(cylinder);

	//object creation for pyramid
	var pyramid				 = new Shape(centerObject, radius, height, colorObject, specular, reflection, transparency, refIndex, "Pyramid");
	var pyramidObject 		 = new PyramidObj(pyramid);

	//object creation for cone
	var cone				 = new Shape(centerObject, radius, height, colorObject, specular, reflection, transparency, refIndex, "Cone");
	var coneObject 			 = new ConeObj(cone);

   	 if(shape == "Circle") {
		arrayListForObject.push(sphereObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Sphere.center.z]);
		paintOrder.sort(compare);

		shapeList("Sphere", sphereObject.Sphere.color);
	} else if(shape == "Cube") {
		arrayListForObject.push(cubeObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Cube.center.z]);
		paintOrder.sort(compare);

		shapeList("Cube", cubeObject.Cube.color);
	} else if(shape == "Cylinder") {
		arrayListForObject.push(cylinderObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Cylinder.center.z]);
		paintOrder.sort(compare);

		shapeList("Cylinder", cylinderObject.Cylinder.color);
	} else if(shape == "Pyramid") {
		arrayListForObject.push(pyramidObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Pyramid.center.z]);
		paintOrder.sort(compare);

		shapeList("Pyramid", pyramidObject.Pyramid.color);
	} else if(shape == "Cone") {
		arrayListForObject.push(coneObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Cone.center.z]);
		paintOrder.sort(compare);

		shapeList("Cone", coneObject.Cone.color);
	}

	function compare(a,b) {
		return b[1] - a[1];
	}

	redraw(c, ctx);

	//reset values
	document.getElementById("resetShape").reset();
	document.getElementById("Height").style.display='none';
};

function addLight() {
	var x = parseFloat(document.getElementById("light_x").value);
	var y = parseFloat(document.getElementById("light_y").value);
	var z = parseFloat(document.getElementById("light_z").value);

	//alert message if not all values are correct
	var modal = document.getElementById('myModal');
	if ( (x || x == 0) && (y || y == 0) && (z || z == 0) ) {
	} else {
		document.getElementById("alertMessage").innerHTML = "Please fill all necessary Light Source values(x, y, z).";
		modal.style.display = "block";
		return;
	}

	var canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

	//for adding Light to JSON
	var lightSourceCenter = new CenterForShapesAndLight(document.getElementById('light_x').value, document.getElementById('light_y').value, document.getElementById('light_z').value);
	var brightness 		  = document.getElementById('brightness').value;

	var lightSourceObject = new LightSource(lightSourceCenter, brightness);
	arrayListForLight.push(lightSourceObject);

	//redraw canvas
	lightList();
	redraw(canvas,context);

	//reset values
	document.getElementById("brightness").value = 40;
	document.getElementById("light_x").value = '';
	document.getElementById("light_y").value = '';
	document.getElementById("light_z").value = '';
};


function imagePlaneObjectCreation() {
	/*
	* ImagePlane class.
	* The reason to put the Image Plane object creation in the imagePlaneObjectCreation() function and calling
	* it in the renderShapes() function is because whenever the Image plane size changes, there should be a
	* different rendering for the same set of already added shapes.
	*/
	var screenSize			   = document.getElementById("sizeOfScreen");
	var sizeValue 			   = screenSize.options[screenSize.selectedIndex].value;
	var imageObject 		   = new ImagePlane(sizeValue, sizeValue);
	globalImagePlaneSizeObject = imageObject;
}

function cameraPositionObject() {
	var cameraPos_x 				= document.getElementById("camera_pos_x").value;
	var cameraPos_y 				= document.getElementById("camera_pos_y").value;
	var cameraPos_z 				= document.getElementById("camera_pos_z").value;
	var cameraObj	 				= new CameraCoord(cameraPos_x, cameraPos_y, cameraPos_z);
	globalCameraPositionObject		= cameraObj;
}

function cameraDirectionObject() {
	var cameraDir_x					= document.getElementById("camera_dir_x").value;
	var cameraDir_y					= document.getElementById("camera_dir_y").value;
	var cameraDir_z					= document.getElementById("camera_dir_z").value;
	var cameraDirObj				= new CameraCoord(cameraDir_x, cameraDir_y, cameraDir_z);
	globalCameraDirectionObject		= cameraDirObj;
}

function cameraAngleObject() {
	var camera_rig_x				= document.getElementById("camera_rig_x").value;
	var camera_rig_y				= document.getElementById("camera_rig_y").value;
	var camera_rig_z				= document.getElementById("camera_rig_z").value;
	var cameraAngObj				= new CameraCoord(camera_rig_x, camera_rig_y, camera_rig_z);
	globalCameraAngleObject			= cameraAngObj;
}

function cameraObjectCreation() {
	var cameraObject 	   = new Camera(globalCameraPositionObject, globalCameraDirectionObject, globalCameraAngleObject);
	globalCameraObject 	   = cameraObject;
}

function raytracerObjectCreation() {
	var raytracerObject    = new RayTracer(globalImagePlaneSizeObject, globalAntialiasingObject, globalCameraObject, globalSceneObject);
	globalRaytracerObject  = raytracerObject;
}

function sceneObjectCreation() {
	var sceneObject   	   = new Scene(arrayListForObject, arrayListForLight, globalAmbientLight, globalFloor, globalRoom);
	globalSceneObject 	   = sceneObject;
}