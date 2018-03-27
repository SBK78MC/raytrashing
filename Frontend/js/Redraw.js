function redraw(canvas, ctx) {
	function convertToSize(x) {
		return ((x + 250)/500)*(93-32.62);
	}
	
	ctx.lineWidth = '10';
	
	for(j = 0; j < arrayListForObject.length; j++) {
		var i = paintOrder[j][0];
		//--------------------------------------------PAINT SPHERE---------------------------------------------------
		if(typeof arrayListForObject[i].Sphere != 'undefined') {

			var shapeX = (arrayListForObject[i].Sphere.center.x/3.3)*250 + 250;
			var shapeY = (arrayListForObject[i].Sphere.center.y/3.3)*250 + 250;
			var shapeR = arrayListForObject[i].Sphere.radius*50 * 15 / arrayListForObject[i].Sphere.center.z ;
			var shapeC = arrayListForObject[i].Sphere.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			shapeR = shapeR/75* canvas.width* 0.0914;			
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineJoin = "round";
			
			
			if(currentView == "front") {
				ctx.arc(shapeX/500 * canvas.width,	(1 - (shapeY/500)) * canvas.height ,shapeR,0,2*Math.PI);
			} else if(currentView == "top") {
				//convert z to y
				var yTop = ((1 - (arrayListForObject[i].Sphere.center.z/20))*500) - 50;

				//convert y to size
				size = convertToSize(shapeY, shapeR);

				ctx.arc(shapeX/500 * canvas.width,	yTop ,size,0,2*Math.PI);
			} else if(currentView == "side") {
				//convert z to x
				var xSide = ((arrayListForObject[i].Sphere.center.z/20)*500);
				xSide = (xSide/500)*canvas.width;

				//convert x to size
				size = convertToSize(shapeX, arrayListForObject[i].Sphere.center.z);

				if(size > 0){
					ctx.arc(xSide, (1 - (shapeY/500)) * canvas.height ,size,0,2*Math.PI);
				}
			}
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
		}
		//-----------------------------------------------PAINT CUBE------------------------------------------
		if(typeof arrayListForObject[i].Cube != 'undefined') {

			var shapeX = (arrayListForObject[i].Cube.center.x/3.3)*250 + 250;
			var shapeY = (arrayListForObject[i].Cube.center.y/3.3)*250 + 250;
			var shapeR = arrayListForObject[i].Cube.sideLength*50 * 15 / arrayListForObject[i].Cube.center.z ;
			var shapeC = arrayListForObject[i].Cube.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);

			//size of shape on windows resize
			shapeR = shapeR/75* canvas.width* 0.0914;

			//paint
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineJoin = "miter";
			
			if(currentView == "front") {
				ctx.rect(shapeX/500 * canvas.width - shapeR/2, ((1 - (shapeY/500)) * canvas.height) - shapeR/2,shapeR,shapeR);
			} else if(currentView == "top") {
				//convert z to y
				var yTop = ((arrayListForObject[i].Cube.center.z/20)*500) - 250;
				yTop = Math.abs(yTop/500 * canvas.height - canvas.height/2)

				//convert y to size
				size = convertToSize(shapeY, arrayListForObject[i].Cube.center.z);

				ctx.rect(shapeX/500 * canvas.width - size/2, yTop - size/2,size,size);
			} else if(currentView == "side") {
				//convert z to x
				var xSide = ((arrayListForObject[i].Cube.center.z/20)*500);
				xSide = (xSide/500)*canvas.width;

				//convert x to size
				size = convertToSize(shapeX, arrayListForObject[i].Cube.center.z);

				ctx.rect(xSide - size/2, ((1 - (shapeY/500)) * canvas.height) - size/2,size,size);
			}
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
		}
		//------------------------------------------PAINT CYLINDER-----------------------------------------------
		if(typeof arrayListForObject[i].Cylinder != 'undefined') {

			var shapeX = (arrayListForObject[i].Cylinder.center.x/3.3)*250 + 250;
			var shapeY = (arrayListForObject[i].Cylinder.center.y/3.3)*250 + 250;
			var shapeR = arrayListForObject[i].Cylinder.radius*50 * 15 / arrayListForObject[i].Cylinder.center.z ;
			var shapeH = arrayListForObject[i].Cylinder.height*50 * 15/ arrayListForObject[i].Cylinder.center.z;
			var shapeC = arrayListForObject[i].Cylinder.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);
			shapeR = shapeR/75* canvas.width* 0.0914;			
			shapeH = shapeH/75* canvas.width* 0.0914;			
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineJoin = "round";
			
			if(currentView == "front") {
				ctx.fillStyle = color;
				ctx.strokeRect(shapeX/500 * canvas.width - shapeR, ((1 - (shapeY/500)) * canvas.height) - shapeH/2,shapeR * 2,shapeH);
				ctx.fillRect(shapeX/500 * canvas.width - shapeR, ((1 - (shapeY/500)) * canvas.height) - shapeH/2,shapeR * 2,shapeH);
			} else if(currentView == "top") {
				//convert z to y
				var yTop = ((1 - (arrayListForObject[i].Cylinder.center.z/20))*500) - 50;

				//convert y to size
				size = convertToSize(shapeY, shapeR);

				ctx.arc(shapeX/500 * canvas.width,	yTop ,size,0,2*Math.PI);
			} else if(currentView == "side") {
				//convert z to x
				var xSide = ((arrayListForObject[i].Cylinder.center.z/20)*500);
				xSide = (xSide/500)*canvas.width;

				//convert x to size
				sizeR = convertToSize(shapeX);
				var sizeH = (sizeR/shapeR)*shapeH;
				xSide = xSide - sizeR;
				
				if(sizeR > 0){
					ctx.lineJoin = "round";
					ctx.lineWidth = '10';
					ctx.strokeStyle = color;
					ctx.fillStyle = color;
					ctx.strokeRect(xSide, ((1 - (shapeY/500)) * canvas.height) - shapeH/2,sizeR * 2,sizeH);
					ctx.fillRect(xSide, ((1 - (shapeY/500)) * canvas.height) - shapeH/2,sizeR * 2,sizeH);
				}
			}
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
			
			
		}
		//--------------------------------------PAINT CONE---------------------------------------------------
		if(typeof arrayListForObject[i].Cone != 'undefined') {

			var shapeX = (arrayListForObject[i].Cone.center.x/3.3)*250 + 250;
			var shapeY = (arrayListForObject[i].Cone.center.y/3.3)*250 + 250;
			var shapeR = arrayListForObject[i].Cone.radius*50 * 15 / arrayListForObject[i].Cone.center.z ;
			var shapeH = arrayListForObject[i].Cone.height*50 * 15 / arrayListForObject[i].Cone.center.z ;
			var shapeC = arrayListForObject[i].Cone.color;
			var color = rgbToHex(shapeC.r * 255, shapeC.g * 255, shapeC.b * 255);

			//size of shape on windows resize
			shapeR = (shapeR/75* canvas.width* 0.0914)*2;
			shapeH = shapeH/75* canvas.width* 0.0914;
			
			//paint
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineJoin = "miter";
			
			
			
			if(currentView == "front") {
				positionX = ((shapeX - shapeR/2)/500)*canvas.width;
				positionY = ((1 - (shapeY/500)) * canvas.height);
				ctx.moveTo(positionX, positionY);
				
				positionX += shapeR;
				ctx.lineTo(positionX , positionY);
				
				positionX -= shapeR/2;
				positionY -= shapeH;
				ctx.lineTo(positionX, positionY);
				ctx.closePath();
				
				
			} else if(currentView == "top") {
				//convert z to y
				var yTop = ((arrayListForObject[i].Cone.center.z/20)*500) - 250;
				yTop = Math.abs(yTop/500 * canvas.height - canvas.height/2)

				//convert y to size
				size = convertToSize(shapeY, arrayListForObject[i].Cone.center.z);

				ctx.arc(shapeX/500 * canvas.width,	yTop ,size,0,2*Math.PI);
			} else if(currentView == "side") {
				//convert z to x
				var xSide = ((arrayListForObject[i].Cone.center.z/20)*500);
				xSide = (xSide/500)*canvas.width;

				//convert x to size
				sizeR = (convertToSize(shapeX))*2;
				var sizeH = (sizeR/shapeR)*shapeH;

				positionX = xSide - sizeR/2;
				positionY = ((1 - (shapeY/500)) * canvas.height);
				ctx.moveTo(positionX, positionY);
				
				positionX += sizeR;
				ctx.lineTo(positionX , positionY);
				
				positionX -= sizeR/2;
				positionY -= sizeH;
				ctx.lineTo(positionX, positionY);
				ctx.closePath();
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
				var lightX = (arrayListForLight[i].center.x/3.3)*250 + 250;
				var lightY = (arrayListForLight[i].center.y/3.3)*250 + 250;
				ctx.drawImage(base_image, lightX/500 * canvas.width, (1 - (lightY/500)) * canvas.height, 15, 18);
			}
		}
	}
}
