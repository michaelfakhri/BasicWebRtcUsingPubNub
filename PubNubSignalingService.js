function PubNubSignalingService(client)
{
	var CHANNEL_ON_PUBNUB = "test_channel1";
	// PubNub object is the object responsible for communicating with the signaling server.
	// It uses a Pub/Sub model for communicating messages.
	this.pubnub = new PubNub(
						{
						publishKey : 'pub-c-4c1c39f8-813b-4424-9d41-c83b634cad79',
						subscribeKey : 'sub-c-67dc1f0e-829c-11e6-a8c4-0619f8945a4f'
						}
					);
		
	this.pubnub.subscribe(
		{
		channels:[CHANNEL_ON_PUBNUB],
		withPresence:true
		}
	);
	
	this.pubnub.addListener({
				status: function(statusEvent) {
					debug("status message received w/ status", statusEvent);
				},
				message: function(message) {
					var parsedMsg = JSON.parse(message.message);
					if(parsedMsg.destination == client){
						messageRouter.handleSignalingMessage(parsedMsg.origin, parsedMsg.msgType, parsedMsg.msg);
					}	
				},		
				presence: function(presenceEvent) {
					debug("presence message received w/ status", presenceEvent);
				}
			});
	
	this.generateAndSendMessage = function(source, target, messageType, message)
							{
								var msg = {
										channel: CHANNEL_ON_PUBNUB,
										message: JSON.stringify(
													{
													origin:source,
													destination:target,
													msgType:messageType,
													msg:message			
													}
												)
										};
										this.pubnub.publish(msg, function(status, response) 
													{
													//debug("Just published a message on the signaling service:",status, response);
													}
												);
							}
}