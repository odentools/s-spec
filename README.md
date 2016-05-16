# S-Spec
Single line specification for field values.

This project is development phase.

## Parser & Validators

A list of parser and validator is available on https://github.com/odentools/s-spec/wiki/Softwares

## Specification

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

## Licenses and Maintainer

```
Public Domain; Maintained by OdenTools.
```
