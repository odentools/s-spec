/**
 * s-spec parser
 * https://github.com/odentools/s-spec
 * (C) 2016 - OdenTools Released under MIT License.
 */

'use strict';

var helper = require(__dirname + '/helper');


/**
 * Spec
 * @param  {String} spec_str Specification string - e.g. INTEGER(-255, 255) DEFAULT 0
 * @return {Object}          Instance
 */
var SSpecParser = function (spec_str) {

	// Specification string
	this.specStr = spec_str;

	// Variable type
	this.type = null;

	// Default value
	this.default = null;

	// Range of value
	this.min = null;
	this.max = null;

	// ---

	// Parse the specification string
	this._parseSpec(this.specStr);

};


/**
 * Get the default value
 * @return {Object} Default value
 */
SSpecParser.prototype.getDefaultValue = function () {

	return this.default;

};


/**
 * Parse the specification string
 * @param {String} spec_str Specification string
 */
SSpecParser.prototype._parseSpec = function (spec_str) {

	var self = this;

	var VAR_TYPES = [
		'INTEGER', 'STRING', 'BOOLEAN', 'TEXT'
	];

	if (!spec_str.match(/^([a-zA-Z]+)(\((.*)\)|)/)) throw new Error('Could not parse the specification');

	// Type
	var type_chunk = helper.toUpperCase(RegExp.$1);
	if (VAR_TYPES.indexOf(type_chunk) == -1) throw new Error('Variable type is unknown: ' + type_chunk);
	self.type = type_chunk;

	// Limitation of the value range
	var limit_chunk = RegExp.$3 || null;
	if (limit_chunk != null) {
		var limit_chunks = limit_chunk.split(/,/);
		if (limit_chunks.length == 1) {
			self.min = null;
			self.max = parseInt(limit_chunks[0]);
		} else if (limit_chunks.length == 2) {
			self.min = parseInt(limit_chunks[0]);
			self.max = parseInt(limit_chunks[1]);
		}
	}

	// Other options
	var chunks = spec_str.split(/ /);
	var before_chunk = new String();
	chunks.forEach(function (chunk, i) {

		if (i == 0) return; // skip

		// Default Value
		if (before_chunk == 'DEFAULT') {
			chunk = chunk.replace(/^['"]/, '');
			chunk = chunk.replace(/([a-zA-Z])['"]$/, '$1');
			self.default = self._getDefaultValueByChunk(chunk);
		}

		before_chunk = chunk;

	});

};


/**
 * Get the default value from the specified chunk
 * @param {String} chunk Chunk string of default value
 * @return {Object} default value
 */
SSpecParser.prototype._getDefaultValueByChunk = function (chunk) {

	var self = this;

	if (self.type == 'STRING' || self.type == 'TEXT') {

		if (helper.isType('String', chunk)) return chunk;
		return new String(chunk);

	} else if (self.type == 'INTEGER') {

		return parseInt(chunk);

	} else if (self.type == 'BOOLEAN') {

		if (chunk === 'true' || chunk === true) {
			return true;
		} else if (chunk === 'false' || chunk === false) {
			return false;
		}

	} else {

		return chunk;

	}

	return null;

};


// ----

module.exports = SSpecParser;
