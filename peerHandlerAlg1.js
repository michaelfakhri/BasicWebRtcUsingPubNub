function peerHandlerAlg1() {
	this.peerConnectionMap; //currently it is only 1 element not a MAP
	this.createPeer = function(targetPeer){
		this.peerConnectionMap = new peerConnection(myUsername, targetPeer);
	}
	this.getPeer = function(requestedPeer){
		if (this.peerConnectionMap === undefined) this.createPeer(requestedPeer);
		return this.peerConnectionMap;
	}
}