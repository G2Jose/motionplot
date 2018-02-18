import React, { Component } from 'react';
import Plotly from 'plotly.js';

import { createSSE$ } from './utils/sse';
import Plot from './components/Plot';

import './App.css';

class App extends Component {
  state = {
    gyro: null,
    accel: null,
  };
  componentDidMount() {
    this.sse$ = createSSE$();
    this.sse$.subscribe(data => {
      if (data.accel) {
        if (!this.plot)
          this.plot = document.getElementsByClassName('js-plotly-plot')[0];
        const extension = {
          x: [data.accel.map(item => item.x)],
          y: [data.accel.map(item => item.y)],
          z: [data.accel.map(item => item.z)],
        };
        Plotly.extendTraces(this.plot, extension, [0]);
      }
    });
  }

  render() {
    return (
      <Plot
        ref={plot =>
          (this.plot = document.getElementsByClassName('js-plotly-plot')[0])
        }
      />
    );
  }
}

export default App;
