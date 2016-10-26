var test = require('tape');

var webdriver = require('selenium-webdriver');
var seleniumHelpers = require('webrtc-utilities').seleniumLib;

test('test 1', function(t) {
    var driver = seleniumHelpers.buildDriver();
    driver.executeScript('return new webkitRTCPeerConnection(null);');
    t.end();
    }
);