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
		
		//Validate and alert message if not all values are correct
		
		var validation_01 = true;
		var validation_02 = true;
		
		validation_01 = validate_size(size);
		validation_02 = validate_coordinates(x,y,z);
		
		if(validation_01 && validation_02)
		{
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
	
	// Validate and alert message if not all values are correct
	
	var validation_01 = true;
	validation_01 = validate_coordinates(x,y,z);
	
	if( validation_01 )
	{
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

// Validating the Coordinates of Shape or Light
function validate_coordinates(x,y,z)
{
	var min_x = -1000;
	var min_y = -1000;
	var min_z = -1000;

	var max_x = 1000;
	var max_y = 1000;
	var max_z = 1000;

	if
	( 
		(  (isNaN(x)) || (x > max_x) || (x < min_x) ) &&
		(  (isNaN(y)) || (y > max_y) || (y < min_y) ) &&
		(  (isNaN(z)) || (z > max_z) || (z < min_z) ) 
	)
	{			
		var modal = document.getElementById('myModal');
		
		document.getElementById("alertMessage").innerHTML = "Invalid Coordinates, Minimum Value:-500, Maximum Value:500";
		modal.style.display = "block";
		return false;
		
	}
	else
	{
		return true;
	}
};

// Validating the Size of Shapes
function validate_size(size)
{
	var min_size = 10;
	var max_size = 500;

	if( (isNaN(size)) || (size > max_size) || (size < min_size) )
	{			
		var modal = document.getElementById('myModal');
		
		document.getElementById("alertMessage").innerHTML = "Invalid Size, Minimum Value:10, Maximum Value:500";
		modal.style.display = "block";
		return false;
		
	}
	else
	{
		return true;
	}
};


