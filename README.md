# S-Spec
Single line specification for field values.

This project is development phase.

[![Build Status](https://travis-ci.org/odentools/s-spec.svg?branch=master)](https://travis-ci.org/odentools/s-spec)


## Get Started

### On Your Code

Currently it works on Node.js / io.js.

```
$ npm install --save https://github.com/odentools/s-spec.git
```
```js
var sv = require('SSpecValidator');

// Validation
console.log(sv.isValid('INTEGER(0,255) DEFAULT 0', 100)); // Okay
console.log(sv.isValid('INTEGER(0,255) DEFAULT 0', 256)); // Out of range

console.log(sv.isValid('TEXT(1,4)', 'okay')); // Okay
console.log(sv.isValid('TEXT(1,4)', '')); // Too short
console.log(sv.isValid('TEXT(1,4)', 'hello')); // Too long

// Get a valid value
console.log(sv.getValidValue('INTEGER(0,255) DEFAULT 100', 255)); // 255
console.log(sv.getValidValue('INTEGER(0,255) DEFAULT 100', 256)); // 100

```

### On Command (Under construction...)

```
$ git clone https://github.com/odentools/s-spec.git
$ cd s-spec/
$ npm install
$ node sspec.js --spec 'INTEGER(0,255) DEFAULT 0'
100
```


## S-Spec Specification

Basic format:

	VARIABLE_TYPE[(MIN_VALUE, MAX_VALUE)|(MAX_VALUE)] [DEFAULT x] [REGEXP exp]

Example:

	INTEGER(0,255) DEFAULT 100
	INTEGER(0,255)
	INTEGER(255)
	INTEGER (255)
	INTEGER()
	INTEGER
	...

### VARIABLE_TYPE

* BOOLEAN
* FLOAT
* INTEGER
* NUMBER - INTEGER and FLOAT; Alias of FLOAT at present.
* STRING
* TEXT - Alias of STRING

### MIN_VALUE (Optional)

Minimum value.

If the variable type is STRING or TEXT, it gives limitation with string length.

### MAX_VALUE (Optional)

Maximum value.

If the variable type is STRING or TEXT, it gives limitation with string length.

### DEFAULT (Optional)

Default value.

Example:

	DEFAULT 'hello'
	DEFAULT 0
	DEFAULT false

### REGEXP (Optional)

Validate whether the value is matched to the regular-expression.

Example:

	REGEXP '^[a-z\'\" ]+$'

## Licenses

```
The MIT License (MIT).
Copyright (c) 2016 OdenTools Project.
```
