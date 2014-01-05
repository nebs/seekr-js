function Seekr(delegate) {
  this.delegate    = delegate;
  this.openNodes   = {};
  this.closedNodes = {};
  this.scores      = {};
  this.parents     = {};
}

Seekr.prototype.seek = function() {
  if (!this.delegate           ||
      !this.delegate.start     ||
      !this.delegate.end       ||
      !this.delegate.neighbors ||
      !this.delegate.heuristic ||
      !this.delegate.cost      ||
      !this.delegate.equal) {
    return [];
  }
  var start = this.delegate.start(),
      end   = this.delegate.end();

  if (!start || !end) {
    return [];
  }

  this.openNodes   = {};
  this.closedNodes = {};
  this.scores      = {};
  this.parents     = {};

  if (start) {
    this.scoresFor(start).g = 0;
    this.scoresFor(start).h = this.delegate.heuristic(start, end);
    this.openNode(start);
  }

  while(true) {
    var currentNode = this.closestOpenNode();

    if (!currentNode) {
      return [];
    }

    if (this.delegate.equal(currentNode, end)) {
      this.addParent(this.parentOf(currentNode), end);
      break;
    }

    this.closeNode(currentNode);

    var adjacentNodes = this.delegate.neighbors(currentNode);

    for (var i in adjacentNodes) {
      var adjacentNode = adjacentNodes[i];
      this.scoresFor(adjacentNode).g = this.scoresFor(currentNode).g
      this.scoresFor(adjacentNode).g += this.delegate.cost(currentNode, adjacentNode);
    }

    for (var i in adjacentNodes) {
      var adjacentNode = adjacentNodes[i];

      if (this.isClosed(adjacentNode)) {
        continue;
      }

      if (this.isOpen(adjacentNode)) {
        if (adjacentNode.g < this.scoresFor(adjacentNode).g) {
          this.addParent(currentNode, adjacentNode);
        }
      } else {
        this.openNode(adjacentNode);
        this.addParent(currentNode, adjacentNode);
        this.scoresFor(adjacentNode).h = this.delegate.heuristic(adjacentNode, end);
      }
    }
  }

  var path       = [],
      parentNode = end;

  while(parentNode) {
    path.push(parentNode);
    parentNode = this.parentOf(parentNode);
  }

  return path;
};

Seekr.prototype.uid = function(node) {
  return JSON.stringify(node);
};

Seekr.prototype.openNode = function(node) {
  var key = this.uid(node);
  this.openNodes[key] = node;
  delete this.closedNodes[key];
};

Seekr.prototype.closeNode = function(node) {
  var key = this.uid(node);
  this.closedNodes[key] = node;
  delete this.openNodes[key];
};

Seekr.prototype.addParent = function(parentNode, childNode) {
  this.parents[this.uid(childNode)] = parentNode;
}

Seekr.prototype.isClosed = function(node) {
  return this.closedNodes[this.uid(node)];
};

Seekr.prototype.isOpen = function(node) {
  return this.openNodes[this.uid(node)];
};

Seekr.prototype.parentOf = function(node) {
  return this.parents[this.uid(node)];
};

Seekr.prototype.scoresFor = function(node) {
  var key = this.uid(node);

  if (!this.scores[key]) {
    this.scores[key] = {};
  }

  return this.scores[key];
};

Seekr.prototype.closestOpenNode = function() {
  var lowestF         = Infinity,
      nodeWithLowestF = null;

  for (var key in this.openNodes) {
    var node = this.openNodes[key];

    var f = this.scoresFor(node).g + this.scoresFor(node).h;
    if (f < lowestF) {
      lowestF = f;
      nodeWithLowestF = node;
    }
  }

  return nodeWithLowestF;
};
