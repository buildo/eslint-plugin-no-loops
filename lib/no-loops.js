'use strict';

module.exports = function (context) {
  function reportLoopPresence(node) {
    context.report(node, 'loops are not allowed', { identifier: node.name });
  }

  var loopsContainAwait = []

  function enterLoop() {
    loopsContainAwait.unshift(false)
  }

  function exitLoop(node) {
    if (!loopsContainAwait.shift()) reportLoopPresence(node)
  }

  function foundAwait() {
    for (var i = 0; i < loopsContainAwait.length; i++) {
      loopsContainAwait[i] = true
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
