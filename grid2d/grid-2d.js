function Grid2D(cells) {
  this.cells = cells;
};

Grid2D.prototype.loop = function(processor, yProcessor) {
  for (var y = 0; y < this.rowCount(); y++) {
    var yProcessorValue;
    if (yProcessor) {
      yProcessorValue = yProcessor.call(this, y);
    }

    for (var x = 0; x < this.colCount(); x++) {
      if (yProcessorValue !== undefined) {
        if (!processor.call(this, x, y, this.cellAt(x, y), yProcessorValue)) {
          return;
        }
      } else {
        if (!processor.call(this, x, y, this.cellAt(x, y))) {
          return;
        }
      }
    }
  }
};

Grid2D.prototype.coordinatesOfCellWithPredicate = function(predicate) {
  var foundCell;
  this.loop(function(x, y, cell) {
    if (predicate(cell)) {
      foundCell = { x: x, y: y };
      return false;
    }

    return true;
  });

  return foundCell;
};

Grid2D.prototype.cellAt = function(x, y, newValue) {
  if (!this.isInBounds(x, y)) {
    return;
  }

  if (newValue !== undefined) {
    this.cells[y][x] = newValue;
  }

  return this.cells[y][x];
};

Grid2D.prototype.isInBounds = function(x, y) {
  return (x >= 0 && x < this.colCount() && y >=0 && y < this.rowCount());
};

Grid2D.prototype.rowCount = function() {
  if (!this.cells) {
    return 0;
  }

  return this.cells.length;
};

Grid2D.prototype.colCount = function() {
  if (!this.cells || !this.cells[0]) {
    return 0;
  }

  return this.cells[0].length;
};
