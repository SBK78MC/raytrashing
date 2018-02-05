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
		}else{
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
		
		}else if(shape == "Cube"){
			//boring rect
			x = x - size/2;
			y = y - size/2;
			ctx.beginPath();
			ctx.rect(x,y,size,size);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
			
			/*
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
			*/
			
			
			
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
	
	//alert message if not all values are correct
	var modal = document.getElementById('myModal');	
	if( (x || x == 0) && (y || y == 0) && (z || z == 0) ) {
	}else{		
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
	
	
	//reset values
	document.getElementById("resetLight").reset();
	
};




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
	
	//close alert window if user clickes the window
	window.onclick = function(event) {
	var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

  });
  
  
// Lightbox
$(function(){
	var $render = $('.render a').simpleLightbox();

	$render.on('show.simplelightbox', function(){
		console.log('Requested for showing');
	})
	.on('error.simplelightbox', function(e){
		console.log('No image found, go to the next/prev');
		console.log(e);
	});
});