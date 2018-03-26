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

	//when the user clicks inside the canvas find if he clicked any of our shapes
function handleMouseDown(e) {

	canMouseX=parseInt(e.clientX-$("#myCanvas").offset().left);
	canMouseY=parseInt(e.clientY-$("#myCanvas").offset().top);
	canMouseX = ((canMouseX/ canvas.width) * 500 ) - 250 ;
	canMouseY = ((1 - (canMouseY/ canvas.height)) * 500 ) - 250;

	if(currentView == "front") {

		for(j = 0; j < arrayListForObject.length; j++) {
			var i = paintOrder[j][0];
			if(typeof arrayListForObject[i].Sphere != 'undefined') {
				var shapeR = (arrayListForObject[i].Sphere.radius*50*15)/arrayListForObject[i].Sphere.center.z;
				var shapeX = (arrayListForObject[i].Sphere.center.x/3.3)*250 ;
				var shapeY = (arrayListForObject[i].Sphere.center.y/3.3)*250 ;
				shapeR = shapeR/75* canvas.width* 0.0914;
				
				if(canMouseX > shapeX - shapeR && canMouseX < shapeX + shapeR && canMouseY > shapeY - shapeR && canMouseY < shapeY + shapeR) {
					isDragging=true;
					index = i;
				}
		  	} else if(typeof arrayListForObject[i].Cube != 'undefined') {
					var shapeR = (arrayListForObject[i].Cube.sideLength*50*15)/arrayListForObject[i].Cube.center.z;
					var shapeX = (arrayListForObject[i].Cube.center.x/3.3)*250 ;
					var shapeY = (arrayListForObject[i].Cube.center.y/3.3)*250 ;
					shapeR = shapeR/75* canvas.width* 0.0914;
					
					if(canMouseX > shapeX - shapeR/2 && canMouseX < shapeX + shapeR/2 && canMouseY > shapeY - shapeR/2 && canMouseY < shapeY + shapeR/2){
						isDragging=true;
						index = i;
				}
		 	}else if(typeof arrayListForObject[i].Cylinder != 'undefined') {
					var shapeR = (arrayListForObject[i].Cylinder.radius*50*15)/arrayListForObject[i].Cylinder.center.z;
					var shapeH = (arrayListForObject[i].Cylinder.height*50*15)/arrayListForObject[i].Cylinder.center.z;
					var shapeX = (arrayListForObject[i].Cylinder.center.x/3.3)*250 ;
					var shapeY = (arrayListForObject[i].Cylinder.center.y/3.3)*250 ;
					shapeR = shapeR/75* canvas.width* 0.0914;
					shapeH = shapeH/75* canvas.width* 0.0914;
					
					if(canMouseX > shapeX - shapeR && canMouseX < shapeX + shapeR && canMouseY > shapeY - shapeH/2 && canMouseY < shapeY + shapeH/2){
						isDragging=true;
						index = i;
				}
		 	}else if(typeof arrayListForObject[i].Cone != 'undefined') {
					var shapeR = (arrayListForObject[i].Cone.radius*50*15)/arrayListForObject[i].Cone.center.z;
					var shapeH = (arrayListForObject[i].Cone.height*50*15)/arrayListForObject[i].Cone.center.z;
					var shapeX = (arrayListForObject[i].Cone.center.x/3.3)*250 ;
					var shapeY = (arrayListForObject[i].Cone.center.y/3.3)*250 ;
					shapeR = shapeR/75* canvas.width* 0.0914;
					shapeH = shapeH/75* canvas.width* 0.0914;
					
					if(canMouseX > shapeX - shapeR && canMouseX < shapeX  && canMouseY > shapeY && canMouseY < shapeY + shapeH  ){
						if(Math.abs(canMouseX - shapeX - shapeR) < Math.abs(canMouseY - shapeH)){
							isDragging=true;
							index = i;
						}
					}else if(canMouseX < shapeX + shapeR && canMouseX > shapeX  && canMouseY > shapeY && canMouseY < shapeY + shapeH  ){
						if(Math.abs(canMouseX - shapeX) < Math.abs(canMouseY- shapeH)){
							isDragging=true;
							index = i;
						}
						
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
		}else if(typeof arrayListForObject[index].Cylinder != 'undefined') {
			arrayListForObject[index].Cylinder.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
			arrayListForObject[index].Cylinder.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}else if(typeof arrayListForObject[index].Cone != 'undefined') {
			arrayListForObject[index].Cone.center.x = (((canMouseX/canvas.width*2)*250) - 250)/71.4285714286;
			arrayListForObject[index].Cone.center.y = -(((canMouseY/canvas.height*2)*250) - 250)/71.4285714286;
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
		ctx.lineWidth = '10';

		if(typeof arrayListForObject[index].Sphere != 'undefined') {
			arrayListForObject[index].Sphere.center.x = 999999;
			arrayListForObject[index].Sphere.center.y = 999999;
			convertSize = (arrayListForObject[index].Sphere.radius * 50)*15/arrayListForObject[index].Sphere.center.z ;
			convertSize = convertSize/75* canvas.width* 0.0914;

			var shapeC = arrayListForObject[index].Sphere.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineJoin = "round";
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
			ctx.strokeStyle = color;
			ctx.lineJoin = "miter";
			ctx.rect(canMouseX - convertSize/2,canMouseY - convertSize/2,convertSize,convertSize);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
	    }else if(typeof arrayListForObject[index].Cylinder != 'undefined') {
			arrayListForObject[index].Cylinder.center.x = 999999;
			arrayListForObject[index].Cylinder.center.y = 999999;
			convertSizeR = (arrayListForObject[index].Cylinder.radius * 50)*15/arrayListForObject[index].Cylinder.center.z ;
			convertSizeH = (arrayListForObject[index].Cylinder.height * 50)*15/arrayListForObject[index].Cylinder.center.z ;
			convertSizeR = convertSizeR/75* canvas.width* 0.0914;
			convertSizeH = convertSizeH/75* canvas.width* 0.0914;

			var shapeC = arrayListForObject[index].Cylinder.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			
			ctx.lineJoin = "round";
			ctx.lineWidth = '10';
			ctx.strokeStyle = color;
			ctx.fillStyle = color;
			ctx.strokeRect(canMouseX - convertSizeR, canMouseY - convertSizeH/2,convertSizeR * 2,convertSizeH);
			ctx.fillRect(canMouseX - convertSizeR, canMouseY - convertSizeH/2,convertSizeR * 2,convertSizeH);
	    }else if(typeof arrayListForObject[index].Cone != 'undefined') {
			arrayListForObject[index].Cone.center.x = 999999;
			arrayListForObject[index].Cone.center.y = 999999;
			convertSizeR = (arrayListForObject[index].Cone.radius * 50)*15/arrayListForObject[index].Cone.center.z ;
			convertSizeH = (arrayListForObject[index].Cone.height * 50)*15/arrayListForObject[index].Cone.center.z ;
			convertSizeR = (convertSizeR/75* canvas.width* 0.0914)*2;
			convertSizeH = convertSizeH/75* canvas.width* 0.0914;

			var shapeC = arrayListForObject[index].Cone.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			
			positionX = canMouseX - convertSizeR/2;
			positionY = canMouseY;
			ctx.lineJoin = "miter";
			ctx.moveTo(positionX, positionY);
				
			positionX += convertSizeR;
			ctx.lineTo(positionX , positionY);
				
			positionX -= convertSizeR/2;
			positionY -= convertSizeH;
			ctx.lineTo(positionX, positionY);
			ctx.closePath();
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
		
	};
   
	$("#myCanvas").mousedown(function(e){handleMouseDown(e);});
    $("#myCanvas").mousemove(function(e){handleMouseMove(e);});
    $("#myCanvas").mouseup(function(e){handleMouseUp(e);});
    $("#myCanvas").mouseout(function(e){handleMouseOut(e);});

});

