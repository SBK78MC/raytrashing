var arrayListForSphere 		 = [];
var arrayListForCube 		 = [];
var arrayListForLight 		 = [];
var arrayListForObject 		 = [];

var globalImagePlaneSizeObject, globalSceneObject, globalRaytracerObject, globalAmbientLight;

// Arrays of information for shapes in the scene
var responsive_shpe_number = 0;
var responsive_shpe_name = [];
var responsive_shpe_x = [];
var responsive_shpe_y = [];
var responsive_shpe_z = [];
var responsive_shpe_size = [];
var responsive_shpe_color = [];
// Arrays of information for  lights in the scene
var responsive_light_number = 0;
var responsive_light_x = [];
var responsive_light_y = [];
var responsive_light_z = [];

var selected_item = "";

// Listing added shapes
function ShapeList(name, color, id) {
    var shape = document.getElementById("Shapes");
    var option = document.createElement("option");
    option.text = name;
	option.style.background = color;
	option.value = id;
    shape.add(option);
}

// Listing added Lights
function LightList(id) {
    var light = document.getElementById("Lights");
    var option = document.createElement("option");
    option.text = id;
	option.value = id;
    light.add(option);
}

// Selecting the shape
function ShapeSelected()
{
	var shape = document.getElementById("Shapes");
	var item_value = shape[shape.selectedIndex].value;
	
	document.getElementById('change_x').value = responsive_shpe_x [item_value];
	document.getElementById('change_y').value = responsive_shpe_y [item_value];
	document.getElementById('change_z').value =  responsive_shpe_z [item_value];
	document.getElementById('change_s').value	 = responsive_shpe_size [item_value];
	document.getElementById('change_c').value	 = responsive_shpe_color [item_value];

	
   var elements = document.getElementById("Lights").options;
    for(var i = 0; i < elements.length; i++){
      elements[i].selected = false;
    }
	
	selected_item = "shape";
}

//Selecting the Light
function LightSelected()
{
	var light = document.getElementById("Lights");
	var item_value = light[light.selectedIndex].value;
	
	document.getElementById('change_x').value = responsive_light_x [item_value];
	document.getElementById('change_y').value = responsive_light_y [item_value];
	document.getElementById('change_z').value =  responsive_light_z [item_value];
	document.getElementById('change_s').value	 = "--";
	
   var elements = document.getElementById("Shapes").options;
    for(var i = 0; i < elements.length; i++){
      elements[i].selected = false;
    }
	
	selected_item = "light";
}

// Changing the shape location and size
function ChangeItem()
{
	
	//Change Shape
	if(selected_item == "shape")
	{	
		var shape = document.getElementById("Shapes");
		var item_value = shape[shape.selectedIndex].value;

		responsive_shpe_x [item_value] = parseFloat(document.getElementById('change_x').value);
		responsive_shpe_y [item_value] = parseFloat(document.getElementById('change_y').value);
		responsive_shpe_z [item_value] = parseFloat(document.getElementById('change_z').value);
		responsive_shpe_size [item_value] = parseFloat(document.getElementById('change_s').value);
		responsive_shpe_color [item_value] = document.getElementById('change_c').value;
		
		shape.remove(shape.selectedIndex);
		ShapeList(responsive_shpe_name[item_value], responsive_shpe_color [item_value], item_value);
	}
	//Change Light
	else if(selected_item == "light")
	{
		var light = document.getElementById("Lights");
		var item_value = light[light.selectedIndex].value;
		
		responsive_light_x [item_value] = parseFloat(document.getElementById('change_x').value);
		responsive_light_y [item_value] = parseFloat(document.getElementById('change_y').value);
		responsive_light_z [item_value] = parseFloat(document.getElementById('change_z').value);	
	}
	draw();
}

// Dleteling the shape from list and all scenes
function DeleteItem()
{
	//Delete Shape
	var shape = document.getElementById("Shapes");
	var item_value = shape[shape.selectedIndex].value;
	responsive_shpe_size [item_value] = 0;
	
	//Delete Select Shape
	var shape_select = document.getElementById("Shapes");
    shape_select.remove(shape.selectedIndex);
	
	//Delete Light
	
	//Delete Select Light
	
	
	draw();
}

// Redrawing shapes 
function draw() 
{
	var responsive_center = document.getElementById('center');	
	
	var responsive_canvas = document.getElementById('myCanvas');
	var responsive_canvas_top = document.getElementById('myCanvasTop');
	var responsive_canvas_side = document.getElementById('myCanvasSide');
	
	responsive_canvas.width = $(center).width();
	responsive_canvas.height = $(center).height();
	
	responsive_canvas_top.width = $(center).width();
	responsive_canvas_top.height = $(center).height();

	responsive_canvas_side.width = $(center).width();
	responsive_canvas_side.height = $(center).height();	
	
	var responsive_ctx = responsive_canvas.getContext("2d");
	var responsive_ctx_top = responsive_canvas_top.getContext("2d");
	var responsive_ctx_side = responsive_canvas_side.getContext("2d");
	
	for(var i = 0; i < responsive_shpe_number; i++)
	{
		Add_Responsive_Shape(responsive_ctx,responsive_ctx_top,responsive_ctx_side,responsive_shpe_name[i], responsive_shpe_x[i], responsive_shpe_y[i], 
										responsive_shpe_z[i], responsive_shpe_size[i], responsive_shpe_color[i], responsive_canvas.width, responsive_canvas.height);
	}
	
	for(var i = 0; i < responsive_light_number; i++)
	{
		Add_Responsive_Light(responsive_ctx,responsive_ctx_top,responsive_ctx_side, responsive_light_x[i], responsive_light_y[i], responsive_light_z[i],  responsive_canvas.width, responsive_canvas.height);
	}
}
	
// Drawing based on relative values of  shapes
function Add_Responsive_Shape(responsive_ctx,responsive_ctx_top,responsive_ctx_side, R_shpe_name,R_shpe_x,R_shpe_y,R_shpe_z,R_shpe_size,R_shpe_color, width, height) 
{
	if(R_shpe_name == "Sphere")
	{
		responsive_ctx.beginPath();
		responsive_ctx.arc(  width / 2 + R_shpe_x  , height / 2 - R_shpe_y ,R_shpe_size,0,2*Math.PI);
		responsive_ctx.fillStyle = R_shpe_color;
		responsive_ctx.fill();
		responsive_ctx.stroke();
		
		responsive_ctx_top.beginPath();
		responsive_ctx_top.arc( width / 2 + R_shpe_x , height / 2 - R_shpe_z ,R_shpe_size,0,2*Math.PI);
		responsive_ctx_top.fillStyle = R_shpe_color;
		responsive_ctx_top.fill();
		responsive_ctx_top.stroke();

		responsive_ctx_side.beginPath();
		responsive_ctx_side.arc(width / 2 + R_shpe_z ,  height/2 - R_shpe_y ,R_shpe_size,0,2*Math.PI);
		responsive_ctx_side.fillStyle = R_shpe_color;
		responsive_ctx_side.fill();
		responsive_ctx_side.stroke();		
	} 
	else if(R_shpe_name == "Cube") 
	{
		responsive_ctx.beginPath();
		responsive_ctx.rect(width / 2 + R_shpe_x - R_shpe_size/2  ,height / 2 - R_shpe_y - R_shpe_size/2,R_shpe_size,R_shpe_size);
		responsive_ctx.fillStyle = R_shpe_color;
		responsive_ctx.fill();
		responsive_ctx.stroke();
		
		responsive_ctx_top.beginPath();
		responsive_ctx_top.rect(  width / 2 + R_shpe_x - R_shpe_size/2, height / 2 - R_shpe_z  - R_shpe_size/2 , R_shpe_size,R_shpe_size);
		responsive_ctx_top.fillStyle = R_shpe_color;
		responsive_ctx_top.fill();
		responsive_ctx_top.stroke();
		
		responsive_ctx_side.beginPath();
		responsive_ctx_side.rect(width / 2 + R_shpe_z - R_shpe_size/2  , height/2 - R_shpe_y - R_shpe_size/2  ,R_shpe_size,R_shpe_size);
		responsive_ctx_side.fillStyle = R_shpe_color;
		responsive_ctx_side.fill();
		responsive_ctx_side.stroke();
	}
	else if(R_shpe_name == "Pyramid")
	{
		responsive_ctx.beginPath();
		responsive_ctx.moveTo(width / 2 + R_shpe_x ,height / 2 - R_shpe_y - R_shpe_size/2);
		responsive_ctx.lineTo(width / 2 + R_shpe_x - R_shpe_size  , height / 2 - R_shpe_y + R_shpe_size - R_shpe_size/2);
		responsive_ctx.lineTo(width / 2 + R_shpe_x + R_shpe_size , height / 2 - R_shpe_y + R_shpe_size - R_shpe_size/2);
		responsive_ctx.closePath();
		responsive_ctx.fillStyle = R_shpe_color;
		responsive_ctx.fill();
		responsive_ctx.stroke();
		
		responsive_ctx_top.beginPath();
		responsive_ctx_top.rect( width / 2 + R_shpe_x  - R_shpe_size/1.35, height / 2 - R_shpe_z  - R_shpe_size/1.35  , R_shpe_size*1.5,R_shpe_size*1.5);
		responsive_ctx_top.fillStyle = R_shpe_color;
		responsive_ctx_top.fill();
		responsive_ctx_top.stroke();

		responsive_ctx_side.beginPath();
		responsive_ctx_side.moveTo(width / 2 + R_shpe_z  , height/2 - R_shpe_y - R_shpe_size/2);
		responsive_ctx_side.lineTo(width / 2 + R_shpe_z  - R_shpe_size  , height/2 - R_shpe_y + R_shpe_size - R_shpe_size/2);
		responsive_ctx_side.lineTo(width / 2 + R_shpe_z + R_shpe_size  , height/2 - R_shpe_y + R_shpe_size - R_shpe_size/2);
		responsive_ctx_side.closePath();
		responsive_ctx_side.fillStyle = R_shpe_color;
		responsive_ctx_side.fill();
		responsive_ctx_side.stroke();
	}
	else if(R_shpe_name == "Cylinder")
	{
		responsive_ctx.beginPath();
		responsive_ctx.rect(width / 2 + R_shpe_x - R_shpe_size/2   ,height / 2 - R_shpe_y - R_shpe_size,R_shpe_size,R_shpe_size*2);
		responsive_ctx.fillStyle = R_shpe_color;
		responsive_ctx.fill();
		responsive_ctx.stroke();
		
		responsive_ctx_top.beginPath();
		responsive_ctx_top.arc(width / 2 + R_shpe_x  , height / 2 - R_shpe_z  ,R_shpe_size/2 ,0,2*Math.PI);
		responsive_ctx_top.fillStyle = R_shpe_color;
		responsive_ctx_top.fill();
		responsive_ctx_top.stroke();
		
		responsive_ctx_side.beginPath();
		responsive_ctx_side.rect(width / 2 + R_shpe_z - R_shpe_size/2, height/2 - R_shpe_y - R_shpe_size ,R_shpe_size,R_shpe_size*2);
		responsive_ctx_side.fillStyle = R_shpe_color;
		responsive_ctx_side.fill();
		responsive_ctx_side.stroke();			
	}
	else if(R_shpe_name == "Cone")
	{
		responsive_ctx.beginPath();
		responsive_ctx.moveTo(width / 2 + R_shpe_x ,height / 2 - R_shpe_y - R_shpe_size);
		responsive_ctx.lineTo(width / 2 + R_shpe_x - R_shpe_size  , height / 2 - R_shpe_y + R_shpe_size*2 - R_shpe_size);
		responsive_ctx.lineTo(width / 2 + R_shpe_x + R_shpe_size , height / 2 - R_shpe_y + R_shpe_size*2 - R_shpe_size);
		responsive_ctx.closePath();
		responsive_ctx.fillStyle = R_shpe_color;
		responsive_ctx.fill();
		responsive_ctx.stroke();	
		
		responsive_ctx_top.beginPath();
		responsive_ctx_top.arc(width / 2 + R_shpe_x , height / 2 - R_shpe_z ,R_shpe_size ,0,2*Math.PI);
		responsive_ctx_top.fillStyle = R_shpe_color;
		responsive_ctx_top.fill();
		responsive_ctx_top.stroke();

		responsive_ctx_side.beginPath();
		responsive_ctx_side.moveTo(width / 2 + R_shpe_z , height/2 - R_shpe_y - R_shpe_size);
		responsive_ctx_side.lineTo(width / 2 + R_shpe_z  - R_shpe_size , height/2 - R_shpe_y + R_shpe_size*2 - R_shpe_size);
		responsive_ctx_side.lineTo(width / 2 + R_shpe_z + R_shpe_size , height/2 - R_shpe_y + R_shpe_size*2 - R_shpe_size);
		responsive_ctx_side.closePath();
		responsive_ctx_side.fillStyle = R_shpe_color;
		responsive_ctx_side.fill();
		responsive_ctx_side.stroke();
	}
}	

// Drawing based on relative values of  Lights
function Add_Responsive_Light(responsive_ctx,responsive_ctx_top,responsive_ctx_side,R_light_x,R_light_y,R_light_z, width, height) 
{
	responsive_image = new Image();
	responsive_image.src = './images/light.png';
	
	responsive_image.onload = 
	function()
	{
		responsive_ctx.drawImage(responsive_image, width / 2  + R_light_x -9 , height / 2 - R_light_y -9, 18, 18);
		responsive_ctx_top.drawImage(responsive_image, width / 2 + R_light_x -9, height / 2 - R_light_z -9, 18, 18);
		responsive_ctx_side.drawImage(responsive_image, width / 2 + R_light_z -9, height/2 - R_light_y -9, 18, 18);
	}
}		
	
// 	Calling Draw() funcrion after each window move
$(function () {
		$(window).resize(draw);
 });	

function addShape() {
	
	//get shape
	var e = document.getElementById("shape");
	var shape = e.options[e.selectedIndex].value;
		
	//get coordinates(Sphere center, cube upper left corner
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

	//  Gathering info for Responsive Shape Redraw
	responsive_shpe_name[responsive_shpe_number] = shape ;
	responsive_shpe_x [responsive_shpe_number] = x;
	responsive_shpe_y [responsive_shpe_number] = y;
	responsive_shpe_z [responsive_shpe_number] = z;
	responsive_shpe_size [responsive_shpe_number] = size;
	responsive_shpe_color [responsive_shpe_number] = color;
	responsive_shpe_number++;
	
	//Add to Select (Shapes)
	ShapeList( responsive_shpe_name[responsive_shpe_number-1], responsive_shpe_color[responsive_shpe_number-1], (responsive_shpe_number-1)) ;
	
	// Drawing Everything
	draw();
	
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


   	 if(shape == "Sphere") {
		arrayListForObject.push(sphereObject);
		
	} else {
		arrayListForObject.push(cubeObject);
	}
	//reset values
	document.getElementById("resetShape").reset();
};

function renderShapes() {
	
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
	
	//  Gathering info for Responsive Light Redraw
	responsive_light_x [responsive_light_number] = x;
	responsive_light_y [responsive_light_number] = y;
	responsive_light_z [responsive_light_number] = z;
	responsive_light_number++;
	
	//Add to Select (Shapes)
	LightList( responsive_light_number-1 ) ;
	
	// Drawing Everything
	draw();
	
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

function clearGrid() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	
	var c_top = document.getElementById("myCanvasTop");
	var ctx_top = c_top.getContext("2d");
	ctx_top.clearRect(0, 0, c_top.width, c_top.height);
	
	var c_side = document.getElementById("myCanvasSide");
	var ctx_side = c_side.getContext("2d");
	ctx_side.clearRect(0, 0, c_side.width, c_side.height);
	
	// Resetting Shape Arrays
	responsive_shpe_number = 0;
	responsive_shpe_name = [];
	responsive_shpe_x = [];
	responsive_shpe_y = [];
	responsive_shpe_z = [];
	responsive_shpe_size = [];
	tmp_responsive_shpe_size = 0;
	responsive_shpe_color = [];
	// Resetting Light Arrays
	responsive_light_number = 0;
	responsive_light_x = [];
	responsive_light_y = [];
	responsive_light_z = [];
};

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
	
	//close alert window if user clicks the window
	window.onclick = function(event) {
	var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
	}

});
    
	
// Canvas Tabs	
function OpenView(evt, viewName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(viewName).style.display = "block";
    evt.currentTarget.className += " active";
	
	draw();
}
document.getElementById("front").click();