SeekrJS
========
SeekrJS is a flexible pathfinding engine written in Javascript.

Overview
---------
The pathfinding engine is completely decoupled from the underlying node data structure. So it works equally well with graphs and grids for example.

Basic usage
-------------
```javascript
seekr = new Seekr(delegate);
path  = seekr.seek();
```

How it works
-------------
The pathfinding is handled by [Seekr](seekr.js).

`Seekr` knows nothing about how your nodes are structures. For that, it relies on the delegate.

Once you initialize `Seekr` with a delegate, simply call `seek()` and it will return an array of nodes representing the shortest path between the start and end nodes.

The delegate defines which nodes are the start and end nodes of the path.

Delegate
---------
When initializing `Seekr` you must provide a delegate.

The delegate can be any object but it must implement the following functions:

```javascript
start() {
    // Return the starting node of the path
    return startNode;
}

end() {
    // Return the ending node of the path
    return endNode;
}

neighbors(node) {
    // Return an array of nodes that are neighbors of the given node
    return neighborNodes;
}

heuristic(nodeA, nodeB) {
    // Return the heuristic cost (a number) for the path from nodeA to nodeB
    return theHeuristic;
}

cost(nodeA, nodeB) {
    // Return the cost (a number) for moving from nodeA to nodeB
    return theCost;
}

equal(nodeA, nodeB) {
    // Return true if nodeA and nodeB are equal, false otherwise
    return areEqual;
}
```

The *node* can be any object, `Seekr` doesn't care what nodes are and how they're represented. That is ultimately the responsability of the delegate.

2D Grid Demo
-------------

The most common use of pathfinding algorithms is with 2D grids.

`Seekr` can easily be used for this puspose.

There are a few included objects to demonstrate this:

* [SeekrGrid2DDelegate](delegates/seekr-grid-2d-delegate.js) : A sample delegate for 2D grids
* [Grid2D](grid2d/grid2d.js) : An object for representing 2D grids
* [Grid2DArtist](grid2d/grid2d-artist.js) : An object for drawing 2D grids

None of these files are required, but they make it easier to demo `Seekr`'s functionality.

Here's an example from [demo.js](demo/demo.js):

```javascript
// Initialize a simple grid
grid = new Grid2D([[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                   [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
                   [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
                   [0, 1, 0, 0, 0, 0, 1, 0, 3, 0],
                   [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                   [0, 1, 2, 1, 0, 1, 0, 0, 0, 0],
                   [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]]);

// Create the artist by feeding it a Canvas object
artist = new Grid2DArtist(document.getElementById('main-canvas'));

// Create the delegate by feeding it the grid
delegate = new SeekrGrid2DDelegate(grid);

// Create the Seekr by feeding it the delegate
seekr = new Seekr(delegate);

// Find the shortest path
path = seekr.seek();

// Optionally update the grid to include the path (for drawing)

// Draw the grid
artist.draw(grid);
```

The bulk of the work is done by `seekr.seek()`. The rest of the code is primarily for setting up and drawing the grid.

Tests
------
SeekrJS comes with a set of Jasmine specs. Each spec can be found under `/test/specs/`.

To run the tests simply open `/test/index.html`.
