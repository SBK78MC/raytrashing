
/* for slider menu */
$('#lightNav').click(function(){
	if($(this).css("left") <= "10px") {
		$('#lightDiv').animate({'left':'0'},250);
		$('#lightNav').animate({'left':"100%"}, 250);
	}
	else {
		$('#lightDiv').animate({"left": '-400%'}, 250);
		$('#lightNav').animate({"left": '-6%'}, 250);
	}
});

$('#shapesNav').click(function(){
	if($(this).css("left") <= "10px") {
		$('#shapesDiv').animate({'left':'0'}, 250);
		$('#shapesNav').animate({'left':"100%"}, 250);
	}
	else {
		$('#shapesDiv').animate({"left": '-400%'}, 250);
		$('#shapesNav').animate({"left": '-6%'}, 250);
	}
});

$('#settingsNav').click(function(){
	if($(this).css("left") <= "10px") {
		$('#settingsDiv').animate({'left':'0'}, 250);
		$('#settingsNav').animate({'left':"100%"}, 250);
	}
	else {
		$('#settingsDiv').animate({"left": '-400%'}, 250);
		$('#settingsNav').animate({"left": '-6%'}, 250);
	}
});



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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
