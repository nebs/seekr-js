function refresh(grid, seekr, artist) {
  var path = seekr.seek();

  grid.loop(function(x, y, cell) {
    if (cell == 4) {
      grid.cellAt(x, y, 0);
    }
    return true;
  });

  grid.loop(function(x, y, cell) {
    for (var i in path) {
      if (path[i].x == x && path[i].y == y && cell != 3 && cell != 2) {
        grid.cellAt(x, y, 4);
        break;
      }
    }
    return true;
  });

  artist.draw();
}

window.onload = function() {
  var grid     = new Grid2D([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
                             [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                             [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]),
      canvas   = document.getElementById('main-canvas'),
      artist   = new Grid2DArtist(grid, canvas),
      delegate = new SeekrGrid2DDelegate(grid),
      seekr    = new Seekr(delegate);

  refresh(grid, seekr, artist);

  artist.onClick = function(x, y) {
    var cell = grid.cellAt(x, y);
    if (cell == 1) {
      grid.cellAt(x, y, 0);
    } else if (cell == 0 || cell == 4) {
      grid.cellAt(x, y, 1);
    }

    refresh(grid, seekr, artist);
  }
}
