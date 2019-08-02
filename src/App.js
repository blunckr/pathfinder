import React from 'react';
import {last} from 'lodash';
import maze from './maze';
import Pathfinder from './Pathfinder';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    const start = maze[0][0];
    const end = last(last(maze));
    this.pathfinder = new Pathfinder(maze, start, end);
  }

  step = () => {
    this.pathfinder.step();
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <table id="maze">
          <tbody>
            {maze.map((row, y) =>
              <tr key={y}>
                {row.map((cell, x) =>
                  <td key={x} className={cell.isCurrent ? "current" : "empty"}>
                    g: {cell.g} h: {cell.h} f: {cell.f}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={this.step}>step</button>
      </div>
    );
  }
}

export default App;
