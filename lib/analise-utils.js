const dir = require('node-dir');
var Indexer = require('./indexer.js');
const util = require('util');
const fs = require("fs");

/* getFileList - Gets the file list from the given path */

module.exports = {
	getFileList : function(path) {

		// Prepare the list of files
		return dir.files(path, {sync : true});
	},
	//indexFiles : function(files, done) {
	indexFiles : function(path, done) {

		//console.log(files);

		var index = new Indexer();

		// files.forEach(function(file) {
		// 	index.add(file);
		// });
		//console.trace("indexFiles()");
		console.log("Indexing " + path);
		dir.files(path, function(err, files) {
			if (err) throw err;

			files.sort();
			files = files.filter(function(file) {
				return fs.statSync(file).size > 0;
			});
			// Add any filters // Inclues/excludes

			files.forEach(function(file) {
				index.add(file);
			});

			done(index.data);
		});
	},

	createIndexFile : function(files) {

		//console.trace("createIndexFile()");
		console.log("Creating index file");
		//logger.log("[");
		// files.forEach(function(value, key, map) {
			// //logger.log(key + " : " + value);
			// logger.log("{ \"" + key + "\" : ");
			// if (util.isArray(value)) {
			// 	logger.log(" [ ");
			// 	value.forEach(function(elem) {
			// 		logger.log(" { name : \"" + elem.name + "\",  path: \"" + elem.path + "\", size: \"" + elem.size + "\" } ");
			// 	});
			// 	logger.log(" ] ");
			// } else {
			// 	logger.log(" { name : \"" + value.name + "\",  path: \"" + value.path + "\", size: \"" + value.size + "\" } ");
			// }
			// logger.log("}");


		// });
		//logger.log("]");

		
		logger.log(JSON.stringify(Array.from(files.entries())));

	},
	printDuplicates : function(files) {
			
		logger.log("Printing Duplicates");

		var sizeSaving = 0;

		files.forEach(function(value, key, map) {
			//logger.log(key + " : " + value);
			if (util.isArray(value)) {

				var sizeSum = 0;
				var count = value.length;

				logger.log("===========================================");
				value.forEach(function(elem) {
					logger.log(elem.name + " : " + elem.path + " (" + elem.size + ")");
					sizeSum += elem.size;
				});
				logger.log("===========================================");

				sizeSaving += (sizeSum * (count - 1));
			}
			// } else {
			// 	logger.log("\t" + value.name + " : " + value.path + " (" + value.size + ")");
			// }

		});
		
		logger.log("You will save a total of : " + sizeSaving + " bytes or approx " + parseInt(sizeSaving / 1048576) + " MB");
		// else if (format == "csv") {
		// 	console.log("Format : csv");
		// 	files.forEach(function(file) {
		// 		logger.log(file.name + "," + file.md5);
		// 	});
		// }
	}, 
	loadIndexFile : function(indexFile, done) {
		fs.readFile(indexFile, 'utf8', function (err,data) {
			if (err) throw err;
			
			done(new Map(JSON.parse(data)));
		});
	}
}
