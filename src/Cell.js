class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  get f() {
    const f = this.g + this.h;
    if (isNaN(f)) return null;
    return f;
  }

  get isWall() {
    return this.type === 'wall';
  }
}

export default Cell;
