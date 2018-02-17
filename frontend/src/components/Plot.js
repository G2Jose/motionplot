import React from 'react';
import Plot from 'react-plotly.js';

export default class _Plot extends React.Component {
  render() {
    return (
      <Plot
        id="plot"
        data={[
          {
            type: 'scatter3d',
            mode: 'lines',
            x: [0],
            y: [0],
            z: [0],
            marker: { color: 'red' },
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: window.innerHeight,
        }}
      />
    );
  }
}
