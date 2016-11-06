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

f.createTest('TEST 1:', function(t) {
    // test code goes here
    // assertions go here
    f.endTest(t);
});