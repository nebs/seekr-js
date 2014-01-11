function Grid2DArtist(grid, canvas) {
  this.grid       = grid;
  this.canvas     = canvas;
  this.ctx        = canvas.getContext('2d');
  this.width      = canvas.width;
  this.height     = canvas.height;
  this.cellHeight = this.height / this.grid.rowCount(),
  this.cellWidth  = this.width  / this.grid.colCount();
  this.colors     = ['white', 'black', 'blue', 'red', 'yellow'];
}

Grid2DArtist.prototype.draw = function() {
  this.grid.loop(function(x, y, cell, yPx) {
    var xPx = x * this.cellWidth;
    this.ctx.fillStyle = this.colors[cell];
    this.ctx.fillRect(xPx, yPx, this.cellWidth, this.cellHeight);
    this.ctx.strokeRect(xPx, yPx, this.cellWidth, this.cellHeight);

    return true;
  }.bind(this), function(y) {
    return y * this.cellHeight;
  }.bind(this));
};
