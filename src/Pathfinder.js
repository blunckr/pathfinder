// g(x) cost to reach a node, set when first reached, or set again if lower cost is found
// h(x) estimated time to reach finish from node
// f(x) = g(x) + h(x)

import { minBy, pull, includes } from 'lodash';

class Pathfinder {
  constructor(grid, start, end) {
    this.grid = grid;
    this.start = start;
    this.end = end;

    start.g = 0;
    start.h = this.calculateH(start, end);

    this.open = [start];
    this.closed = [];
  }

  getNeighbors(current) {
    const { x, y } = current;
    const neighbors = [];

    if (y !== this.grid.length - 1) {
      neighbors.push(this.grid[y + 1][x]);
    }
    if (y !== 0) {
      neighbors.push(this.grid[y - 1][x]);
    }
    if (x !== this.grid[0].length - 1) {
      neighbors.push(this.grid[y][x + 1]);
    }
    if (x !== 0) {
      neighbors.push(this.grid[y][x - 1]);
    }
    return neighbors;
  }

  calculateH(node) {
    return Math.abs(node.x - this.end.x) + Math.abs(node.y - this.end.y);
  }

  buildPath(node) {
    const path = [];
    let current = node;
    while (current) {
      current.isPath = true;
      path.unshift(current);
      current = current.parent;
    }
    this.path = path;
  }

  isCurrent(cell) {
    return cell === this.current;
  }

  step() {
    const {closed, end, open} = this;

    const current = minBy(open, cell => cell.f);
    this.current = current;
    if (current === end) {
      this.buildPath(current);
    }
    closed.push(current);
    pull(open, current);
    this.getNeighbors(current).forEach(neighbor => {
      const isClosed = includes(closed, neighbor);
      if (isClosed || neighbor.isWall) return;

      const isOpen = includes(open, neighbor);
      const g = current.g + 1;
      let lowestG = false;
      if (!isOpen) {
        open.push(neighbor);
        lowestG = true;
        neighbor.h = this.calculateH(neighbor, end);
      } else if (g < neighbor.g) {
        lowestG = true;
      }
      if (lowestG) {
        neighbor.parent = current;
        neighbor.g = g;
      }
    });
  }

  stepAll() {
    while(!this.path) {
      this.step();
    }
  }
}

export default Pathfinder;
