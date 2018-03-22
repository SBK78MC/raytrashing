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

function redraw(canvas, ctx){

	function convertToSize(x, z){
			if(x == 500){
				return size = 999;
			}else{
				size = 250/(500 - x);
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
				var yTop = ((arrayListForObject[i].Sphere.center.z/20)*500) - 250;
				yTop = Math.abs(yTop/500 * canvas.height - canvas.height/2)

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

//create different views
function topView(){
	keepActiveButton(1);
	currentView = "top";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}

function frontView(){
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

function keepActiveButton(active){
	var sides = ["front", "top", "side"];
	for(i = 0; i < 3; i++){
		if(i == active){
			document.getElementById(sides[active]).style.background = '#ccc';
		}else{
			document.getElementById(sides[i]).style.background = '#ddd';
		}
	}
}

function autoPaint(shape){
		document.getElementById("shape").selectedIndex = shape + 1;
		document.getElementById("shape_x").value = '0';
		document.getElementById("shape_y").value = '0';
		addShape();
	
}

  $(document).ready(function() {

	
  
	$('#picker').farbtastic('#color');
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
	  canMouseY = Math.abs(((canMouseY/ canvas.height) * 500 ) - 500) - 250 ;



if(currentView == "front"){

	  for(j = 0; j < arrayListForObject.length; j++){
		  var i = paintOrder[j][0];
		  if(typeof arrayListForObject[i].Sphere != 'undefined'){
			var shapeR = (arrayListForObject[i].Sphere.radius*50*15)/arrayListForObject[i].Sphere.center.z;
		    var shapeX = arrayListForObject[i].Sphere.center.x*71.4285714286 ;
		    var shapeY = arrayListForObject[i].Sphere.center.y*71.4285714286 ;
		    
		    if(canMouseX > shapeX - shapeR && canMouseX < shapeX + shapeR && canMouseY > shapeY - shapeR && canMouseY < shapeY + shapeR){
			  isDragging=true;
			  index = i;
			  

		    }
		  } else if(typeof arrayListForObject[i].Cube != 'undefined'){
			var shapeR = (arrayListForObject[i].Cube.sideLength*50*15)/arrayListForObject[i].Cube.center.z;
		    var shapeX = arrayListForObject[i].Cube.center.x*71.4285714286 ;
		    var shapeY = arrayListForObject[i].Cube.center.y*71.4285714286 ;
		    
		    if(canMouseX > shapeX - shapeR/2 && canMouseX < shapeX + shapeR/2 && canMouseY > shapeY - shapeR/2 && canMouseY < shapeY + shapeR/2){
			  isDragging=true;
			  index = i;

			  
			 }


		  }


	   }
	 }
  }

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
      canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);

	  if(isDragging){
		if(typeof arrayListForObject[index].Sphere != 'undefined'){
			arrayListForObject[index].Sphere.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
			arrayListForObject[index].Sphere.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}else if(typeof arrayListForObject[index].Cube != 'undefined'){
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


		  }else if(typeof arrayListForObject[index].Cube != 'undefined'){
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
