import React from 'react';
import maze from './maze';
import Pathfinder from './Pathfinder';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    const start = maze[0][0];
    const end = maze[0][8];
    this.pathfinder = new Pathfinder(maze, start, end);
  }

  step = () => {
    this.pathfinder.step();
    this.forceUpdate();
  }

  stepAll = () => {
    this.pathfinder.stepAll();
    this.forceUpdate();
  }

  renderCell(cell) {
    const {x, isWall, isPath, g, h, f} = cell;
    return (
      <td
        key={x}
        className={`${
          this.pathfinder.isCurrent(cell) ? "current" : ""
        } ${
          isWall ? "wall" : ""
        } ${
          isPath ? "path" : ""
        }
        `}
      >
        g: {g} h: {h} f: {f}
      </td>
    );
  }

  render() {
    return (
      <div>
        <table id="maze">
          <tbody>
            {maze.map((row, y) =>
              <tr key={y}>
                {row.map((cell, x) => this.renderCell(cell))}
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={this.step}>step</button>
        <button onClick={this.stepAll}>step all</button>
      </div>
    );
  }
}

export default App;
