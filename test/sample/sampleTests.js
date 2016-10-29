/**
 * This test contains two sample unit tests demonstrates the capabilities of headless browser testing and the tap test framework.
 *
 * f here refers to test framework, t here refers to testHandle, st here refers to subtestHandle
 * Author: Michael Fakhry - fakhrimichael@live.com
 * */


var f = require('./../framework/tapBasedTestFramework'); // for now hardcoded to tap
var seleniumHelpers = require('webrtc-utilities').seleniumLib;

console.log("************* BROWSER = "+process.env.BROWSER+" ***************");
var driver = seleniumHelpers.buildDriver();
var browser = process.env.BROWSER;

// sample test 1
f.createTest('TEST 1: Creating a RTCPeerConnection object in chrome and firefox', function(t) {
    var scriptToExecute='try {return new webkitRTCPeerConnection(null);}catch(e){return new RTCPeerConnection(null);}'
    driver.executeScript(scriptToExecute)
        .then(f.generatePassingCallback(t,"SUCCESS - created RTC peer connection object"),
            f.generateFailingCallback(t,"FAILURE - unable to create RTC peer connection object"))
        .then(function(){f.endTest(t);});
});

// sample test 2
f.createTest('TEST 2: Creating a RTCPeerConnection object in chrome and firefox 2', function(t) {
    t.test('TEST 2.1: testing chrome\'s method for creating RTCPeerConnection objects', function(st1) {
        var scriptToExecute='return new webkitRTCPeerConnection(null);';
        if (browser == "chrome"){
            var promise = driver.executeScript(scriptToExecute)
                .then(f.generatePassingCallback(t,"SUCCESS - created RTC peer connection object for chrome browser"),
                    f.generateFailingCallback(t,"FAILURE - unable to create RTC peer connection object for chrome browser"));
        }else{
            var promise = driver.executeScript(scriptToExecute)
                .then(f.generateFailingCallback(t,"FAILURE - No Error was thrown for non chrome browser"),
                    f.generatePassingCallback(t,"SUCESS - Error was thrown for non chrome browser"));
        }
        promise.then(function(){f.endTest(st1)});
    });
    t.test('TEST 2.2: testing firefox\'s method for creating RTCPeerConnection objects', function(st2) {
        var scriptToExecute='return new RTCPeerConnection(null);';
        if (browser == "firefox"){
            var promise = driver.executeScript(scriptToExecute)
                .then(f.generatePassingCallback(t,"SUCCESS - created RTC peer connection object for firefox browser"),
                    f.generateFailingCallback(t,"FAILURE - unable to create RTC peer connection object for firefox browser"));
        }else{
            var promise = driver.executeScript(scriptToExecute)
                .then(f.generateFailingCallback(t,"FAILURE - No Error was thrown for non firefox browser"),
                    f.generatePassingCallback(t,"SUCCESS - Error was thrown for non firefox browser"));

        }
        promise.then(function(){f.endTest(st2);f.endTest(t);});
    });
});