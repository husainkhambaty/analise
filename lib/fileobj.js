const path = require('path');
const fs = require("fs");


function FileObj(file) {
	this.path = path.dirname(file);
	this.name = path.basename(file);
	this.size = fs.statSync(file).size;
}

module.exports = FileObj;