describe("Grid2D", function() {
  var grid,
      numRows,
      numColumns;

  beforeEach(function() {
    numRows = 4;
    numColumns = 3;

    var cells = [];
    for (var r = 0; r < numRows; r++) {
      var rowCells = [];
      for (var c = 0; c < numColumns; c++) {
        rowCells.push(r * numColumns + c);
      }
      cells.push(rowCells);
    }

    grid = new Grid2D(cells);
  });

  describe('loop', function() {
    it('loops through each cell in the grid', function() {
      grid.loop(function(x, y, cell) {
        expect(cell).toEqual(x + y * grid.colCount());
        return true;
      });
    });

    describe('when returning false', function() {
      it('stops looping', function() {
        var stopValue = numRows * numColumns - numColumns;
        var lastVisitedValue = 0;
        grid.loop(function(x, y, cell) {
          lastVisitedValue = cell;
          return (cell < stopValue);
        });
        expect(lastVisitedValue).toEqual(stopValue);
      });
    });

    describe('when a y processor is provided', function() {
      it('passes the value returned as the last argument to the processor', function() {
        grid.loop(function(x, y, cell, yVal) {
          expect(yVal).toEqual("some_value" + y * 2);
          return true;
        }, function(y) {
          return "some_value" + y * 2;
        });
      });
    });
  });

  describe('coordinatesOfCellWithPredicate', function() {
    it('returns the coordinates of the cell matching the predicate', function() {
      var x = 1,
          y = 2,
          coordinates = grid.coordinatesOfCellWithPredicate(function(cell) {
            return cell == grid.cellAt(x, y);
          });

      expect(coordinates.x).toEqual(x);
      expect(coordinates.y).toEqual(y);
    });

    describe('if the predicate never returns true', function() {
      it('returns undefined', function() {
        var coordinates = grid.coordinatesOfCellWithPredicate(function(cell) {
          return false;
        });

        expect(coordinates).toBeUndefined();
      });
    });
  });

  describe('cellAt', function() {
    it('returns the cell at the given coordinates', function() {
      var x = 2,
          y = 1,
          expectedValue = y * numColumns + x;

      expect(grid.cellAt(x, y)).toEqual(expectedValue);
    });

    describe('when the coordinates are out of bounds', function() {
      it('returns undefined', function() {
        expect(grid.cellAt(-1, 2)).toBeUndefined();
      });
    });

    describe('when a 3rd parameter is set', function() {
      it('sets that value to the cell at the given coordinates', function() {
        var newValue = 42;
        expect(grid.cellAt(1, 2)).not.toEqual(newValue);
        grid.cellAt(1, 2, newValue);
        expect(grid.cellAt(1, 2)).toEqual(newValue);
      });
    });
  });

  describe('isInBounds', function() {
    describe('when the coordinates are in bounds', function() {
      it('return true', function() {
        expect(grid.isInBounds(0, 0)).toBe(true);
        expect(grid.isInBounds(1, 2)).toBe(true);
        expect(grid.isInBounds(numColumns - 1, numRows - 1)).toBe(true);
      });
    });

    describe('when the coordinates are out of bounds', function() {
      it('returns false', function() {
        expect(grid.isInBounds(-1, 0)).toBe(false);
        expect(grid.isInBounds(3, 2)).toBe(false);
        expect(grid.isInBounds(numColumns, numRows)).toBe(false);
        expect(grid.isInBounds(-4, -5)).toBe(false);
      });
    });
  });

  describe('rowCount', function() {
    it('returns the number of rows', function() {
      expect(grid.rowCount()).toEqual(numRows);
    });
  });

  describe('colCount', function() {
    it('returns the number of columns', function() {
      expect(grid.colCount()).toEqual(numColumns);
    });
  });
});
