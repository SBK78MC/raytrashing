//name of download image
function fileName() {
	var file       = document.getElementById("downloadName").value;
	globalFileName = file;
}

//convert color from hex to rgb
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

//convert color to hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//clear canvas and arrays
function clearGrid() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	document.getElementById("Shapes").options.length = 0;
	document.getElementById("Lights").options.length = 0;
	arrayListForLight      		= [];
	arrayListForObject	 	    = [];
	paintOrder                  = [];
	globalRaytracerObject 		= "";
	globalAmbientLight			= "";
	globalSceneObject			= "";
	globalImagePlaneSizeObject  = "";
	globalCameraPositionObject	= "";
	globalCameraDirectionObject = "";
	globalFileName				= "";
};

//set default camera angle
function cameraAngle() {
	var view = document.getElementById("camAngle").value;
	if(view == "front") {
		$('#camera_pos_x').val(0);
		$('#camera_pos_y').val(0);
		$('#camera_pos_z').val(0);
		
		$('#camera_dir_x').val(0);
		$('#camera_dir_y').val(0);
		$('#camera_dir_z').val(1);
		
		$('#camera_rig_x').val(1);
		$('#camera_rig_y').val(0);
		$('#camera_rig_z').val(0);
	} else if(view == "top") {
		$('#camera_pos_x').val(0);
		$('#camera_pos_y').val(10);
		$('#camera_pos_z').val(10);
		
		$('#camera_dir_x').val(0);
		$('#camera_dir_y').val(0);
		$('#camera_dir_z').val(10);
		
		$('#camera_rig_x').val(1);
		$('#camera_rig_y').val(0);
		$('#camera_rig_z').val(0);
	} else if(view == "side") {
		$('#camera_pos_x').val(10);
		$('#camera_pos_y').val(0);
		$('#camera_pos_z').val(10);
		
		$('#camera_dir_x').val(0);
		$('#camera_dir_y').val(0);
		$('#camera_dir_z').val(10);
		
		$('#camera_rig_x').val(0);
		$('#camera_rig_y').val(0);
		$('#camera_rig_z').val(1);
	}
}

//function for the slides happening around the page
function sliderDrag(choice) {
	var height = document.getElementById("change_h");
	var size = document.getElementById("change_s");
	
if(choice == 0){
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
} else if(choice == 1) {
		if(document.getElementById("advancedCam").style.display == "none") {
			$('#advancedCam').slideDown(1000);	
		} else {
			$('#advancedCam').slideUp(1000, up);
	}
		
} else if(choice == 2) {
		var e = document.getElementById("shape");
		var shape = e.options[e.selectedIndex].value;
		if(shape == "Cylinder" || shape == "Pyramid" || shape == "Cone") {
			$('#Height').slideDown(1000);
		} else {
			$('#Height').slideUp(1000, up);
		}
}else if(choice == 3 && globalItem == 'shape'){
		if(height.style.display == 'none') {
			$('#change_h').slideDown(1000);
		} else {
			$('#change_h').slideUp(1000, up);
		}
		sliderDrag(4);
		
}else if(choice == 3 && globalItem != 'shape'){
	if(height.style.display != 'none') {
			$('#change_h').slideUp(1000, up);
	} 
	if(size.style.display != 'none') {
			$('#change_s').slideUp(1000, up);
	}
	
}else if(choice == 4){
	if(size.style.display == 'none') {
			$('#change_s').slideDown(1000);
	}
}
}

//function to only allow the user to add floor or room or none
function checkBoxToRadio(choice){
	var floor = document.getElementById("floor").checked;
	var room = document.getElementById("room").checked;
	if(choice == 0 && floor){
		$("#room").prop("checked", false);
	}else if(choice == 1 && room){
		$("#floor").prop("checked", false);
	}
}

function keepActiveButton(active) {
	var sides = ["front", "top", "side"];
	for(i = 0; i < 3; i++){
		if(i == active) {
			document.getElementById(sides[active]).style.background = '#ccc';
		} else {
			document.getElementById(sides[i]).style.background = '#ddd';
		}
	}
}

//function to paint shapes on click
function autoPaint(shape) {
	document.getElementById("shape").selectedIndex = shape;
	document.getElementById("shape_x").value = '0';
	document.getElementById("shape_y").value = '0';
	addShape();
}

//function to set default material values
function materialValues() {
	var value = document.getElementById("material").value;
	if(value == 'solid') {
		$("#reflection").val(0);
		$("#transparency").val(0);
		$("#specular").val(0);
	} else if(value == 'mirror') {
		$("#reflection").val(100);
		$("#transparency").val(0);
		$("#specular").val(800);
	} else if(value == 'shiny') {
		$("#reflection").val(20);
		$("#transparency").val(0);
		$("#specular").val(600);
	} else if(value == 'matte') {
		$("#reflection").val(10);
		$("#transparency").val(90);
		$("#specular").val(600);
	}
}

/* for slider menu */

$('#lightNav').click(function() {
	if($(this).css("left") <= "10px") {
		$('#lightDiv').animate({'left':'0'},250);
		$('#lightNav').animate({'left':"100%"}, 250);
		lightClicked = true;
		$('#lightNav').removeClass("hover");
	}
	else {
		$('#lightDiv').animate({"left": '-400%'}, 250);
		$('#lightNav').animate({"left": '-4%'}, 250);
		lightClicked = false;
		$('#lightNav').addClass("hover");
	}
	if(lightClicked) {
		if(shapeClicked) {
			$('#shapesDiv').animate({"left": '-400%'}, 250);
			$('#shapesNav').animate({"left": '-4%'}, 250);
			shapeClicked    = false;
			$('#shapesNav').addClass("hover");
		} else {
			$('#settingsDiv').animate({"left": '-400%'}, 250);
			$('#settingsNav').animate({"left": '-4%'}, 250);
			settingsClicked = false;
			$('#settingsNav').addClass("hover");
			
		}
	}
});

$('#shapesNav').click(function() {
	if($(this).css("left") <= "10px") {
		$('#shapesDiv').animate({'left':'0'}, 250);
		$('#shapesNav').animate({'left':"100%"}, 250);
		shapeClicked = true;
		$('#shapesNav').removeClass("hover");
	}
	else {
		$('#shapesDiv').animate({"left": '-400%'}, 250);
		$('#shapesNav').animate({"left": '-4%'}, 250);
		shapeClicked = false;
		$('#shapesNav').addClass("hover");
	}
	if(shapeClicked) {
		if(lightClicked) {
			$('#lightDiv').animate({"left": '-400%'}, 250);
			$('#lightNav').animate({"left": '-4%'}, 250);
			lightClicked  	= false;
			$('#lightNav').addClass("hover");
		} else {
			$('#settingsDiv').animate({"left": '-400%'}, 250);
			$('#settingsNav').animate({"left": '-4%'}, 250);
			settingsClicked = false;
			$('#settingsNav').addClass("hover");
		}
	}
});

$('#settingsNav').click(function() {
	if($(this).css("left") <= "10px") {
		$('#settingsDiv').animate({'left':'0'}, 250);
		$('#settingsNav').animate({'left':"100%"}, 250);
		settingsClicked = true;
		$('#settingsNav').removeClass("hover");
	}
	else {
		$('#settingsDiv').animate({"left": '-400%'}, 250);
		$('#settingsNav').animate({"left": '-4%'}, 250);
		settingsClicked = false;
		$('#settingsNav').addClass("hover");
	}
	if(settingsClicked) {
		if(lightClicked) {
			$('#lightDiv').animate({"left": '-400%'}, 250);
			$('#lightNav').animate({"left": '-4%'}, 250);
			lightClicked = false;
			$('#lightNav').addClass("hover");
		} else {
			$('#shapesDiv').animate({"left": '-400%'}, 250);
			$('#shapesNav').animate({"left": '-4%'}, 250);
			shapeClicked = false;
			$('#shapesNav').addClass("hover");
		}	
	}
});
