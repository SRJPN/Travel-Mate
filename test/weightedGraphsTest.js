var graphs=require('../lib/graph');
var assert=require('chai').assert;
var ld=require('lodash');

var denseGraph=function() {
	var g=new graphs.WeightedGraph();
	var vertices=['A','B','C','D','E','F','G','H','I','J'];

	vertices.forEach(function(vertex){
		g.addVertex(vertex);
	});
	var edge = new graphs.Edge('AB','A','B',100);
	g.addEdge(edge);
	var edge1 = new graphs.Edge('AC','A','C',1);
	g.addEdge(edge1);
	var edge2 = new graphs.Edge('JB','J','B',1);
	g.addEdge(edge2);

	for (var i = 1; i < vertices.length-1; i++) {
		var from=vertices[i];
		for (var j = i+1; j < vertices.length; j++) {
			var edge = new graphs.Edge(from+vertices[j],from,vertices[j],1);
			g.addEdge(edge);
		}
	}
	return g;
};

describe("shortest path",function(){
	it("should choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		g.addEdge(e1);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});

	it("should choose the path with least weight when more than one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e1",'A','C',1);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(1,path.length);
		assert.deepEqual(e3,path[0]);
	});

	it("should choose the path with least weight when more than one path exists even if the path has more vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e1",'A','C',3);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(2,path.length);
		assert.deepEqual(e1,path[0]);
		assert.deepEqual(e2,path[1]);
	});

	it("should choose the path with least weight when multiple edges exist between two vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'A','B',2);
		g.addEdge(e1);
		g.addEdge(e2);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});
	it("should give the shortest path for a dense graph", function(){
		var g=denseGraph();
		var path = g.shortestPath('A','B');
		var vertices=['A','B','C','D','E','F','G','H','I','J'];
		var edges = ['AC','CD','DE','EF','FG','GH','HI','IJ','JB'];
		assert.equal(path.length,9);
		for (var i = 0; i < edges.length; i++) {
			assert.equal(path[i].bus,edges[i]);
		};
	});
});
