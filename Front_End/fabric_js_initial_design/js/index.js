var canvas = new fabric.Canvas('c');

canvas.setBackgroundImage('./background.jpg', canvas.renderAll.bind(canvas));
$("#text").on("click", function(e) {
text = new fabric.Text($("#text").val(), { left: 100, top: 100 });
	  canvas.add(text);
});
$("#cube").on("click", function(e) {
  	rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 50,
    height: 50,      
    fill: 'green',
    stroke: 'green',
    strokeWidth: 5,
			  });  
  canvas.add(rect);
});

$("#sphere").on("click", function(e) {
  	rect = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 40,     
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
			  });  
  canvas.add(rect);
});

$("#pyramid").on("click", function(e) {
  	rect = new fabric.Triangle({
    left: 300,
    top: 300,
    width: 50,
    height: 50,      
    fill: '#2e7bff',
    stroke: '#2e7bff',
    strokeWidth: 5,
			  });  
  canvas.add(rect);
});

$("#plane").on("click", function(e) {
  	rect = new fabric.Rect({
    left: 300,
    top: 100,
    width: 60,
    height: 50,      
    fill: 'yellow',
    stroke: 'yellow',
    strokeWidth: 5,
			  });  
  canvas.add(rect);
});


$("#save").on("click", function(e) {
  	$(".save").html(canvas.toSVG());
});