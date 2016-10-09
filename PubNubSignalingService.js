function PubNubSignalingService(client)
{
	var channelToUseOnPubNub = "test_channel1";
	this.clientId = client;
	// PubNub object is the object responsible for communicating with the signaling . It uses a Pub/Sub model for communicating messages.
	this.pubnub = new PubNub(
						{
						publishKey : 'pub-c-4c1c39f8-813b-4424-9d41-c83b634cad79',
						subscribeKey : 'sub-c-67dc1f0e-829c-11e6-a8c4-0619f8945a4f'
						}
					);
		
	this.pubnub.subscribe(
		{
		channels:[channelToUseOnPubNub],
		withPresence:true
		}
	);
	
	this.generateAndSendMessage = function(source, target, messageType, message)
							{
								var msg = {
										channel:channelToUseOnPubNub,
										message:JSON.stringify(
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