var graphs = {};

graphs.Graph = function(){
	this.graph = {};
}

graphs.Graph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = this.graph[vertex] || [];
	},
	hasEdgeBetween : function(head, tail){
		return this.graph[head].indexOf(tail)>=0;
	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	numberOfEdges : function(){
		var graph = this.graph;
		return Object.keys(graph).reduce(function(size, vertex){
			return size+graph[vertex].length;
		},0);
	},
	pathBetween : function(head, tail, visitedVertices){
		visitedVertices = visitedVertices || [];
		var graph = this.graph;
		if(head == tail)
			return visitedVertices.concat(head);
		for (vertex in graph[head]){
			var nextHead = graph[head][vertex];
			if(visitedVertices.indexOf(nextHead)==-1){
				var path = this.pathBetween(nextHead, tail, visitedVertices.concat(head));
				if(path.length)
					return path;
			}
		};
		return [];
	},
	farthestVertex : function(head){
		var vertices = Object.keys(this.graph);
		var distance = 0;
		var self = this;
		return vertices.reduce(function(farthestVertex, vertex){
			var path = self.pathBetween(head, vertex);
			if(path.length>=distance){
				distance = path.length;
				return vertex;
			}
			return farthestVertex;
		},'');
	},
	allPaths : function(head, tail, visitedVertices, paths){
		visitedVertices = visitedVertices || [];
		paths = paths || [];
		var graph = this.graph;
		if(head == tail)
			return paths.push(visitedVertices.concat(head));
		for (vertex in graph[head]){
			var nextHead = graph[head][vertex];
			if(visitedVertices.indexOf(nextHead)==-1){
				this.allPaths(nextHead, tail, visitedVertices.concat(head), paths);
			}
		};
		return paths;
	}
};

graphs.WeightedGraph = function(){
	this.graph ={};
};

graphs.WeightedGraph.prototype = new graphs.Graph();

graphs.WeightedGraph.prototype.addEdge = function(edge){
	this.graph[edge.head].push(edge);
};

var allPaths = function(head, tail, paths, path, visitedVertices){
	paths = paths || [];
	path = path || [];
	visitedVertices = visitedVertices || [];
	var vertex = this.graph[head];
	for (var i = 0; i < vertex.length; i++) {
		var newPath = path.concat(vertex[i]);
		newPath.pathLength = (path.pathLength || 0) + vertex[i].distance;	
		if(vertex[i].tail == tail)		
			paths.push(newPath)
		else if(visitedVertices.indexOf(vertex[i].tail)==-1){
			visitedVertices.push(vertex[i].tail);	
			allPaths.apply(this,[vertex[i].tail,tail, paths, newPath, visitedVertices]);
		};
	};
	return paths;
};

graphs.WeightedGraph.prototype.shortestPath = function(head, tail){
	var paths = allPaths.apply(this,[head, tail]);
	return paths.reduce(function(shortestPath, path){
		return shortestPath.pathLength>path.pathLength ? path : shortestPath;
	});
};

graphs.Edge = function(bus, head, tail, distance){
	this.bus = bus;
	this.head = head;
	this.tail = tail;
	this.distance = distance;
};

module.exports = graphs;