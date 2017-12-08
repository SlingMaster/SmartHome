// =====================================
//  Component Chart
// =====================================

import React, { Component } from "react";
import "./css/chart.css";

class Chart extends Component {
  static defaultProps = {
    height: "100%",
    name: "Chart"
  };

  render() {
    return (
      <div className="chart-container" style={{ height: this.props.height }}>
        <div className="bars-container">{this.props.children}</div>
      </div>
    );
  }
}

export default Chart;
