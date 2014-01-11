function Grid2DArtist(grid, canvas) {
  this.grid       = grid;
  this.canvas     = canvas;
  this.ctx        = canvas.getContext('2d');
  this.width      = canvas.width;
  this.height     = canvas.height;
  this.cellHeight = this.height / this.grid.rowCount(),
  this.cellWidth  = this.width  / this.grid.colCount();
  this.colors     = ['white', 'black', 'blue', 'red', 'yellow'];
  this.canvas.addEventListener('click', this.canvasClicked.bind(this), false);
}

Grid2DArtist.prototype.canvasClicked = function(evt) {
  var xPx = evt.pageX - this.canvas.offsetLeft,
      yPx = evt.pageY - this.canvas.offsetTop,
      x   = Math.floor(xPx / this.cellWidth),
      y   = Math.floor(yPx / this.cellHeight);
  if (this.onClick) {
    this.onClick(x, y);
  }
};

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
