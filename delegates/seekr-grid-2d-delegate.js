function SeekrGrid2DDelegate(grid) {
  this.grid            = grid;
  this.ORTHOGONAL_COST = 10;
  this.DIAGONAL_COST   = 14;
}

SeekrGrid2DDelegate.prototype.isAccessible = function(x, y, new_x, new_y) {
  if (!this.grid.isInBounds(new_x, new_y)) {
    return false;
  }

  // Moving horizontally
  if (new_x != x && this.grid.isInBounds(new_x, y) && this.grid.cellAt(new_x, y) == 1) {
    return false;
  }
  // Moving vertically
  if (new_y != y && this.grid.isInBounds(x, new_y) && this.grid.cellAt(x, new_y) == 1) {
    return false;
  }

  return this.grid.cellAt(new_x, new_y) != 1;
};

SeekrGrid2DDelegate.prototype.start = function() {
  return this.grid.coordinatesOfCellWithPredicate(function(cell){
    return cell == 2;
  });
};

SeekrGrid2DDelegate.prototype.end = function() {
  return this.grid.coordinatesOfCellWithPredicate(function(cell){
    return cell == 3;
  });
};

SeekrGrid2DDelegate.prototype.neighbors = function(node) {
  var neighborNodeCoordinates = [
    { x: node.x - 1, y: node.y - 1 },
    { x: node.x    , y: node.y - 1 },
    { x: node.x + 1, y: node.y - 1 },
    { x: node.x - 1, y: node.y     },
    { x: node.x + 1, y: node.y     },
    { x: node.x - 1, y: node.y + 1 },
    { x: node.x    , y: node.y + 1 },
    { x: node.x + 1, y: node.y + 1 },
  ];

  var neighborNodes = [];
  for (var i in neighborNodeCoordinates) {
    var coords = neighborNodeCoordinates[i];
    if (this.isAccessible(node.x, node.y, coords.x, coords.y)) {
      neighborNodes.push(coords);
    }
  }

  return neighborNodes;
};

SeekrGrid2DDelegate.prototype.heuristic = function(startNode, endNode) {
  if (!startNode || !endNode) {
    return 0;
  }

  return (Math.abs(endNode.x - startNode.x) + Math.abs(endNode.y - startNode.y)) * this.ORTHOGONAL_COST;
};

SeekrGrid2DDelegate.prototype.cost = function(fromNode, toNode) {
  // Return the cost to go from and to the given the nodes
  if (fromNode.x != toNode.x && fromNode.y != toNode.y) {
    return this.DIAGONAL_COST;
  } else {
    return this.ORTHOGONAL_COST;
  }
};

SeekrGrid2DDelegate.prototype.equal = function(nodeA, nodeB) {
  return (nodeA.x == nodeB.x && nodeA.y == nodeB.y);
};
