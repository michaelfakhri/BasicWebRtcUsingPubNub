/**
 *
 * This module contains wrapper functions to easily switch to any other tap based test framework and improve code readability
 * There are a "million" different alternatives to each function, so only use these. please?
 * you can add new ones to these but within reason. AGAIN DO NOT include the aliases for any of the currently used functions!!
 *
 *
 *
 * Author: Michael Fakhry - fakhrimichael@live.com
 * */

var test = eval(process.env.TAP_FRAMEWORK);

module.exports={
assertPass: assertPass,
assertFail: assertFail,
assertTrue: function (testHandle,condition,msg){testHandle.true(condition,msg);},
assertFalse: function (testHandle,msg){testHandle.false(condition,msg);},
assertEquals: function (testHandle,actual,expected,msg){testHandle.strictEquals(actual,expected,msg);},
assertNotEquals: function (testHandle,actual,expected,msg){testHandle.notStrictEquals(actual,expected,msg);},

generatePassingCallback: function (testHandle,msg){return function(){assertPass(testHandle,msg);};},
generateFailingCallback: function (testHandle,msg){return function(){assertFail(testHandle,msg);};},

createTest: function (testName, callBackFunction){test(testName, callBackFunction);},
endTest: function (testHandle){testHandle.end();}
}

function assertPass(testHandle,msg){testHandle.pass(msg);}
function assertFail(testHandle,msg){testHandle.fail(msg);}