function peerConnection(client,target)
{
	var localPeerConnectionPointer = this; // MF: how bad is this? I really really hate this
	var fileReader = new FileReader();
	
	this.channel;
	var ICE_config= {
				'iceServers': [
						{'url': 'stun:stun.l.google.com:19302'},
						{'url': 'stun:stun1.l.google.com:19302'},
						{'url': 'stun:stun2.l.google.com:19302'},
						{'url': 'stun:stun3.l.google.com:19302'},
						{'url': 'stun:stun4.l.google.com:19302'}
						]};
	this.RTCpeerConnection = new webkitRTCPeerConnection(ICE_config);
	localPeerConnectionPointer.RTCpeerConnection.onicecandidate = function(event) 
								{
									if (!event || !event.candidate) return;
									signalingService.generateAndSendMessage(client, target, "ice_candidate", event.candidate);
								};
	localPeerConnectionPointer.RTCpeerConnection.ondatachannel = function(event)
								{
									localPeerConnectionPointer.channel = event.channel;
									configureChannel(event.channel);
								};
	this.createOffer = function(){
		this.channel = localPeerConnectionPointer.RTCpeerConnection.createDataChannel("dataChannel", {});
		configureChannel(this.channel);
				
		localPeerConnectionPointer.RTCpeerConnection.createOffer(
			function (offer) 
			{
				localPeerConnectionPointer.RTCpeerConnection.setLocalDescription(offer, 
					function() 
					{
						signalingService.generateAndSendMessage(client, target, "offer", localPeerConnectionPointer.RTCpeerConnection.localDescription);
						debug("sucessfully created and sent offer",localPeerConnectionPointer.RTCpeerConnection.localDescription);
					} 
				) 
			},
			generateErrorHandler("WebRtc sdp Offer creation failed w/ error:")
		);
	}
	
	this.processOffer = function(offer){
		localPeerConnectionPointer.RTCpeerConnection.setRemoteDescription(offer);
		localPeerConnectionPointer.RTCpeerConnection.createAnswer(function (answer) 
			{
				localPeerConnectionPointer.RTCpeerConnection.setLocalDescription(answer,
					function(){
						debug("sucessfully created and sent answer", localPeerConnectionPointer.RTCpeerConnection.localDescription);
						signalingService.generateAndSendMessage(client, target, "answer", localPeerConnectionPointer.RTCpeerConnection.localDescription);
					},
					generateErrorHandler("WebRtc sdp answer setting as local descriptor failed w/ error:")
				);
			},
			generateErrorHandler("WebRtc sdp answer creation failed w/ error:"));
		}
		
	this.processAnswer = function(answer){
			localPeerConnectionPointer.RTCpeerConnection.setRemoteDescription(answer);
	}
	
	this.processIceCandidate = function(candidate){
		localPeerConnectionPointer.RTCpeerConnection.addIceCandidate(candidate,
			generateDebugger("adding ICE was successful",""), 
			generateErrorHandler("Adding ICE candidate Failed w/ error:"));
	}
	this.sendText = textSender;
	this.sendFile = fileSender;
}

function configureChannel(channel) {
	channel.onopen = generateVitalInformation("Channel is now OPEN","");
	channel.onclose = generateVitalInformation("Channel is now CLOSED","");
	channel.onerror = generateErrorHandler("Channel threw error:");
	channel.onmessage = messageReceiver;
}

function textSender(message){
	var data = {};
	data.message = message;
	data.type = "im";
	this.channel.send(JSON.stringify(data));
	console.log("Sent message to PEER: " + data.message);
}

function fileSender(file){
	var reader = new window.FileReader();
	reader.readAsDataURL(file);
	reader.onload = onReadAsDataURL.bind(this);
}

var PACKET_SIZE = 16000;
function onReadAsDataURL(event, text, channel) {

	if(!channel)
		channel = this.channel;

    var data = {}; // data object to transmit over data channel
    data.type = "file";

    if (event) text = event.target.result; // on first invocation

    if (text.length > PACKET_SIZE) {
        data.message = text.slice(0, PACKET_SIZE); // getting packet using predefined packet size
    } else {
        data.message = text;
        data.last = true;
    }

    channel.send(JSON.stringify(data)); // use JSON.stringify for chrome!
    console.log("Sent packet to PEER: " + data);

    var remainingDataURL = text.slice(data.message.length);
    if (remainingDataURL.length) setTimeout(function () {
        onReadAsDataURL(null, remainingDataURL, channel); // continue transmitting
    }, 500)
}

var packets = [];
function messageReceiver(event) {

    var data = JSON.parse(event.data);

    if(data.type == "im")
		console.log("Received message from PEER: "+ data.message, event);

	if(data.type == "file") {
		packets.push(data.message);

		if (data.last) {
	        saveToDisk(packets.join(''), 'fileName');
	        packets = [];
	    }
	}
}

function saveToDisk(fileUrl, fileName) {

	var save = document.createElement('a');
    save.href = fileUrl;
    save.target = '_blank';
    save.download = fileName || fileUrl;

    var download = document.createTextNode("Download");
    save.appendChild(download);

    document.getElementById("downloadFile").appendChild(save);
}