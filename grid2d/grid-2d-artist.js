function Grid2DArtist(canvas) {
  this.canvas = canvas;
  this.ctx    = canvas.getContext('2d');
  this.width  = canvas.width;
  this.height = canvas.height;
  this.colors = ['white', 'black', 'blue', 'red', 'yellow'];
}

Grid2DArtist.prototype.draw = function(grid) {
  var cellHeight = this.height / grid.rowCount(),
      cellWidth  = this.width / grid.colCount();

  // Draw the grid
 grid.loop(function(x, y, cell, yPx) {
    var xPx = x * cellWidth;
    this.ctx.fillStyle = this.colors[cell];
    this.ctx.fillRect(xPx, yPx, cellWidth, cellHeight);
    this.ctx.strokeRect(xPx, yPx, cellWidth, cellHeight);

    return true;
  }.bind(this), function(y) {
    return y * cellHeight;
  });
};
