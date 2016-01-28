var graphLib = require('../graphs/lib/weightedGraph.js');

var Graph = graphLib.WeightedGraph;

var Edge = graphLib.Edge;

var refineBusData = function(text){
	var textByLine = text.split('\r\n')
	var regex = /:|,/g;
	var obj = {};
	textByLine.forEach(function(line){
		var temp = line.split(regex);
		obj[temp[0]] = temp.splice(1);
	});
	return obj;
};

var makeGraph = function(busDetails){
	var graph =  new Graph();
	for(bus in busDetails){
		var route = busDetails[bus];
		addAllRoutes(graph, bus, route);
	};
	return graph;
};

var addAllRoutes = function(graph, bus, route){
	for(var i = 0; i < route.length; i++){
		graph.addVertex(route[i]);
		for(var j=i+1; j < route.length; j++){
			var edge = new Edge(bus, route[i], route[j], 1);
			graph.addEdge(edge);
		};
	};
};

var findPassThrough = function(graph, station){
	var point = station.join(" ");
	return graph.graph[point].map(function(route){
		return route.edge;
	});
};

var getShortestRoute = function(graph, from, to){
	from = from.join(" ");
	to = to.join(" ");
	return graph.shortestPath(from, to);
};

var getDirectPath = function(graph, from, to){
	from = from.join(" ");
	to = to.join(" ");
	var path = graph.shortestPath(from, to);
	return path.length == 1 ? path : null;
};

exports.refineBusData = refineBusData;
exports.makeGraph = makeGraph;
exports.findPassThrough = findPassThrough;
exports.getShortestRoute = getShortestRoute;
exports.getDirectPath =getDirectPath;