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

var makeGraph = function(Graph, Edge, busDetails){
	var graph =  new Graph();
	for(bus in busDetails){
		var route = busDetails[bus];
		addAllRoutes(graph, Edge, bus, route);
	};
	return graph;
};

var addAllRoutes = function(graph, Edge, bus, route){
	for(var i = 0; i < route.length; i++){
		graph.addVertex(route[i]);
		for(var j=i+1; j < route.length; j++){
			var edge = new Edge(bus, route[i], route[j], 1);
			graph.addEdge(edge);
		};
	};
};

exports.refineBusData = refineBusData;
exports.makeGraph = makeGraph;