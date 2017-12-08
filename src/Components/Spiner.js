// =====================================
//  Component Chart
// =====================================
import React, { Component } from "react";
import "./css/spiner.css";

class Spiner extends Component {
  render() {
    return (
      this.props.loading && (
        <div className="spinner_box">
          <div className="spinner run-animation" />
        </div>
      )
    );
  }
}
export default Spiner;
