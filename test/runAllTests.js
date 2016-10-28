var test = require('tape');

var seleniumHelpers = require('webrtc-utilities').seleniumLib;

test('Creating a RTC peer connection object in chrome and firefox', function(t) {
    t.comment("testing RTC peer connection object creation for "+process.env.BROWSER);
    var driver = seleniumHelpers.buildDriver();
    driver.executeScript(function() {
        try {
            return new webkitRTCPeerConnection(null);
        } catch (e){
            return new RTCPeerConnection(null);
        }
    }).then(function(){
        t.pass("passed creating a RTC peer connection object");
        t.end()
    });
    }
);