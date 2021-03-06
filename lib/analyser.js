	var parser = require('./parser')
	, cjson = require('cjson')
	, Node = require('./data-structures/node')
	, Edge = require('./data-structures/edge');

var toList = require('./algorithms/to-list')
	, bfs = require('./algorithms/bfs');

/**
 * Analyser is an object that is used to analyse a graph.
 * @constructor
 * @param {Object} config - Values to override default configuration.
 */
function Analyser(config) {
	var defaults = {
		aliases: {
			'bjuutie': 'Bjuuti',
		},
		postfixes: ['_', '\\^', '-'],
		ignores: ['pyfibot'],
		relationshipDecay: 0.0001,
		activityDecay: 0.001,
		heuristics: {
			'adjacency': {
				weight: 1
			}
		}
	};
	this.config = cjson.extend(defaults, config);

	this.config.postfixes = this.config.postfixes.map(function (f) {
		return new RegExp(f + '+$');
	});

	this.heuristics = [];

	this.nodes = {};
	this.edges = {};
}

/**
 * Add a new heuristic to the analyser.
 * @param {String} name - Name of the heuristic, it will be loaded from heuristics folder.
 */
Analyser.prototype.addHeuristic = function (name) {
	this.heuristics.push(new (require('./heuristics/' + name))(this, this.config.heuristics[name]));
};

/**
 * Processes a piece of data with currently active heuristics.
 * @param {Object} data - Data object
 */
Analyser.prototype.infer = function (data) {
	var config = this.config, nickLC = data.nick.toLowerCase();

	config.postfixes.forEach(function (f) {
		data.nick = data.nick.replace(f, '');
	});

	if (config.ignores.indexOf(nickLC) !== -1) {
		return;
	}

	if (nickLC in config.aliases) {
		data.nick = config.aliases[nickLC];
	}

	this.heuristics.forEach(function (heuristic) {
		heuristic.infer(data);
	});
};

/**
 * Add a vertex to the graph. If it already exists, it's weight will be increased.
 * @param {String} label - Label for the vertex.
 */
Analyser.prototype.addNode = function (label) {
	if (this.nodes[label]) {
		this.nodes[label].weight++;
	} else {
		this.nodes[label] = new Node(label);
	}
};

/**
 * Check if a given label exists in the graph.
 * @param {String} label - The label to check
 * @returns {Boolean} - Whether the label is in the graph or not
 */
Analyser.prototype.hasNode = function (label) {
	return label in this.nodes;
};

/**
 * Add an edge between two vertices. If it already exists, it's weight will be increased.
 * @param {String} source - From vertex
 * @param {String} target - To vertex
 * @param {Number} weight - Weight of the edge
 */
Analyser.prototype.addEdge = function (source, target, weight) {
	if (source === target || weight < 0) {
		return;
	}

	this.addNode(source);
	this.addNode(target);

	var edge = new Edge(source, target);

	if (this.edges[edge.toString()]) {
		this.edges[edge.toString()].weight++;
	} else {
		this.edges[edge.toString()] = edge;
	}
};

/**
 * Remove a vertex by it's label.
 * @param {String} label - The label to remove
 */
Analyser.prototype.removeNode = function (label) {
	if (this.nodes[label]) {
		delete this.nodes[label];

		this.edges = this.edges.filter(function (edge) {
			if (edge.source === label || edge.target === label) {
				return false;
			} else {
				return true;
			}
		});
	}
};

/**
 * Compute an adjacency list representation of the graph.
 * @returns {Array} - An adjacency list representation of the graph
 */
Analyser.prototype.getList = function () {
	return toList(this.nodes, this.edges);
};

/**
 * Compute a breadth-first-tree from the graph.
 * @param {String} label - The label to start the bfs from.
 * @returns {Array} - A tree represented as an path array.
 */
Analyser.prototype.bfs = function (start) {
	return bfs(start, toList(this.nodes, this.edges));
};

module.exports = Analyser;