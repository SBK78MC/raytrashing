var arrayListForSphere 		 = [];
var arrayListForCube 		 = [];
var arrayListForLight 		 = [];
var arrayListForObject 		 = [];

var globalWidth, globalHeight, globalAmbientLight;

function addShape() {
	//get the canvas
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");	
		
	//get shape
	var e = document.getElementById("shape");
	var shape = e.options[e.selectedIndex].value;
		
	//get coordinates(circle center, cube upper left corner
	var x = parseInt(document.getElementById('shape_x').value);
	var y = parseInt(document.getElementById('shape_y').value);
	var z = parseInt(document.getElementById('shape_z').value);
	y = -y + c.height/2;
	x = x + c.width/2;
			
	//get size and color
	var size = parseInt(document.getElementById('size').value);
	var color = document.getElementById('color').value;
		
		//alert message if not all values are correct
	var modal = document.getElementById('myModal');
	if( (x || x == 0) && (y || y == 0) && (z || z == 0) && (size || size == 0) ) {
	} else {
		document.getElementById("alertMessage").innerHTML = "Please fill all necessary Shape values(x, y, z, size).";
		modal.style.display = "block";
		return;
			
	}
		
	//paint the shape
	if(shape == "Circle"){
		ctx.beginPath();
		ctx.arc(x,y,size,0,2*Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		
	} else if(shape == "Cube") {
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
		//awesome cube code I made myself and the team doesnt need
		ctx.beginPath();
		ctx.rect(x, y, size, size);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	} else if(shape == "Cube") {
			
		//awesome cube code I made myself and the team doesnt need
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
	var centerObject = new CenterForShapesAndLight(document.getElementById('shape_x').value, document.getElementById('shape_y').value, document.getElementById('shape_z').value);
	var radius		 = document.getElementById('size').value;
	var reflection   = document.getElementById('reflection').value;

	//converting Hex to RGB. 
	var hexToRGB 	 = hexToRgb(color); 
	var colorObject  = new colorObj(hexToRGB[0], hexToRGB[1], hexToRGB[2]);

	//dummy value at the moment for imagePlane Class
	globalWidth 	 = radius;
	globalHeight	 = radius;

	//object creation for sphere
	var sphere 		 = new Shape(centerObject, radius, colorObject, reflection, "Sphere");
	var sphereObject = new SphereObj(sphere);

	//object creation for cube
	var cube 		 = new Shape(centerObject, radius, colorObject, reflection, "Cube");
	var cubeObject   = new CubeObj(cube);

	//for Ambient Light
	var ambientLight 	= new AmbientLight(document.getElementById('brightness').value, document.getElementById('ambient').value);
	globalAmbientLight  = ambientLight;

   	 if(shape == "Circle") {
		arrayListForObject.push(sphereObject);
		
	} else {
		arrayListForObject.push(cubeObject);
	}
	//reset values
	document.getElementById("resetShape").reset();
		
};

function renderShapes() {
	//generate the JSON file for the form data and send it as HTTP request

	var xhr = new XMLHttpRequest();
	var url = "url";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	var jsonData = JSON.stringify({"ImagePlane": {"width": globalWidth, "height": globalHeight}, "Scene": {"Object3D": arrayListForObject, "Light": arrayListForLight, "AmbientLight": globalAmbientLight}});
	xhr.send(jsonData);

	//console.log(JSON.stringify({"ImagePlane": {"width": globalWidth, "height": globalHeight}, "Scene": {"Object3D": arrayListForObject, "Light": arrayListForLight, "AmbientLight": globalAmbientLight}}));
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
	
	var x = parseInt(document.getElementById("light_x").value);
	var y = parseInt(document.getElementById("light_y").value);
	var z = parseInt(document.getElementById("light_z").value);
	
	//alert message if not all values are correct
	var modal = document.getElementById('myModal');	
	if ( (x || x == 0) && (y || y == 0) && (z || z == 0) ) {
	} else {		
		document.getElementById("alertMessage").innerHTML = "Please fill all necessary Light Source values(x, y, z).";
		modal.style.display = "block";
		return;
	}
	
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

function gridSize() {
	
	var v = document.getElementById("screenSize1").value;
	if(v == '1'){
		document.getElementById("center").style.backgroundSize = "10% 10%";
	}else if(v == '2'){
		document.getElementById("center").style.backgroundSize = "9% 9%";
	}else if(v == '3'){
		document.getElementById("center").style.backgroundSize = "8% 8%";
	}else if(v == '4'){
		document.getElementById("center").style.backgroundSize = "7% 7%";
	}else if(v == '5'){
		document.getElementById("center").style.backgroundSize = "6% 6%";
	}else if(v == '6'){
		document.getElementById("center").style.backgroundSize = "5% 5%";
	}
}

	//setup page
  $(document).ready(function() {
    
	$('#picker').farbtastic('#color');
	
	//fit canvas to div
	var canvas = document.getElementById("myCanvas");
	fitToContainer(canvas);

	function fitToContainer(canvas) {
		// Make it visually fill the positioned parent
		canvas.style.width ='100%';
		canvas.style.height='100%';
		// ...then set the internal size to match
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}
	
	//close alert window if user clickes the window
	window.onclick = function(event) {
	var modal = document.getElementById('myModal');
    if (event.target == modal) {
       	 modal.style.display = "none";
    	}
	}

});
    
