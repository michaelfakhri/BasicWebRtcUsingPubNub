function messageRouterAlg1(){
	this.handleSignalingMessage = function(source, msgType, msg){
		window[msgType].apply(null,[source, msg]);
	}
}

function offer(source, msg){
	peerHandler.getPeer(source).processOffer(msg);
}

function answer(source, msg){
	peerHandler.getPeer(source).processAnswer(msg);
}

function ice_candidate(source, msg) {
	peerHandler.getPeer(source).processIceCandidate(msg);
}