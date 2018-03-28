function renderShapes() {
	$("#loadingKati").addClass("loadingKati");
	
	//for Camera
	cameraPositionObject();
	cameraDirectionObject();
	cameraAngleObject();

	//for Ambient Light
	var active  = "true";
	if(document.getElementById('brightness').value == 0) active = "false";
	var ambientLight 		 = new AmbientLight(active, document.getElementById('ambient').value / 100);
	globalAmbientLight  	 = ambientLight;
	
	//for floor in the scene
	var floorChecked 		= document.getElementById('floor').checked;
	if(floorChecked == true) floorChecked = "true";
	else floorChecked = "false";
	var floor				 = new Floor(floorChecked);
	globalFloor				 = floor;
	
	//for room in the scene
	var roomChecked 		= document.getElementById('room').checked;
	if(roomChecked == true) roomChecked   = "true";
	else roomChecked = "false";
	var room 				 = new Room(roomChecked);
	globalRoom				 = room;
	
	//for antialiasing
	var antiAliasingChecked = document.getElementById('antialiasing').checked;
	if(antiAliasingChecked == true) antiAliasingChecked = "true";
	else antiAliasingChecked = "false";
	var antiAl 				 = new Antialiasing(antiAliasingChecked);
	globalAntialiasingObject = antiAl;

	var modal				 = document.getElementById('myModal1');
	document.getElementById("loadingKati").src = "./images/spinner.gif";
	modal.style.display = "block";

	//generate the JSON file for the form data and send it as HTTP request

	imagePlaneObjectCreation();
	cameraObjectCreation();
	sceneObjectCreation();
	raytracerObjectCreation();

	fileName(); //gets the name of the image from the user
	var xhr = new XMLHttpRequest();
	var url = "http://127.0.0.1:8000/raytrace";
	//var url = "http://52.20.143.165:8000/raytrace";
	xhr.open("POST", url, true);
	var jsonData = JSON.stringify(globalRaytracerObject);
	//console.log(jsonData);
	xhr.send(jsonData);

	//get binary and make it an image... {there is a problem with headers called CORS from backend.. we have to fix it} (fixed as of 13.02.2018!)
	xhr.responseType = 'arraybuffer';
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("download").style.display = 'inline-block';
			$("#loadingKati").removeClass("loadingKati");
			var uInt8Array = new Uint8Array(this.response);
			var i = uInt8Array.length;
			var binaryString = new Array(i);
			while (i--) {
				binaryString[i] = String.fromCharCode(uInt8Array[i]);
			}
			var data = binaryString.join('');
			var base64 = window.btoa(data);
            var modal = document.getElementById('myModal1');
			document.getElementById("loadingKati").src = "data:image/png;base64," + base64;
			
			//store image
			receivedImage = base64;
			document.getElementById("download").href = "data:image/png;base64," + receivedImage;
			if(globalFileName == "") {
				globalFileName = "raytrashing.png"
			}
			document.getElementById("download").setAttribute("download", globalFileName);
		}
	}
}
