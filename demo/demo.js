window.onload = function() {
  var grid     = new Grid2D([[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                             [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
                             [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
                             [0, 1, 0, 0, 0, 0, 1, 0, 3, 0],
                             [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                             [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                             [0, 1, 2, 1, 0, 1, 0, 0, 0, 0],
                             [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]]),
      artist   = new Grid2DArtist(document.getElementById('main-canvas')),
      delegate = new SeekrGrid2DDelegate(grid),
      seekr    = new Seekr(delegate),
      path     = seekr.seek();

  // Add the path to the grid
  grid.loop(function(x, y, cell) {
    for (var i in path) {
      if (path[i].x == x && path[i].y == y && cell != 3 && cell != 2) {
        grid.cellAt(x, y, 4);
        break;
      }
    }

    return true;
  });

  artist.draw(grid);
}
