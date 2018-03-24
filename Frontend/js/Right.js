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
