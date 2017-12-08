// =====================================
//  Component Chart
// =====================================

import React, { Component } from "react";
import "./css/chart_grid.css";
import GridLabel from "./GridLabel";

class ChartGrid extends Component {
  static defaultProps = {
    height: "100%",
    options: {
      min: 0,
      max: 100,
      pickup: 50,
      step: 25,
      unit: "°C"
    }
  };

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="chart-grid" style={{ height: this.props.height }}>
        {this.createGrid(this.props.options)}
      </div>
    );
  }

  createGrid(options) {
    var content = [];
    // console.info("---------- createGrid | options", options);
    for (var i = options.max; i >= options.min; i = i - options.step) {
      let _name = i + options.unit;
      let _color = i === options.pickup ? "#903" : null;
      content.push(<GridLabel key={"label" + i} name={_name} color={_color} />);
    }
    return content;
  }
}

export default ChartGrid;
