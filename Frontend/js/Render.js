function renderShapes() {
	//for Ambient Light
	var active  = "true";
	var checked = document.getElementById('floor').checked;
	if(checked == true)	checked = "true";
	else checked = "false";
	if(document.getElementById('brightness').value == 0) active = "false";
	var ambientLight 		 = new AmbientLight(active, document.getElementById('ambient').value / 100);
	globalAmbientLight  	 = ambientLight;
	var floor				 = new Floor(checked);
	globalFloor				 = floor;
	var modal				 = document.getElementById('myModal1');
	document.getElementById("loadingKati").src = "./images/spinner.gif";
	modal.style.display = "block";

	//generate the JSON file for the form data and send it as HTTP request

	imagePlaneObjectCreation();
	cameraPositionObject();
	sceneObjectCreation();
	raytracerObjectCreation();

	var xhr = new XMLHttpRequest();
	var url = "http://127.0.0.1:8000/raytrace";
	xhr.open("POST", url, true);
	var jsonData = JSON.stringify(globalRaytracerObject);
	xhr.send(jsonData);

	//get binary and make it an image... {there is a problem with headers called CORS from backend.. we have to fix it} (fixed as of 13.02.2018!)
	xhr.responseType = 'arraybuffer';
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("download").style.display = 'inline-block';
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
		}

	}
}
