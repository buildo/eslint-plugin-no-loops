'use strict';

module.exports = function (context) {
  function reportLoopPresence(node) {
    context.report(node, 'loops are not allowed', { identifier: node.name });
  }

  var awaits = []

  function enterLoop() {
    awaits.unshift(false)
  }

  function exitLoop(node) {
    var await = awaits.shift()
    if (!await) reportLoopPresence(node)
  }

  function foundAwait() {
    for (var i = 0; i < awaits.length; i++) {
      awaits[i] = true
    }
  }

  return {
    ForStatement: enterLoop,
    'ForStatement:exit': exitLoop,
    ForInStatement: enterLoop,
    'ForInStatement:exit': exitLoop,
    WhileStatement: enterLoop,
    'WhileStatement:exit': exitLoop,
    DoWhileStatement: enterLoop,
    'DoWhileStatement:exit': exitLoop,
    ForOfStatement: enterLoop,
    'ForOfStatement:exit': exitLoop,
    AwaitExpression: foundAwait
  };
};
