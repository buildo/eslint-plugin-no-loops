# eslint-plugin-no-loops
It's 2019 and you still use loops?

[![Build Status](https://travis-ci.org/buildo/eslint-plugin-no-loops.svg?branch=master)](https://travis-ci.org/buildo/eslint-plugin-no-loops)
[![npm](https://img.shields.io/npm/v/eslint-plugin-no-loops.svg)](https://www.npmjs.com/package/eslint-plugin-no-loops)

<p align="center">
  <img src="https://i.imgflip.com/1oa3kd.jpg" title="made at imgflip.com"/> 
</p>

## Installation
```sh
npm install --save-dev eslint-plugin-no-loops
```

## Usage
In your `.eslintrc`:

```javascript
{
  "plugins": [
    "no-loops"
  ],
  "rules": {
    "no-loops/no-loops": 2
  }
}
```

## Rule
Disallow use of loops (for, for-in, while, do-while, for-of).

## Why
You [don't](http://www.codereadability.com/coding-without-loops/) [need](http://joelhooks.com/blog/2014/02/06/stop-writing-for-loops-start-using-underscorejs/) [them](http://www.sitepoint.com/quick-tip-stop-writing-loops-start-thinking-with-maps/).

## I know better, I need one now
If 99% of your code doesn't need them, but you have that single case where a loop makes sense, go ahead!

```javascript
// eslint-disable-next-line no-loops/no-loops
for (let i = 0; i < arr.length; i++) {
  // ...
}
```

 What is a rule without its exceptions?
