function peerConnection(client,target)
{
	this.clientId = client;
	this.targetId = target;
	var ICE_config= {
				'iceServers': [
						{'url': 'stun:stun.l.google.com:19302'},
						{'url': 'stun:stun1.l.google.com:19302'},
						{'url': 'stun:stun2.l.google.com:19302'},
						{'url': 'stun:stun3.l.google.com:19302'},
						{'url': 'stun:stun4.l.google.com:19302'}
						]};
	this.RTCpeerConnection = new webkitRTCPeerConnection(ICE_config);
	this.RTCpeerConnection.onicecandidate = function(event) 
								{
									if (!event || !event.candidate) return;
									signalingService.generateAndSendMessage(client, target, "ICE candiate", event.candidate);
								};
	this.RTCpeerConnection.ondatachannel = function(event)
								{
									peerCon.channel = event.channel //work on eliminating this line next
									configureChannel(event.channel);
								};
	this.channel;
}

function configureChannel(channel){
	channel.onopen = generateDebugger("Channel is now open","");
	channel.onerror = generateErrorHandler("Channel threw error:");
	channel.onmessage = messageHandler;
}

function messageHandler(event) {
					debug("Got message from PEER: "+event.data, event);
				}