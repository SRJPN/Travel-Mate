var fs = require('fs');

var data = fs.readFileSync('./data/All_Routes_By_Number.txt','utf-8');;

var commandLineArgs = require('command-line-args');

var lib = require('./lib/lib.js');

var refinedBusData = lib.refineBusData(data);

var graph =  lib.makeGraph(refinedBusData);

var cli = commandLineArgs([
  { name: 'route', alias: 'r', type: Boolean },
  { name: 'pass', alias: 'p', type: Boolean },
  { name: 'direct', alias: 'd', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'from', alias: 'f', type: String, multiple: true },
  { name: 'to', alias: 't', type: String, multiple: true},
  { name: 'station', alias: 's', type: String, multiple: true}
]);

var options = cli.parse();

if(options.route){
	console.time('route');
	console.log(graph.shortestPath(options.from.join(" "),options.to.join(" ")));
	console.timeEnd();
}

console.log(options);