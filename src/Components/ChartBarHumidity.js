// =====================================
//  Component Chart Humidity Bar
// =====================================
import React, { Component } from "react";
import "./css/chart_bar.css";

var classNames = require("classnames");

class ChartBarHumidity extends Component {
  static defaultProps = {
    options: {
      min: 20,
      max: 100
    }
  };
  render() {
    let item = this.props.item;
    // debug value --------
    // item.humidityMax = 100;
    // item.humidityMin = 60;
    // --------------------

    let delta = this.props.options.max - this.props.options.min;
    let max_humidity_height =
      ((item.humidityMax || 0) - this.props.options.min) / delta * 100;
    let min_humidity_height =
      ((item.humidityMin || 0) - this.props.options.min) / delta * 100;
    let classes = classNames("marker_fan", {
      last: this.props.id === "last"
    });
    let _class = this.props.hide ? "chart_bar hide" : "chart_bar";
    return (
      <span id={this.props.id} className={_class}>
        <div
          className="chart_max humidity"
          style={{
            height: max_humidity_height + "%"
          }}
        />

        <div
          className="marker_humidity"
          style={{ top: 100 - min_humidity_height + "%" }}
        />
        {item.fanOn || this.props.id === "last" ? (
          <div className={classes} />
        ) : null}
      </span>
    );
  }
}

export default ChartBarHumidity;
