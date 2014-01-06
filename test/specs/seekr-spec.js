describe("Seekr", function() {
  var seekr;

  beforeEach(function() {
    var cells = [[0, 0, 0],
                 [0, 0, 0],
                 [2, 1, 3]];
    var grid = new Grid2D(cells);
    var delegate = new SeekrGrid2DDelegate(grid);
    seekr = new Seekr(delegate);
  });

  describe('seek', function() {
    it('returns an array containing the shortest path', function() {
      var path = seekr.seek();
      expect(path).toEqual([{ x : 2, y : 2 },
                            { x : 2, y : 1 },
                            { x : 1, y : 1 },
                            { x : 0, y : 1 },
                            { x : 0, y : 2 }]);
    });
  });

  describe('uid', function() {
    it('returns a JSON stringified version of the node', function() {
      var node = { foo: "bar" };
      expect(seekr.uid(node)).toEqual(JSON.stringify(node));
    });
  });

  describe('openNode', function() {
    it('adds the node to the open nodes list', function() {
      var node = { foo: "bar" };
      expect(seekr.isOpen(node)).toBe(false);
      seekr.openNode(node);
      expect(seekr.isOpen(node)).toBe(true);
    });

    it('removes the node from the closed nodes list', function() {
      var node = { foo: "bar" };
      seekr.closeNode(node);
      expect(seekr.isClosed(node)).toBe(true);
      seekr.openNode(node);
      expect(seekr.isClosed(node)).toBe(false);
    });
  });

  describe('closeNode', function() {
    it('adds the node to the closed nodes list', function() {
      var node = { foo: "bar" };
      expect(seekr.isClosed(node)).toBe(false);
      seekr.closeNode(node);
      expect(seekr.isClosed(node)).toBe(true);
    });

    it('removes the node from the open nodes list', function() {
      var node = { foo: "bar" };
      seekr.openNode(node);
      expect(seekr.isOpen(node)).toBe(true);
      seekr.closeNode(node);
      expect(seekr.isOpen(node)).toBe(false);
    });
  });

  describe('isClosed', function() {
    it('returns true if the node is in the closed list', function() {
      var node = { foo: "bar" };
      expect(seekr.isClosed(node)).toBe(false);
      seekr.closeNode(node);
      expect(seekr.isClosed(node)).toBe(true);
    });
  });

  describe('isOpen', function() {
    it('returns true if the node is in the open list', function() {
      var node = { foo: "bar" };
      seekr.openNode(node);
      expect(seekr.isOpen(node)).toBe(true);
      seekr.closeNode(node);
      expect(seekr.isOpen(node)).toBe(false);
    });
  });

  describe('addParent', function() {
    it("adds the parent as the child's parent", function() {
      var parentNode = { foo: "parent" };
      var childNode  = { foo: "child" };
      expect(seekr.parentOf(childNode)).toBeUndefined();
      seekr.addParent(parentNode, childNode);
      expect(seekr.parentOf(childNode)).toEqual(parentNode);
    });
  });

  describe('parentOf', function() {
    it('returns the parent of the node', function() {
      var parentNode = { foo: "parent" };
      var childNode  = { foo: "child" };
      expect(seekr.parentOf(childNode)).toBeUndefined();
      seekr.addParent(parentNode, childNode);
      expect(seekr.parentOf(childNode)).toEqual(parentNode);
    });
  });

  describe('scoresFor', function() {
    it('returns the scores for the given node', function() {
      var node  = { foo: "bar" },
          score = { g: 2, h: 12, f: 14 };
      seekr.scores[seekr.uid(node)] = score;
      expect(seekr.scoresFor(node)).toEqual(score);
    });

    describe('if there are no scores for the node', function() {
      it('creates and returns a hash with 0 values', function() {
        var node = { foo: "bar" };
        expect(seekr.scoresFor(node)).toEqual({ g: 0, h: 0 });
      });
    });
  });

  describe('closestOpenNode', function() {
    it('returns the open node with the lowest F score', function() {
      var closestNode = { foo: "bar" },
          otherNodeA  = { foo: "barA" },
          otherNodeB  = { foo: "barB" };

      seekr.openNode(closestNode);
      seekr.openNode(otherNodeA);
      seekr.openNode(otherNodeB);

      seekr.scoresFor(otherNodeA).g = 15;
      seekr.scoresFor(otherNodeB).g = 25;
      seekr.scoresFor(closestNode).g = 10;
      expect(seekr.closestOpenNode()).toEqual(closestNode);
    });
  });
});
