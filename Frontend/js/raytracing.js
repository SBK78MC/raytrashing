var arrayListForLight 		 = [];
var arrayListForObject 		 = [];
var paintOrder               = [];
var windowSize               = [];
var globalImagePlaneSizeObject, globalCameraPositionObject, globalSceneObject, globalRaytracerObject, globalAmbientLight, globalFloor, globalItem, globalFileName;
var convertSize;
var currentView = "front";
var receivedImage            = [];



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

function renderShapes() {
	//for Ambient Light
	var active  = "true";
	var checked = document.getElementById('floor').checked;
	if(checked == true)	checked = "true";
	else checked = "false";
	if(document.getElementById('brightness').value == 0) active = "false";
	var ambientLight 		 = new AmbientLight(active, document.getElementById('ambient').value / 100);
	globalAmbientLight  	 = ambientLight;
	var floor				 = new Floor(checked);
	globalFloor				 = floor;
	var modal				 = document.getElementById('myModal1');
	document.getElementById("loadingKati").src = "./images/spinner.gif";
	modal.style.display = "block";

	//generate the JSON file for the form data and send it as HTTP request

	imagePlaneObjectCreation();
	cameraPositionObject();
	sceneObjectCreation();
	raytracerObjectCreation();

	fileName(); //gets the name of the image from the user
	var xhr = new XMLHttpRequest();
	var url = "http://127.0.0.1:8000/raytrace";
	xhr.open("POST", url, true);
	var jsonData = JSON.stringify(globalRaytracerObject);
	xhr.send(jsonData);

	//get binary and make it an image... {there is a problem with headers called CORS from backend.. we have to fix it} (fixed as of 13.02.2018!)
	xhr.responseType = 'arraybuffer';
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("download").style.display = 'inline-block';
			var uInt8Array = new Uint8Array(this.response);
			var i = uInt8Array.length;
			var binaryString = new Array(i);
			while (i--) {
				binaryString[i] = String.fromCharCode(uInt8Array[i]);
			}
			var data = binaryString.join('');
			var base64 = window.btoa(data);
            var modal = document.getElementById('myModal1');
			document.getElementById("loadingKati").src = "data:image/png;base64," + base64;
			
			//store image
			receivedImage = base64;
			document.getElementById("download").href = "data:image/png;base64," + receivedImage;
			if(globalFileName == "") {
				globalFileName = "raytrashing.png"
			}
			document.getElementById("download").setAttribute("download", globalFileName);
		}
	}
}

function fileName() {
	var file       = document.getElementById("downloadName").value;
	globalFileName = file;
}


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

function lightList() {
	var light 		= document.getElementById("Lights");
	var option 		= document.createElement("option");
	option.text 	= arrayListForLight.length-1;
	option.value 	= arrayListForLight.length-1;
	light.add(option);
}

function shapeList(name, color) {
	var shape 				= document.getElementById("Shapes");
	var option 				= document.createElement("option");
	option.text			    = name;
	option.style.background = rgbToHex(color.r * 255, color.g * 255, color.b * 255);
	option.value 			= arrayListForObject.length-1;
	shape.add(option);
}
	
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

function shapeOption()
{
	var shape = document.getElementById("Shapes");
	if(typeof shape[shape.selectedIndex] != 'undefined') {
		var item_value = shape[shape.selectedIndex].value;
	if(typeof arrayListForObject[item_value].Sphere != 'undefined' && item_value > -1) {
		document.getElementById('change_x').value = parseInt(arrayListForObject[item_value].Sphere.center.x*71.4285714286);
		document.getElementById('change_y').value = parseInt(arrayListForObject[item_value].Sphere.center.y*71.4285714286);
		document.getElementById('change_z').value = parseInt(arrayListForObject[item_value].Sphere.center.z);
		document.getElementById('change_s').value = parseInt(arrayListForObject[item_value].Sphere.radius);
	} else if(typeof arrayListForObject[item_value].Cube != 'undefined' && item_value > -1) {
		document.getElementById('change_x').value = parseInt(arrayListForObject[item_value].Cube.center.x*71.4285714286);
		document.getElementById('change_y').value = parseInt(arrayListForObject[item_value].Cube.center.y*71.4285714286);
		document.getElementById('change_z').value = parseInt(arrayListForObject[item_value].Cube.center.z);
		document.getElementById('change_s').value = parseInt(arrayListForObject[item_value].Cube.sideLength);
	}
}
    var elements = document.getElementById("Lights").options;
    for(var i = 0; i < elements.length; i++) {
    	elements[i].selected = false;
    }
	globalItem = "shape";
}

function lightOption() {
	var light = document.getElementById("Lights");
	var item_value = light[light.selectedIndex].value;
	
	document.getElementById('change_x').value = arrayListForLight[item_value].center.x*71.4285714286;
	document.getElementById('change_y').value = arrayListForLight[item_value].center.y*71.4285714286;
	document.getElementById('change_z').value = arrayListForLight[item_value].center.z;
	document.getElementById('change_s').value = "--";
	
    var elements = document.getElementById("Shapes").options;
    for(var i = 0; i < elements.length; i++) {
    	elements[i].selected = false;
    }
	
	globalItem = "light";
}

// Changing the shape location and size
function changeItem()
{
	//Change Shape
	if(globalItem == "shape")
	{	
		var shape = document.getElementById("Shapes");
		var item_value = shape[shape.selectedIndex].value;

		if(typeof arrayListForObject[item_value].Sphere != 'undefined') {
			arrayListForObject[item_value].Sphere.center.x = (document.getElementById('change_x').value)/71.4285714286;
			arrayListForObject[item_value].Sphere.center.y = (document.getElementById('change_y').value)/71.4285714286;
			arrayListForObject[item_value].Sphere.center.z = (document.getElementById('change_z').value);
			arrayListForObject[item_value].Sphere.radius   = (document.getElementById('change_s').value);
		} else if(typeof arrayListForObject[item_value].Cube != 'undefined') {
			arrayListForObject[item_value].Cube.center.x   = (document.getElementById('change_x').value)/71.4285714286;
			arrayListForObject[item_value].Cube.center.y   = (document.getElementById('change_y').value)/71.4285714286;
			arrayListForObject[item_value].Cube.center.z   = (document.getElementById('change_z').value);
			arrayListForObject[item_value].Cube.sideLength = (document.getElementById('change_s').value);
		}
	}
	//Change Light
	else if(globalItem == "light")
	{
		var light = document.getElementById("Lights");
		var item_value = light[light.selectedIndex].value;
		
		arrayListForLight[item_value].center.x = (document.getElementById('change_x').value)/71.4285714286;
		arrayListForLight[item_value].center.y = (document.getElementById('change_y').value)/71.4285714286;
		arrayListForLight[item_value].center.z = (document.getElementById('change_z').value);	
	}
	canvas  = document.getElementById("myCanvas");
	ctx		= canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	redraw(canvas, ctx);
}

// Deleting the shape from list and all scenes
function deleteItem()
{
	canvas  = document.getElementById("myCanvas");
	ctx		= canvas.getContext("2d");
	if(globalItem == "shape") {
		//Delete Shape
		var shape = document.getElementById("Shapes");
		var item_value = shape[shape.selectedIndex].value;
		arrayListForObject.splice(item_value, 1);

		//Delete Select Shape
		var shape_select = document.getElementById("Shapes");
		shape_select.remove(shape.selectedIndex);	
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redraw(canvas, ctx);
	} else {
		//Delete Lights
		var light 			= document.getElementById("Lights");
		var light_value 	= light[light.selectedIndex].value;
		arrayListForLight.splice(light_value, 1);

		//Delete Select Light
		light.remove(light.selectedIndex);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redraw(canvas, ctx);
	}
}

function shapeSelect() {
	var e = document.getElementById("shape");
	var shape = e.options[e.selectedIndex].value;
	if(shape == "Cylinder" || shape == "Pyramid" || shape == "Cone") {
		document.getElementById("Height").style.display='block';
	} else {
		document.getElementById("Height").style.display='none';
	}
}

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
	globalFileName				= "";
};

function cameraAngle(){
	var view = document.getElementById("camAngle").value;
	if(view == "front"){
		$('#camera_pos_x').val(0);
		$('#camera_pos_y').val(0);
		$('#camera_pos_z').val(0);
		
		$('#camera_dir_x').val(0);
		$('#camera_dir_y').val(0);
		$('#camera_dir_z').val(1);
	}else if(view == "top"){
		$('#camera_pos_x').val(0);
		$('#camera_pos_y').val(10);
		$('#camera_pos_z').val(10);
		
		$('#camera_dir_x').val(0);
		$('#camera_dir_y').val(0);
		$('#camera_dir_z').val(10);
	}else if(view == "side"){
		$('#camera_pos_x').val(10);
		$('#camera_pos_y').val(0);
		$('#camera_pos_z').val(10);
		
		$('#camera_dir_x').val(0);
		$('#camera_dir_y').val(0);
		$('#camera_dir_z').val(10);
	}
	
}
function redraw(canvas, ctx){

	function convertToSize(x, z){
			if(x == 500){
				return size = 999;
			}else{
				size = 250/(500 - x);
				//size = size *50 * 15 / z;
				z = (1 - (x/500)) * 20;
				size = size *50 * 15 / z;
				
				return size = size/75* canvas.width* 0.0914;

			}
	}


	for(j = 0; j < arrayListForObject.length; j++){
		var i = paintOrder[j][0];
		if(typeof arrayListForObject[i].Sphere != 'undefined'){

			var shapeX = arrayListForObject[i].Sphere.center.x*71.4285714286 + 250;
			var shapeY = arrayListForObject[i].Sphere.center.y*71.4285714286 + 250;
			var shapeR = arrayListForObject[i].Sphere.radius*50 * 15 / arrayListForObject[i].Sphere.center.z ;
			var shapeC = arrayListForObject[i].Sphere.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);

			//size of shape on windows resize
			//shapeR = (shapeR/250) * canvas.height/2;
			


			shapeR = shapeR/75* canvas.width* 0.0914;

			
			ctx.beginPath();
			if(currentView == "front"){
				ctx.arc(shapeX/500 * canvas.width,	Math.abs(shapeY/500 * canvas.height - canvas.height) ,shapeR,0,2*Math.PI);
			}else if(currentView == "top"){
				//convert z to y
				
				var yTop = ((1 - (arrayListForObject[i].Sphere.center.z/20))*500) - 50;
				//yTop = Math.abs(yTop/500 * canvas.height - canvas.height/2)

				//convert y to size
				size = convertToSize(shapeY, arrayListForObject[i].Sphere.center.z);

				ctx.arc(shapeX/500 * canvas.width,	yTop ,size,0,2*Math.PI);
			}else if(currentView == "side"){
				//convert z to x
				var xSide = ((arrayListForObject[i].Sphere.center.z/20)*500);
				xSide = (xSide/500)*canvas.width;

				//convert x to size
				size = convertToSize(shapeX, arrayListForObject[i].Sphere.center.z);

				if(size > 0){
					ctx.arc(xSide, Math.abs(shapeY/500 * canvas.height - canvas.height) ,size,0,2*Math.PI);
				}

			}

			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
		}

		if(typeof arrayListForObject[i].Cube != 'undefined'){

			var shapeX = arrayListForObject[i].Cube.center.x*71.4285714286 + 250;
			var shapeY = arrayListForObject[i].Cube.center.y*71.4285714286 + 250;
			var shapeR = arrayListForObject[i].Cube.sideLength*50 * 15 / arrayListForObject[i].Cube.center.z ;
			var shapeC = arrayListForObject[i].Cube.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);

			//size of shape on windows resize
			//shapeR = resizeObject(shapeR);
			shapeR = shapeR/75* canvas.width* 0.0914;

			//paint
			ctx.beginPath();
			if(currentView == "front"){
				ctx.rect(shapeX/500 * canvas.width - shapeR/2, Math.abs(shapeY/500 * canvas.height - canvas.height) - shapeR/2,shapeR,shapeR);
			}else if(currentView == "top"){
				//convert z to y
				var yTop = ((arrayListForObject[i].Cube.center.z/20)*500) - 250;
				yTop = Math.abs(yTop/500 * canvas.height - canvas.height/2)

				//convert y to size
				size = convertToSize(shapeY, arrayListForObject[i].Cube.center.z);

				ctx.rect(shapeX/500 * canvas.width - size/2, yTop - size/2,size,size);
			}else if(currentView == "side"){
				//convert z to x
				var xSide = ((arrayListForObject[i].Cube.center.z/20)*500);
				xSide = (xSide/500)*canvas.width;

				//convert x to size
				size = convertToSize(shapeX, arrayListForObject[i].Cube.center.z);

				ctx.rect(xSide - size/2, Math.abs(shapeY/500 * canvas.height - canvas.height) - size/2,size,size);
			}
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();

		}

	}
	base_image = new Image();
	base_image.src = './images/light.png';
	base_image.onload = function(){
		for(i = 0; i < arrayListForLight.length; i++){

			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");

			if(typeof arrayListForLight[i].center != 'undefined') {
				var lightX = arrayListForLight[i].center.x*71.4285714286 + 250;
				var lightY = arrayListForLight[i].center.y*71.4285714286 + 250;
				ctx.drawImage(base_image, lightX/500 * canvas.width, Math.abs(lightY/500 * canvas.height - canvas.height), 15, 18);
			}

		}
	}
}

function sliderDrag(choice) {
if(choice == 0){
	if(document.getElementById("#inputText").style.display == "none") {
		$('#dragDrop').slideUp(1000, up);
		function up() {
			$('#inputText').slideDown(1000);
		}
	} else {
		$('#inputText').slideUp(1000, up);
		function up() {
			$('#dragDrop').slideDown(1000);
		}
	}
}else if(choice == 1){
	if(document.getElementById("advancedCam").style.display == "none") {
		$('#advancedCam').slideDown(1000);
		
	} else {
		$('#advancedCam').slideUp(1000, up);
		
	}
}
}

//create different views
function topView() {
	keepActiveButton(1);
	currentView = "top";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}

function frontView() {
	keepActiveButton(0);
	currentView = "front";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}

function sideView(){
	//make active color
	keepActiveButton(2);
	currentView = "side";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}

function keepActiveButton(active) {
	var sides = ["front", "top", "side"];
	for(i = 0; i < 3; i++){
		if(i == active) {
			document.getElementById(sides[active]).style.background = '#ccc';
		}else {
			document.getElementById(sides[i]).style.background = '#ddd';
		}
	}
}

function autoPaint(shape) {
	document.getElementById("shape").selectedIndex = shape + 1;
	document.getElementById("shape_x").value = '0';
	document.getElementById("shape_y").value = '0';
	addShape();
}

  $(document).ready(function() {

	$('#picker').farbtastic('#color');
	cameraAngle();
	var canvas = document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");
	canvas.style.width ='100%';
	canvas.style.height='85%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	windowSize[0] = canvas.offsetWidth;
	windowSize[1] = canvas.offsetHeight;

	//close alert window if user clicks the window
	window.onclick = function(event) {
	var modal = document.getElementById('myModal');
    	if (event.target == modal) {
				modal.style.display = "none";
				globalFileName      = "";
   	  	}
	}

	//dragging is until the end of the file

	var canvasOffset=$("#myCanvas").offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;
    var canvasWidth=canvas.width;
    var canvasHeight=canvas.height;
    var isDragging=false;
	var index;

	function handleMouseDown(e){

      canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
      canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);
	  canMouseX = ((canMouseX/ canvas.width) * 500 ) - 250 ;
	  canMouseY = ((1 - (canMouseY/ canvas.height)) * 500 ) - 250;
	  //canMouseY = Math.abs(((canMouseY/ canvas.height) * 500 ) - 500) - 250 ;

	//console.log("X: " + canMouseX + "  Y: " + canMouseY);
	

if(currentView == "front"){

	  for(j = 0; j < arrayListForObject.length; j++){
		  var i = paintOrder[j][0];
		  if(typeof arrayListForObject[i].Sphere != 'undefined'){
			var shapeR = (arrayListForObject[i].Sphere.radius*50*15)/arrayListForObject[i].Sphere.center.z;
		    var shapeX = arrayListForObject[i].Sphere.center.x*71.4285714286 ;
		    var shapeY = arrayListForObject[i].Sphere.center.y*71.4285714286 ;
			shapeR = shapeR/75* canvas.width* 0.0914;
			
		    //console.log("Y axis: " + shapeY + "  R :" + shapeR);
			
		    if(canMouseX > shapeX - shapeR && canMouseX < shapeX + shapeR && canMouseY > shapeY - shapeR && canMouseY < shapeY + shapeR){
			  isDragging=true;
			  index = i;
		    }
		  } else if(typeof arrayListForObject[i].Cube != 'undefined'){
			var shapeR = (arrayListForObject[i].Cube.sideLength*50*15)/arrayListForObject[i].Cube.center.z;
		    var shapeX = arrayListForObject[i].Cube.center.x*71.4285714286 ;
		    var shapeY = arrayListForObject[i].Cube.center.y*71.4285714286 ;
			shapeR = shapeR/75* canvas.width* 0.0914;
		    
		    if(canMouseX > shapeX - shapeR/2 && canMouseX < shapeX + shapeR/2 && canMouseY > shapeY - shapeR/2 && canMouseY < shapeY + shapeR/2){
			  isDragging=true;
			  index = i;
			 }
		  }
	   }
	 }
  }

function handleMouseUp(e) {
	canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
	canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);

	if(isDragging){
		if(typeof arrayListForObject[index].Sphere != 'undefined') {
			arrayListForObject[index].Sphere.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
			arrayListForObject[index].Sphere.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
			ctx.clearRect(0,0,canvas.width,canvas.height);
		} else if(typeof arrayListForObject[index].Cube != 'undefined') {
			arrayListForObject[index].Cube.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
			arrayListForObject[index].Cube.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
			ctx.clearRect(0,0,canvas.width,canvas.height);

	}
		redraw(canvas, ctx);
		shapeOption();
	}
		// clear the drag flag
		isDragging=false;
}

    function handleMouseOut(e){
		handleMouseUp(e);
    }

function handleMouseMove(e){

    canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
    canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);
      // if the drag flag is set, clear the canvas and draw the image
    if(isDragging){
	    ctx.clearRect(0,0,canvas.width,canvas.height);

		if(typeof arrayListForObject[index].Sphere != 'undefined'){
			arrayListForObject[index].Sphere.center.x = 999999;
			arrayListForObject[index].Sphere.center.y = 999999;
			convertSize = (arrayListForObject[index].Sphere.radius * 50)*15/arrayListForObject[index].Sphere.center.z ;

			convertSize = convertSize/75* canvas.width* 0.0914;

			var shapeC = arrayListForObject[index].Sphere.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			ctx.beginPath();
			ctx.arc(canMouseX,canMouseY,convertSize,0,2*Math.PI);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
		} else if(typeof arrayListForObject[index].Cube != 'undefined') {
			arrayListForObject[index].Cube.center.x = 999999;
			arrayListForObject[index].Cube.center.y = 999999;
			convertSize = (arrayListForObject[index].Cube.sideLength * 50)*15/arrayListForObject[index].Cube.center.z ;
			convertSize = convertSize/75* canvas.width* 0.0914;

			var shapeC = arrayListForObject[index].Cube.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			ctx.beginPath();
			ctx.rect(canMouseX - convertSize/2,canMouseY - convertSize/2,convertSize,convertSize);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();

	    }
		  redraw(canvas, ctx);
	  }
    }
	window.onresize = function(event) {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		canvas = document.getElementById("myCanvas");
		ctx=canvas.getContext("2d");
		canvas.style.width ='100%';
		canvas.style.height='85%';
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		redraw(canvas, ctx);
		
		document.getElementById("loadingKati").style.width = document.getElementById("loadingKati").style.height;

	};

    $("#myCanvas").mousedown(function(e){handleMouseDown(e);});
    $("#myCanvas").mousemove(function(e){handleMouseMove(e);});
    $("#myCanvas").mouseup(function(e){handleMouseUp(e);});
    $("#myCanvas").mouseout(function(e){handleMouseOut(e);});

});
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