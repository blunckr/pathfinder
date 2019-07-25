import React from 'react';
import maze from './maze';
import './App.scss';

function App() {
  return (
    <table id="maze">
      <tbody>
        {maze.map((row, y) =>
          <tr key={y}>
            {row.map((column, x) =>
              <td key={x} className={column === 1 ? "filled" : "empty"}></td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default App;
