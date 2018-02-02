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
		y = -y + c.height/2;
		x = x + c.width/2;
		
		
		//get size and color
		var size = parseInt(document.getElementById('size').value);
		var color = document.getElementById('color').value;
		
		
		//paint the shape
		if(shape == "Circle"){
			ctx.beginPath();
			ctx.arc(x,y,size,0,2*Math.PI);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
		
		}else if(shape == "Cube"){
			
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
			
			
		}
		
		//reset values
		document.getElementById("resetShape").reset();
	
		
};
	
function clearGrid() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
};

function addLight() {
	
	var x = parseInt(document.getElementById("light_x").value);
	var y = parseInt(document.getElementById("light_y").value);
	var z = parseInt(document.getElementById("light_z").value);
	
	var canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	
	y = -y + canvas.height/2;
	x = x + canvas.width/2;
	
	
	base_image = new Image();
	base_image.src = './images/light.png';
	base_image.onload = function(){
		context.drawImage(base_image, x, y, 15, 18);
	}
	
	
	//reset values
	document.getElementById("resetLight").reset();
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

	function fitToContainer(canvas){
		// Make it visually fill the positioned parent
		canvas.style.width ='100%';
		canvas.style.height='100%';
		// ...then set the internal size to match
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}

  });
  
  
