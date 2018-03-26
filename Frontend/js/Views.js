//create different views
function topView() {
	keepActiveButton(1);
	currentView = "top";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}

function frontView() {
	keepActiveButton(0);
	currentView = "front";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}

function sideView() {
	//make active color
	keepActiveButton(2);
	currentView = "side";
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	redraw(c, ctx);
}
