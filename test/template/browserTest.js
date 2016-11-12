/**
 * Description of what the test does and it's coverage.
 *
 * WebDriver reference - http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
 * tape reference - https://github.com/substack/tape
 *
 * f here refers to test framework, t here refers to testHandle, st here refers to subtestHandle
 * Author: name - someName@someDomain
 **/

var f = require('./../framework/tapBasedTestFramework'); // for now hardcoded to tap
var seleniumHelpers = require('webrtc-utilities').seleniumLib;

console.log("************* BROWSER = "+process.env.BROWSER+" ***************");
var driver = seleniumHelpers.buildDriver();

f.createTest('TEST 1:', function(t) {
    // test code that uses selenium webDriver goes here.
    // assertions go here.
    // BE VERY CAREFUL writing webDriver tests. Ensure a logical flow of states and make extensive usage of the promise API.
    // see sampleTests.js for examples
    f.endTest(t);
});