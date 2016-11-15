window.onload = function(){
	
	var offerer=window.confirm("Would you like to be the offerer? (One person would be the offerer and the other would be the receiver)")
	if (!offerer){
		document.getElementById("ConnectionEstablisher").style.display = "none";
		myUsername = "himanish1";
		targetPeer = "michael1"
	} else {
		myUsername = "michael1";
		targetPeer = "himanish1"
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
}

function sendFile() {
	var form = document.getElementById("testWebRtc");
	peerHandler.getPeer(targetPeer).sendFile(form.file.files[0]);
}