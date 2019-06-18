'use strict';

var rule = require('../lib/no-loops.js');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 } });
ruleTester.run('no-loops', rule, {
  valid: [
    {
      code: '[1, 2, 3].map(function (i) { console.log(i); });'
    },
    {
      code: 'async function ok() { for (var i = 0; i < n; i++) { await x[i]() } }'
    },
    {
      code: 'const ok = async () => { for (const x of y) { for (const z of y) { await z() } } }'
    },
    {
      code: 'async function ok() { for (const x of y) { await x() } }'
    },
    {
      code: 'async function ok() { while (true) { await x() } }'
    },
    {
      code: 'async function ok() { do { await x() } while (true) }'
    },
    {
      code: 'const ok = async () => { for (const x of y) { for (const z in y) { await z() } } }'
    }
  ],

  invalid: [
    {
      code: 'for (var i; i <= n; i++) { console.log(i); }',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'for (i in [1, 2, 3]) { console.log(i); }',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'while (i <= n) { console.log(i); }',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'do { console.log(i); } while (i <= n)',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'for (i of [1, 2, 3]) { console.log(i) }',
      parser: 'babel-eslint',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'async function bad() { while (true) { x() } }',
      parser: 'babel-eslint',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'const ok = async () => { for (const x of y) { await x(); for (const z in y) { z() } } }',
      parser: 'babel-eslint',
      errors: [ { message: 'loops are not allowed' } ]
    }
  ]
});
