var arrayListForSphere 		 = [];
var arrayListForCube 		 = [];
var arrayListForLight 		 = [];
var arrayListForObject 		 = [];
var paintOrder               = [];
var boolDraged               = [];
var rendered                 = [];
var globalImagePlaneSizeObject, globalSceneObject, globalRaytracerObject, globalAmbientLight;
var convertSize;





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
		
	//paint the shape
	if(shape == "Circle"){
		ctx.beginPath();
		ctx.arc(xCoord,yCoord,convertSize,0,2*Math.PI);
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
	
	function compare(a,b) {
		return b[1] - a[1];
	}
	
	paintOrder.push([arrayListForObject.length - 1, arrayListForObject[arrayListForObject.length - 1].Sphere.center.z]);
	paintOrder.sort(compare);
	boolDraged.push([arrayListForObject.length - 1, false]);
	rendered.push([arrayListForObject.length - 1, false]);
	
	//reset values
	document.getElementById("resetShape").reset();
		
};

function renderShapes() {
	
	for(i = 0; i < arrayListForObject.length; i++){
		console.log(arrayListForObject[boolDraged[i][0]].Sphere.center.x);
		if(boolDraged[i][1]){
			arrayListForObject[boolDraged[i][0]].Sphere.center.x = (arrayListForObject[boolDraged[i][0]].Sphere.center.z/10)*arrayListForObject[boolDraged[i][0]].Sphere.center.x;
			arrayListForObject[boolDraged[i][0]].Sphere.center.y = (arrayListForObject[boolDraged[i][0]].Sphere.center.z/10)*arrayListForObject[boolDraged[i][0]].Sphere.center.y;
			rendered[i][1] = true;
		}
		console.log(arrayListForObject[boolDraged[i][0]].Sphere.center.x);
	}
	
	//for Ambient Light
	var active = "true";
	if(document.getElementById('brightness').value == 0) active = "false";
	var ambientLight 		 = new AmbientLight(active, document.getElementById('ambient').value / 100);
	globalAmbientLight  	 = ambientLight;
	
	
	var modal = document.getElementById('myModal1');
	document.getElementById("loadingKati").src = "./images/spinner.gif";
	modal.style.display = "block";
	
	//generate the JSON file for the form data and send it as HTTP request

	imagePlaneObjectCreation();
	sceneObjectCreation();
	raytracerObjectCreation();

	var xhr = new XMLHttpRequest();
	var url = "http://127.0.0.1:8000/raytrace"; 
	xhr.open("POST", url, true);
	var jsonData = JSON.stringify(globalRaytracerObject);
	xhr.send(jsonData);
	
	//get binary and make it an image... {there is a problem with headers called CORS from backend.. we have to fix it} (fixed as of 13.02.2018!)
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
			
            var modal = document.getElementById('myModal1');
			document.getElementById("loadingKati").src = "data:image/png;base64," + base64;
		}
		
		
		
		for(i = 0; i < arrayListForObject.length; i++){
		
		if(rendered[i][1]){
			arrayListForObject[boolDraged[i][0]].Sphere.center.x = (10/arrayListForObject[boolDraged[i][0]].Sphere.center.z)*arrayListForObject[boolDraged[i][0]].Sphere.center.x;
			arrayListForObject[boolDraged[i][0]].Sphere.center.y = (10/arrayListForObject[boolDraged[i][0]].Sphere.center.z)*arrayListForObject[boolDraged[i][0]].Sphere.center.y;
			
			var canvas = document.getElementById("myCanvas");
	        var ctx = canvas.getContext("2d");	
			ctx.clearRect(0,0,canvas.width,canvas.height);
			redraw(canvas, ctx);
			
		}
		
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
		this.brightness = brightness / 100;
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
	
	//translate to zero and the 250 sets the limits of what the user can see.
	//to change the 250 we should also change the value send to the back end 
	//at a new analogy. (class CenterForShapesAndLight)
	y = -y/250 * canvas.height/2 + canvas.height/2;
	x = x/250 * canvas.width/2 + canvas.width/2;
	
	var xCoord = ((x - canvas.width/2)  * 10 / z) + canvas.width/2 ;
	var yCoord = ((y - canvas.height/2)  * 10 / z) + canvas.height/2 ;
	
	base_image = new Image();
	base_image.src = './images/light.png';
	base_image.onload = function(){
		context.drawImage(base_image, xCoord, yCoord, 15, 18);
	}

	//for adding Light to JSON
	var lightSourceCenter = new CenterForShapesAndLight(document.getElementById('light_x').value, document.getElementById('light_y').value, document.getElementById('light_z').value);
	var brightness 		  = document.getElementById('brightness').value;
	
	var lightSourceObject = new LightSource(lightSourceCenter, brightness);
	arrayListForLight.push(lightSourceObject);

	//reset values
	document.getElementById("brightness").value = 40;
	document.getElementById("light_x").value = '';
	document.getElementById("light_y").value = '';
	document.getElementById("light_z").value = '';
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
	arrayListForSphere 	   		= [];
	arrayListForCube	   		= [];
	arrayListForLight      		= [];
	arrayListForObject	 	    = [];
	paintOrder                  = [];
	globalRaytracerObject 		= "";
	globalAmbientLight			= "";
	globalSceneObject			= "";
	globalImagePlaneSizeObject  = "";
};


function redraw(canvas, ctx){
	for(j = 0; j < arrayListForObject.length; j++){
		var i = paintOrder[j][0];
		
		
		  var shapeX = arrayListForObject[i].Sphere.center.x*71.4285714286 + 250;
		  var shapeY = arrayListForObject[i].Sphere.center.y*71.4285714286 + 250;
		  var shapeR = arrayListForObject[i].Sphere.radius*50 * 15 / arrayListForObject[i].Sphere.center.z ;
		  var shapeC = arrayListForObject[i].Sphere.color;
		  var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
		  //console.log(shapeC.r);
		  
		  
		  ctx.beginPath();
		  ctx.arc(shapeX/500 * canvas.width,	Math.abs(shapeY/500 * canvas.height - canvas.height) ,shapeR,0,2*Math.PI);
		  ctx.fillStyle = color;
		  ctx.fill();
		  ctx.stroke();
		
		  
	}
	
}



function sliderDrag() {
	
	if(document.getElementById("inputText").style.display == "none") {
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
	
}
	
  $(document).ready(function() {
    
	$('#picker').farbtastic('#color');
	
	var canvas = document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");
	canvas.style.width ='100%';
	canvas.style.height='100%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	
	//close alert window if user clicks the window
	window.onclick = function(event) {
	var modal = document.getElementById('myModal');
    	if (event.target == modal) {
       	 modal.style.display = "none";
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
	  
	  //canMouseX = ((canMouseX/ canvas.width) * 500 ) ;
	  //canMouseY = Math.abs(((canMouseY/ canvas.height) * 500 ) - 500) ;
	  
	  canMouseX = ((canMouseX/ canvas.width) * 500 ) - 250 ;
	  canMouseY = Math.abs(((canMouseY/ canvas.height) * 500 ) - 500) - 250 ;
	  
	  //console.log("mouse:",canMouseX,canMouseY);
	  
	  
	  
	  for(i = 0; i < arrayListForObject.length; i++){
		  
		  //var shapeR = (arrayListForObject[i].Sphere.radius*50)*15/arrayListForObject[i].Sphere.center.z;
		  var shapeR = (arrayListForObject[i].Sphere.radius*50*15)/arrayListForObject[i].Sphere.center.z;
		  var shapeX = arrayListForObject[i].Sphere.center.x*71.4285714286 ;
		  var shapeY = arrayListForObject[i].Sphere.center.y*71.4285714286 ;
		  if(!boolDraged[i][1]){
			//shapeX = ((shapeX - canvas.width/2)  * 10 / arrayListForObject[i].Sphere.center.z) + canvas.width/2;
			//shapeY = ((shapeY - canvas.height/2)  * 10 / arrayListForObject[i].Sphere.center.z) + canvas.height/2 ;
			
			shapeX = shapeX / (arrayListForObject[i].Sphere.center.z/10);
			shapeY = shapeY / (arrayListForObject[i].Sphere.center.z/10);
		  }
		  
		  //console.log("shape:",shapeX, shapeY, shapeR);
		  
		  if(canMouseX > shapeX - shapeR && canMouseX < shapeX + shapeR && canMouseY > shapeY - shapeR && canMouseY < shapeY + shapeR){
			isDragging=true;
			index = i;
			boolDraged[i][1] = true;
		  }
		  
	   }
	   
	   
    }

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
      canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);
	  
	  if(isDragging){
		  
		      arrayListForObject[index].Sphere.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
		      arrayListForObject[index].Sphere.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
		    
			
			
	    //console.log(arrayListForObject[index].Sphere.center);
	    ctx.clearRect(0,0,canvas.width,canvas.height);
	    redraw(canvas, ctx);
		  
	  }
	  
      // clear the drag flag
      isDragging=false;
	  //alert((((canMouseX/canvas.width*2)*250) - 250)/71.4285714286);
	  
	  
    }

    function handleMouseOut(e){
      canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
      canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);
      // user has left the canvas, so clear the drag flag
	  if(isDragging){
	  arrayListForObject[index].Sphere.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
		arrayListForObject[index].Sphere.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
		ctx.clearRect(0,0,canvas.width,canvas.height);
	    redraw(canvas, ctx);
		
	  }
      isDragging=false;
	  
    }

    function handleMouseMove(e){
		
      canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
      canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){
		  ctx.clearRect(0,0,canvas.width,canvas.height);
		  
		  arrayListForObject[index].Sphere.center.x = 999999;
		  arrayListForObject[index].Sphere.center.y = 999999;
		  convertSize = (arrayListForObject[index].Sphere.radius * 50)*15/arrayListForObject[index].Sphere.center.z ;
		  
		  var shapeC = arrayListForObject[index].Sphere.color;
		  var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
		  
		  ctx.beginPath();
		  ctx.arc(canMouseX,canMouseY,convertSize,0,2*Math.PI);
		  ctx.fillStyle = color;
		  ctx.fill();
		  ctx.stroke();
		  redraw(canvas, ctx);
		  
	  }
	  
	  
          
      
    }
	
	window.onresize = function(event) {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		canvas = document.getElementById("myCanvas");
		ctx=canvas.getContext("2d");
		canvas.style.width ='100%';
		canvas.style.height='100%';
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		redraw(canvas, ctx);
		
	};

    $("#myCanvas").mousedown(function(e){handleMouseDown(e);});
    $("#myCanvas").mousemove(function(e){handleMouseMove(e);});
    $("#myCanvas").mouseup(function(e){handleMouseUp(e);});
    $("#myCanvas").mouseout(function(e){handleMouseOut(e);});

});


    
