window.onload = function(){

	var himanish = "himanish3";
	var michael = "michael3";
	
	var offerer=window.confirm("Would you like to be the offerer? (One person would be the offerer and the other would be the receiver)")
	if (!offerer){
		document.getElementById("ConnectionEstablisher").style.display = "none";
		myUsername = himanish;
		targetPeer = michael;
	} else {
		myUsername = michael;
		targetPeer = himanish;
	}
	signalingService = new PubNubSignalingService(myUsername);
	messageRouter = new messageRouterAlg1();
	peerHandler = new peerHandlerAlg1();
}

function establishPeerTopeerConnection() {
	peerHandler.createPeer(targetPeer);
	var peerCon = peerHandler.getPeer(targetPeer).createOffer();
}

function sendMsg(){
	var form = document.getElementById("testWebRtc");
	peerHandler.getPeer(targetPeer).sendText(form.msg.value);
	//if(form.file.someOperation)peerHandler.getPeer(targetPeer).sendFile(form.file);
}

function sendFile() {
	var form = document.getElementById("testWebRtc");
	peerHandler.getPeer(targetPeer).sendFile(form.file.files[0]);
}