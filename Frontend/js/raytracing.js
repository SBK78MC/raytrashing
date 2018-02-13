var arrayListForSphere 		 = [];
var arrayListForCube 		 = [];
var arrayListForLight 		 = [];
var arrayListForObject 		 = [];

var globalImagePlaneSizeObject, globalSceneObject, globalRaytracerObject, globalAmbientLight;

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
		
	//Validation Start(Farhad)
	var valid_size = true;
	var valid_coordinate = true;
	valid_size = validate_size(size);
	valid_coordinate = validate_coordinates(x,y,z);
	//Validation End (Farhad)
	
	//translate to the center of the canvas
	y = -y + c.height/2;
	x = x + c.width/2;
		
	//set values depending on z(depth)
	size = size * 50;
	var convertSize = (size * 15)/z;
	var xCoord = ((x - c.width/2)  * 10 / z) + c.width/2 ;
	var yCoord = ((y - c.width/2)  * 10 / z) + c.width/2 ;
		
	//paint the shape
	if( (shape == "Circle") && valid_size && valid_coordinate ){
		ctx.beginPath();
		ctx.arc(xCoord,yCoord,convertSize,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		
	} else if( (shape == "Cube") && valid_size && valid_coordinate ) {
		//boring rect
		x = x - size/2;
		y = y - size/2;
		ctx.beginPath();
		ctx.rect(x,y,size,size);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
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
	var reflection   		 = document.getElementById('reflection').value;

	//converting Hex to RGB. 
	var hexToRGB 	 		 = hexToRgb(color); 
	var colorObject  		 = new colorObj((hexToRGB[0]/255), (hexToRGB[1]/255), (hexToRGB[2]/255));

	//object creation for sphere
	var sphere 		 		 = new Shape(centerObject, radius, colorObject, reflection, "Sphere");
	var sphereObject 		 = new SphereObj(sphere);

	//object creation for cube
	var cube 		 		 = new Shape(centerObject, radius, colorObject, reflection, "Cube");
	var cubeObject   		 = new CubeObj(cube);


   	 if(shape == "Circle") {
		arrayListForObject.push(sphereObject);
		
	} else {
		arrayListForObject.push(cubeObject);
	}
	//reset values
	document.getElementById("resetShape").reset();
		
};

function renderShapes() { console.log("Srinath renderShape() Function"); // Srinath Srinath Srinath Your function is getting called in the lightbox
	
	//for Ambient Light
	var active = "true";
	if(document.getElementById('brightness').value == 0) active = "false";
	var ambientLight 		 = new AmbientLight(active, document.getElementById('ambient').value / 100);
	globalAmbientLight  	 = ambientLight;
	
	/*
	var modal = document.getElementById('myModal1');
	document.getElementById("loadingKati").src = "./images/spinner.gif";
	modal.style.display = "block";
	*/
	
	//generate the JSON file for the form data and send it as HTTP request

	imagePlaneObjectCreation();
	sceneObjectCreation();
	raytracerObjectCreation();

	var xhr = new XMLHttpRequest();
	var url = "http://127.0.0.1:8000/raytrace"; 
	xhr.open("POST", url, true);
	var jsonData = JSON.stringify(globalRaytracerObject);
	xhr.send(jsonData);
	
	//get binary and make it an image... {there is a problem with headers called CORS from backend.. we have to fix it}
	xhr.responseType = 'arraybuffer';
	xhr.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			
			var uInt8Array = new Uint8Array(this.response);
			var i = uInt8Array.length;
			var binaryString = new Array(i);
			while (i--)
			{
				binaryString[i] = String.fromCharCode(uInt8Array[i]);
			}
			var data = binaryString.join('');

			var base64 = window.btoa(data);
			
			
			
			document.getElementById("loadingKati").src = "data:image/png;base64," + base64;
			
			
			
		}
	}
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

function raytracerObjectCreation() {
	var raytracerObject    = new RayTracer(globalImagePlaneSizeObject, globalSceneObject);
	globalRaytracerObject  = raytracerObject;
}

function sceneObjectCreation() {
	var sceneObject   = new Scene(arrayListForObject, arrayListForLight, globalAmbientLight);
	globalSceneObject = sceneObject;
}

class RayTracer {
	//to encompass all the objects in one parent class - RayTracer
	constructor(imagePlane, scene) {
		this.ImagePlane = imagePlane;
		this.Scene 		= scene;
	}
}

class Scene {
	//to add all the shapes, lights and ambient light to a single class for cleaner JSON
	constructor(shapes, light, ambientLight) {
		this.Object3D 	  = shapes;
		this.Light 		  = light;
		this.AmbientLight = ambientLight;
	}
}

class ImagePlane {
	//to populate the size of the screen which is also the size of the Image Plane
	constructor(width, height) {
		this.width  = width;
		this.height = height; 
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
		this.brightness = brightness;
	}
}

class AmbientLight {
	constructor(active, value) {
		this.active = active;
		this.brightness = value;
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

class Shape {
	//shape class for both sphere and cube.
	constructor(center, radius, color, reflection, shape) {
		this.center 	= center;
		if (shape == "Sphere") this.radius = radius;
		else this.sideLength = radius;
		this.color  	= color;
		this.reflection = reflection;
	}
}

function addLight() {
	
	var x = parseFloat(document.getElementById("light_x").value);
	var y = parseFloat(document.getElementById("light_y").value);
	var z = parseFloat(document.getElementById("light_z").value);
	
	//Validation Start(Farhad)
	var valid_coordinate = true;
	valid_coordinate = validate_coordinates(x,y,z);
	//Validation End(Farhad)
	
	if(valid_coordinate)
	{	
		//paint an image
		var canvas = document.getElementById('myCanvas');
		context = canvas.getContext('2d');
		
		y = -y + canvas.height/2;
		x = x + canvas.width/2;
		
		
		base_image = new Image();
		base_image.src = './images/light.png';
		base_image.onload = function(){
		context.drawImage(base_image, x, y, 15, 18);
		}
		
	}
	
	//for adding Light to JSON
	var lightSourceCenter = new CenterForShapesAndLight(document.getElementById('light_x').value, document.getElementById('light_y').value, document.getElementById('light_z').value);
	var brightness 		  = document.getElementById('brightness').value;
	
	var lightSourceObject = new LightSource(lightSourceCenter, brightness);
	arrayListForLight.push(lightSourceObject);

	//reset values
	document.getElementById("resetLight").reset();
};
	
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

function clearGrid() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	
};

function zoomIn(){
	var canvas = document.getElementById("myCanvas");
	var currentSize = parseInt(canvas.style.height);
	
	canvas.style.height = currentSize + 100 + "px";
	canvas.style.width = currentSize + 100 + "px";
}

function zoomOut(){
	var canvas = document.getElementById("myCanvas");
	var currentSize = parseInt(canvas.style.height);
	
	canvas.style.height = currentSize - 100 + "px";
	canvas.style.width = currentSize - 100 + "px";
	
	
}

function resizeCanvas(){
	
	var size = document.getElementById("sizeOfScreen").value;
	var canvas = document.getElementById("myCanvas");
	document.getElementById("coor").innerHTML = "Coordinates(" + -size/2 + "," + size/2 + ")";  
	
	canvas.style.width = size + 'px' ;
	canvas.style.height= size + 'px';
	canvas.width = size;
	canvas.height = size;
}

function sliderDrag() {
	if(document.getElementById("inputText").style.display == "none"){
		$('#dragDrop').slideUp(1000, up);
		function up(){
		$('#inputText').slideDown(1000);
		}
	}else{
		$('#inputText').slideUp(1000, up);
		function up(){
		$('#dragDrop').slideDown(1000);
		}
		
	}
	
}

 
	
  $(document).ready(function() {
    
	$('#picker').farbtastic('#color');
	
	var canvas = document.getElementById("myCanvas");
	canvas.style.width ='500px';
	canvas.style.height='500px';
	
	//close alert window if user clickes the window
	window.onclick = function(event) {
	var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
	}

});
    
	
//Farhad Section (Please Don't Remove My Code)
	
  
// Lightbox(Farhad)
$(function(){
	
	var $render = $('.render a').simpleLightbox();

	$render.on('show.simplelightbox', function(){
		
		renderShapes();// Srinath Srinath Srinath   Your function is getting called here
		
	})
	.on('error.simplelightbox', function(e){
		console.log('No image found, go to the next/prev');
		console.log(e);
	});
});

// Validating the Coordinates of Shape or Light(Farhad)
function validate_coordinates(x,y,z)
{
	var min_x = -1000;
	var min_y = -1000;
	var min_z = -1000;

	var max_x = 1000;
	var max_y = 1000;
	var max_z = 1000;

	if
	( 
		(  (isNaN(x)) || (x > max_x) || (x < min_x) ) &&
		(  (isNaN(y)) || (y > max_y) || (y < min_y) ) &&
		(  (isNaN(z)) || (z > max_z) || (z < min_z) ) 
	)
	{			
		var modal = document.getElementById('myModal');
		
		document.getElementById("alertMessage").innerHTML = "Invalid Coordinates, Minimum Value:-500, Maximum Value:500";
		modal.style.display = "block";
		return false;
		
	}
	else
	{
		return true;
	}
};

// Validating the Size of Shapes (Farhad)
function validate_size(size)
{
	var min_size = 1;
	var max_size = 500;

	if( (isNaN(size)) || (size > max_size) || (size < min_size) )
	{			
		var modal = document.getElementById('myModal');
		
		document.getElementById("alertMessage").innerHTML = "Invalid Size, Minimum Value:10, Maximum Value:500";
		modal.style.display = "block";
		return false;
		
	}
	else
	{
		return true;
	}
};


	
	
	
	
	
	
