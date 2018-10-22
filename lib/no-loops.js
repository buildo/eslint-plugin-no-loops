'use strict';

module.exports = function (context) {
  function reportLoopPresence(node) {
    context.report(node, 'loops are not allowed', { identifier: node.name });
  }

  var loopDepth = 0
  var isAsyncLoop = false

  function enterLoop(node) {
    if (loopDepth === 0) isAsyncLoop = false;
  }

  function exitLoop(node) {
    if (!isAsyncLoop) {
      reportLoopPresence(node);
    }
  }

  function foundAwait() {
    isAsyncLoop = true;
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
