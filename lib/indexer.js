const md5 = require('md5-file');
const FileObj = require('./fileobj.js');
const util = require('util');
//const hashes = require('hashes');


function Indexer() {

	//console.log(instanceof global.Set);

	// Non-ES6
	// if (!global.Set) {
 //    	// lazy load a HashSet impl
	//     global.Set = require('hashes').HashSet;
		
	// 	if (!Set.prototype.has) {
	// 		Object.defineProperties(Set.prototype, {
	// 			has: {
	// 				get: function (){
	// 					return this.contains;
	// 				}
	// 			},
	// 			size: {
	// 				get: function (){
	// 					return this.count();
	// 				}
	// 			}
	// 		});
	// 	}
	// }

	this.count = 0;	
	this.data = new Map();


	this.add = function(file) {
		// calculate the md5 as the key 
		var key = md5.sync(file);

		// increment the count
		var fileObj = new FileObj(file);
		
		// If the key isn't present
		if (!this.data.has(key)) {

			// add it
			this.data.set(key, fileObj);
			this.count++;


		} else { // If its present

			// Delete the element
			//var obj = this.data.delete(key);

			var obj = this.data.get(key);
			this.data.delete(key);

			// Check if the element is an array
			//console.log("     ----> isArray() : " + util.isArray(obj));

			if (util.isArray(obj)) {
				// add the file object in the array
				obj.push(fileObj);

				// override the old element with an array of file objects
				this.data.set(key, obj);
				this.count++;


			} else { // assuming its not an array but a single element.

				// override the old element with an array of the old and new file object
				this.data.set(key, [ obj, fileObj ]);
				this.count++;


			}
		}
	}

	// this.add = function(file) {
	// 	// calculate the md5 as the key 
	// 	var key = md5.sync(file);

	// 	// increment the count
	// 	var fileObj = new FileObj(file);
	// 	console.log(fileObj.name);

	// 	// If the key isn't present
	// 	if (!this.hashes.has(key)) {

	// 		console.log("   -> no key : adding new");
	// 		// add it
	// 		this.hashes.add(key, fileObj);
	// 		this.count++;


	// 	} else { // If its present

	// 		// Delete the element
	// 		//var obj = this.hashes.delete(key);

	// 		var obj = this.hashes[key];
	// 		this.hashes.delete(key);

	// 		console.log("   -> key present : delete");
	// 		console.log("    ->>> OBJ : " + obj);

	// 		// Check if the element is an array
	// 		//console.log("     ----> isArray() : " + util.isArray(obj));

	// 		if (util.isArray(obj)) {
	// 			// add the file object in the array
	// 			obj.push(fileObj);


	// 			console.log("   -> key present : adding on top of array");
	// 			// override the old element with an array of file objects
	// 			this.hashes.add(key, obj);
	// 			this.count++;


	// 		} else { // assuming its not an array but a single element.


	// 			console.log("   -> key present : creating an array and inserting");
	// 			// override the old element with an array of the old and new file object
	// 			this.hashes.add(key, [ obj, fileObj ]);
	// 			this.count++;


	// 		}
	// 	}
	// }
}

module.exports = Indexer;