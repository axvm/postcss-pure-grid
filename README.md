# PostCSS-pure-grid

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[PureCSS] grid system for [PostCSS] .


[PostCSS]:         https://github.com/postcss/postcss
[PureCSS]:         http://purecss.io/

## Installation

```
$ npm install postcss-pure-grid
```

## Usage

```js
var fs = require('fs');
var postcss = require('postcss');
var puregrid = require('postcss-pure-grid');

var css = fs.readFileSync('input.css', 'utf8');

var output = postcss()
  .use(puregrid())
  .process(css)
  .css;
```

```css
.row {
  pure-grid-group: row nowrap;
}

/* width: 25% */
.column {
  pure-grid-unit: 1/4;
}

/* width 50% offset */
.column-offset {
  pure-grid-offset: 1/2
}
```

## Columns
You are not limited to use any columns number. `1/4` or `3/12` its up to you.
