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
	var clickedItem = 0;
	var shape = document.getElementById("Shapes");
	globalItem = "shape";
	if(typeof shape[shape.selectedIndex] != 'undefined') {
		var item_value = shape[shape.selectedIndex].value;
	if(typeof arrayListForObject[item_value].Sphere != 'undefined' && item_value > -1) {
		document.getElementById('change_x').value = parseFloat(arrayListForObject[item_value].Sphere.center.x);
		document.getElementById('change_y').value = parseFloat(arrayListForObject[item_value].Sphere.center.y);
		document.getElementById('change_z').value = parseFloat(arrayListForObject[item_value].Sphere.center.z);
		document.getElementById('change_s').value = parseFloat(arrayListForObject[item_value].Sphere.radius);
		clickedItem = 0;
		sliderDrag(4);
	} else if(typeof arrayListForObject[item_value].Cube != 'undefined' && item_value > -1) {
		document.getElementById('change_x').value = parseFloat(arrayListForObject[item_value].Cube.center.x);
		document.getElementById('change_y').value = parseFloat(arrayListForObject[item_value].Cube.center.y);
		document.getElementById('change_z').value = parseFloat(arrayListForObject[item_value].Cube.center.z);
		document.getElementById('change_s').value = parseFloat(arrayListForObject[item_value].Cube.sideLength);
		clickedItem = 0;
		sliderDrag(4);
	} else if(typeof arrayListForObject[item_value].Cylinder != 'undefined' && item_value > -1) {
		document.getElementById('change_x').value = parseFloat(arrayListForObject[item_value].Cylinder.center.x);
		document.getElementById('change_y').value = parseFloat(arrayListForObject[item_value].Cylinder.center.y);
		document.getElementById('change_z').value = parseFloat(arrayListForObject[item_value].Cylinder.center.z);
		document.getElementById('change_s').value = parseFloat(arrayListForObject[item_value].Cylinder.radius);
		document.getElementById('change_h').value = parseFloat(arrayListForObject[item_value].Cylinder.height);
		clickedItem = 1;
	} else if(typeof arrayListForObject[item_value].Cone != 'undefined' && item_value > -1) {
		document.getElementById('change_x').value = parseFloat(arrayListForObject[item_value].Cone.center.x);
		document.getElementById('change_y').value = parseFloat(arrayListForObject[item_value].Cone.center.y);
		document.getElementById('change_z').value = parseFloat(arrayListForObject[item_value].Cone.center.z);
		document.getElementById('change_s').value = parseFloat(arrayListForObject[item_value].Cone.radius);
		document.getElementById('change_h').value = parseFloat(arrayListForObject[item_value].Cone.height);
		clickedItem = 1;
	}
	if(clickedItem == 1 && document.getElementById("change_h").style.display == 'none'){
		sliderDrag(3);
	}else if(clickedItem == 0 && document.getElementById("change_h").style.display != 'none'){
		sliderDrag(3);
	}
}
    var elements = document.getElementById("Lights").options;
    for(var i = 0; i < elements.length; i++) {
    	elements[i].selected = false;
    }
	
}

function lightOption() {
	var light = document.getElementById("Lights");
	var item_value = light[light.selectedIndex].value;
	
	document.getElementById('change_x').value = arrayListForLight[item_value].center.x;
	document.getElementById('change_y').value = arrayListForLight[item_value].center.y;
	document.getElementById('change_z').value = arrayListForLight[item_value].center.z;
	document.getElementById('change_s').value = "--";
	
    var elements = document.getElementById("Shapes").options;
    for(var i = 0; i < elements.length; i++) {
    	elements[i].selected = false;
    }
	
	globalItem = "light";
	sliderDrag(3);
}

// Changing the shape location and size
function changeItem()
{
	//Change Shape
	if(globalItem == "shape") {	
		var shape = document.getElementById("Shapes");
		var item_value = shape[shape.selectedIndex].value;

		if(typeof arrayListForObject[item_value].Sphere != 'undefined') {
			arrayListForObject[item_value].Sphere.center.x 	   = (document.getElementById('change_x').value);
			arrayListForObject[item_value].Sphere.center.y	   = (document.getElementById('change_y').value);
			arrayListForObject[item_value].Sphere.center.z 	   = (document.getElementById('change_z').value);
			arrayListForObject[item_value].Sphere.radius   	   = (document.getElementById('change_s').value);
		} else if(typeof arrayListForObject[item_value].Cube != 'undefined') {
			arrayListForObject[item_value].Cube.center.x   	   = (document.getElementById('change_x').value);
			arrayListForObject[item_value].Cube.center.y   	   = (document.getElementById('change_y').value);
			arrayListForObject[item_value].Cube.center.z   	   = (document.getElementById('change_z').value);
			arrayListForObject[item_value].Cube.sideLength 	   = (document.getElementById('change_s').value);
		} else if(typeof arrayListForObject[item_value].Cylinder != 'undefined') {
			arrayListForObject[item_value].Cylinder.center.x   = (document.getElementById('change_x').value);
			arrayListForObject[item_value].Cylinder.center.y   = (document.getElementById('change_y').value);
			arrayListForObject[item_value].Cylinder.center.z   = (document.getElementById('change_z').value);
			arrayListForObject[item_value].Cylinder.radius	   = (document.getElementById('change_s').value);
			arrayListForObject[item_value].Cylinder.height	   = (document.getElementById('change_h').value);
		} else if(typeof arrayListForObject[item_value].Cone != 'undefined') {
			arrayListForObject[item_value].Cone.center.x   	   = (document.getElementById('change_x').value);
			arrayListForObject[item_value].Cone.center.y   	   = (document.getElementById('change_y').value);
			arrayListForObject[item_value].Cone.center.z  	   = (document.getElementById('change_z').value);
			arrayListForObject[item_value].Cone.radius 		   = (document.getElementById('change_s').value);
			arrayListForObject[item_value].Cone.height 		   = (document.getElementById('change_h').value);
		}
	}
	//Change Light
	else if(globalItem == "light") {
		var light = document.getElementById("Lights");
		var item_value = light[light.selectedIndex].value;
		
		arrayListForLight[item_value].center.x = (document.getElementById('change_x').value);
		arrayListForLight[item_value].center.y = (document.getElementById('change_y').value);
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
	//clear values
	document.getElementById("change_x").value = "";
	document.getElementById("change_y").value = "";
	document.getElementById("change_z").value = "";
	document.getElementById("change_s").value = "";
	document.getElementById("change_h").value = "";
	
}
