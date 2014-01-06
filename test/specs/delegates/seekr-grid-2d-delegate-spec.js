describe("SeekrGrid2DDelegate", function() {
  var delegate;

  beforeEach(function() {
    var cells = [[0, 0, 0],
                 [0, 1, 3],
                 [2, 0, 0]];
    var grid = new Grid2D(cells);
    delegate = new SeekrGrid2DDelegate(grid);
  });

  describe('isAccessible', function() {
    describe('when the destination is out of bounds', function() {
      it('returns false', function() {
        expect(delegate.isAccessible(0, 0, -1, 0)).toBe(false);
      });
    });

    describe('when moving diagonally towards a blocked cell', function() {
      it('returns false', function() {
        expect(delegate.isAccessible(0, 1, 1, 0)).toBe(false);
        expect(delegate.isAccessible(1, 0, 0, 1)).toBe(false);
      });
    });

    describe('when the destination is a blocked cell', function() {
      it('returns false', function() {
        expect(delegate.isAccessible(0, 0, 1, 1)).toBe(false);
      });
    });

    describe('when the destination is an empty cell', function() {
      it('returns true', function() {
        expect(delegate.isAccessible(0, 0, 0, 1)).toBe(true);
      });
    });
  });

  describe('start', function() {
    it('returns the start node', function() {
      var start = delegate.start();
      expect(start.x).toEqual(0);
      expect(start.y).toEqual(2);
    });
  });

  describe('end', function() {
    it('returns the end node', function() {
      var end = delegate.end();
      expect(end.x).toEqual(2);
      expect(end.y).toEqual(1);
    });
  });

  describe('neighbors', function() {
    it('returns the neighboring accessible cells', function() {
      expect(delegate.neighbors({ x: 0, y: 0 })).toEqual([{ x: 1, y: 0 }, { x: 0, y: 1 }]);
    });
  });

  describe('heuristic', function() {
    it('returns the manhattan heuristic', function() {
      var start = { x: 0, y: 0 };
      var end = { x: 2, y: 3 };
      expect(delegate.heuristic(start, end)).toEqual(5 * delegate.ORTHOGONAL_COST);
    });
  });

  describe('cost', function() {
    describe('when the movement is diagonal', function() {
      it('returns the diagonal cost', function() {
        var nodeA = { x: 0, y: 0 };
        var nodeB = { x: 1, y: 1 };
        expect(delegate.cost(nodeA, nodeB)).toEqual(delegate.DIAGONAL_COST);
      });
    });

    describe('when the movement is orthogonal', function() {
      it('returns the orthogonal cost', function() {
        var nodeA = { x: 0, y: 0 };
        var nodeB = { x: 0, y: 1 };
        expect(delegate.cost(nodeA, nodeB)).toEqual(delegate.ORTHOGONAL_COST);
      });
    });
  });

  describe('equal', function() {
    describe('when the two nodes are equal', function() {
      it('returns true', function() {
        var nodeA = { x: 1, y: 2 };
        var nodeB = { x: 1, y: 2 };
        expect(delegate.equal(nodeA, nodeB)).toBe(true);
      });
    });

    describe('when the two nodes are not equal', function() {
      it('returns false', function() {
        var nodeA = { x: 1, y: 2 };
        var nodeB = { x: 2, y: 4 };
        expect(delegate.equal(nodeA, nodeB)).toBe(false);
      });
    });
  });
});
