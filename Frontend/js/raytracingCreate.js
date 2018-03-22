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
	if( (x || x == 0) && (y || y == 0) && (z || z == 0) && (size || size == 0) ) {
	} else {
		document.getElementById("alertMessage").innerHTML = "Please fill all necessary Shape values(x, y, z, size).";
		modal.style.display = "block";
		return;

	}
	
	
	
	/*
	//translate to zero and the 250 sets the limits of what the user can see.
	//to change the 250 we should also change the value send to the back end
	//at a new analogy. (class CenterForShapesAndLight)
	y = -y/250 * c.height/2 + c.height/2;
	x = x/250 * c.width/2 + c.width/2;
	//set values depending on z(depth)
	size = size * 50;
	convertSize = (size * 15)/z;
	var xCoord = ((x - c.width/2)  * 10 / z) + c.width/2 ;
	var yCoord = ((y - c.height/2)  * 10 / z) + c.height/2 ;
if(shape == "Cylinder"){
    ctx.translate(xCoord,yCoord);
    ctx.fillStyle = color;
    //ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(97.0, 156.7);
    ctx.lineTo(97.0, 17.7);
    ctx.lineTo(1.0, 17.7);
    ctx.lineTo(1.0, 156.7);
    ctx.lineTo(97.0, 156.7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // layer1/Group/Path
    ctx.beginPath();
    ctx.moveTo(96.7, 156.2);
    ctx.bezierCurveTo(96.7, 165.3, 75.4, 172.7, 49.0, 172.7);
    ctx.bezierCurveTo(22.7, 172.7, 1.4, 165.3, 1.4, 156.2);
    ctx.bezierCurveTo(1.4, 147.2, 22.7, 139.8, 49.0, 139.8);
    ctx.bezierCurveTo(75.4, 139.8, 96.7, 147.2, 96.7, 156.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // layer1/Group/Path
    ctx.beginPath();
    ctx.moveTo(96.7, 17.4);
    ctx.bezierCurveTo(96.7, 26.5, 75.4, 33.8, 49.0, 33.8);
    ctx.bezierCurveTo(22.7, 33.8, 1.4, 26.5, 1.4, 17.4);
    ctx.bezierCurveTo(1.4, 8.4, 22.7, 1.0, 49.0, 1.0);
    ctx.bezierCurveTo(75.4, 1.0, 96.7, 8.4, 96.7, 17.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
	}
		*/
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
	var reflection   		 = document.getElementById('reflection').value;
	var specular			 = document.getElementById('specular').value;
	var transparency		 = document.getElementById('transparency').value;

	//converting Hex to RGB.
	var hexToRGB 	 		 = hexToRgb(color);
	var colorObject  		 = new colorObj((hexToRGB[0]/255), (hexToRGB[1]/255), (hexToRGB[2]/255));

	//object creation for sphere
	var sphere 		 		 = new Shape(centerObject, radius, 0, colorObject, specular, reflection, transparency, "Sphere");
	var sphereObject 		 = new SphereObj(sphere);

	//object creation for cube
	var cube 		 		 = new Shape(centerObject, radius, 0, colorObject, specular, reflection, transparency, "Cube");
	var cubeObject   		 = new CubeObj(cube);

	//object creation for cylinder
	var cylinder 			 = new Shape(centerObject, radius, height, colorObject, specular, reflection, transparency, "Cylinder");
	var cylinderObject		 = new CylinderObj(cylinder);

	//object creation for pyramid
	var pyramid				 = new Shape(centerObject, radius, height, colorObject, specular, reflection, transparency, "Pyramid");
	var pyramidObject 		 = new PyramidObj(pyramid);

	//object creation for cone
	var cone				 = new Shape(centerObject, radius, height, colorObject, specular, reflection, transparency, "Cone");
	var coneObject 			 = new ConeObj(cone);

   	 if(shape == "Circle") {
		arrayListForObject.push(sphereObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Sphere.center.z]);
		paintOrder.sort(compare);

		shapeList("Sphere", sphereObject.Sphere.color);
		

	} else if(shape == "Cube"){
		arrayListForObject.push(cubeObject);
		paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Cube.center.z]);
		paintOrder.sort(compare);



		shapeList("Cube", cubeObject.Cube.color);

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
	/*
	//translate to zero and the 250 sets the limits of what the user can see.
	//to change the 250 we should also change the value send to the back end
	//at a new analogy. (class CenterForShapesAndLight)
	y = -y/250 * canvas.height/2 + canvas.height/2;
	x = x/250 * canvas.width/2 + canvas.width/2;
	var xCoord = ((x - canvas.width/2)  * 10 / z) + canvas.width/2 ;
	var yCoord = ((y - canvas.height/2)  * 10 / z) + canvas.height/2 ;
	}
*/

	//for adding Light to JSON
	var lightSourceCenter = new CenterForShapesAndLight(document.getElementById('light_x').value, document.getElementById('light_y').value, document.getElementById('light_z').value);
	var brightness 		  = document.getElementById('brightness').value;

	var lightSourceObject = new LightSource(lightSourceCenter, brightness);
	arrayListForLight.push(lightSourceObject);

	//redraw canvas
	//context.clearRect(0, 0, canvas.width, canvas.height);
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
	var cameraPos_x 				= document.getElementById("camera_x").value;
	var cameraPos_y 				= document.getElementById("camera_y").value;
	var cameraPos_z 				= document.getElementById("camera_z").value;
	var cameraObject 			= new Camera(cameraPos_x, cameraPos_y, cameraPos_z);
	globalCameraPositionObject	= cameraObject;
}

function raytracerObjectCreation() {
	var raytracerObject    = new RayTracer(globalImagePlaneSizeObject, globalCameraPositionObject, globalSceneObject);
	globalRaytracerObject  = raytracerObject;
}

function sceneObjectCreation() {
	var sceneObject   = new Scene(arrayListForObject, arrayListForLight, globalAmbientLight, globalFloor);
	globalSceneObject = sceneObject;
}
