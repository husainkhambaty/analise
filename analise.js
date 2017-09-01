var utils = require('./lib/analise-utils.js');
const fs = require("fs");


// Set the command line options
const cmdLineOptions = [
  { name: 'path', alias: 'p', type: String }, 
  { name: 'output', alias : 'o', type: String }, // Create an output file of the index created or just dump to stdout
  { name: 'depth', alias: 'd', type: Number }, // Set the depth. If depth is not set it will recursively go into every folder (time and cpu intensive)
  { name: 'format', alias: 'f', type: String, defaultValue: "json"}, // format: json, csv
  { name: 'index', alias: 'i', type: String }
];

const args = require('command-line-args')(cmdLineOptions);


// TODO: validated the args.output if the dir has writable permissions
const out = (args.output) ? fs.createWriteStream(args.output + ".index") : process.stdout;
const err = process.stderr;
global.logger = new console.Console(out, err);

if (args.index && fs.existsSync(args.index + ".index")) {
	console.log("Using existing index : " + args.index + ".index");

	utils.loadIndexFile(args.index + ".index", function(data) {
		//utils.printDuplicates(JSON.stringify(Array.from(data.entries())));
		utils.printDuplicates(data);
	});
	return;

}

if (!args.path) { args.path = "" }

// Check if user would like to index
if (args.path) {
	console.log("Start Indexing ... ");

	// Index the files
	utils.indexFiles(args.path, function(files) {
		
		utils.createIndexFile(files);

	});
}

