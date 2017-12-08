// =====================================
//  Component Chart Water Bar
// =====================================
import React, { Component } from "react";
import "./css/grid_label.css";

class GridLabel extends Component {
  // static propTypes = {
  //   value: PropTypes.string
  // };

  render() {
    return (
      <div className="chart-grid-hr">
        <span
          className="grid-label"
          style={{
            color: this.props.color
          }}
        >
          {this.props.name}
        </span>

        <span
          className="grid-label"
          style={{
            color: this.props.color
          }}
        >
          {this.props.name}
        </span>
      </div>
    );
  }
}

export default GridLabel;
