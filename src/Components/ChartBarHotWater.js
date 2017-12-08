// =====================================
//  Component Chart Water Bar
// =====================================
import React, { Component } from "react";
import "./css/chart_bar.css";

class ChartBarHotWater extends Component {
  static defaultProps = {
    opacity: 1,
    options: {
      min: 20,
      max: 100
    }
  };

  render() {
    let item = this.props.item;
    let startDay = item.time === "00:00";

    // debug value --------
    // item.tHotMax = 50;
    // item.tHotAvg = 39.9;
    // item.tHotMin = 30;
    //---------------------

    let delta = this.props.options.max - this.props.options.min;
    let max_water_height = Math.floor(
      ((item.tHotMax || 0) - this.props.options.min) / delta * 100
    );
    let avg_water_height = Math.floor(
      ((item.tHotAvg || 0) - this.props.options.min) / delta * 100
    );
    let min_water_height = Math.floor(
      ((item.tHotMin || 0) - this.props.options.min) / delta * 100
    );
    let _style = "marker_avg" + (item.tHotAvg < 40 ? " " : " red");
    let _class = this.props.hide ? "chart_bar hide" : "chart_bar";
    return (
      <span id={this.props.id} className={_class}>
        <div
          className="chart_max"
          style={{
            height: max_water_height + "%"
          }}
        />
        {avg_water_height > 0 ? (
          <div
            className={_style}
            style={{ top: 100 - avg_water_height + "%" }}
          />
        ) : null}

        {avg_water_height > 0 ? (
          <div
            className="marker_min"
            style={{ top: 100 - min_water_height + "%" }}
          />
        ) : null}
        <div
          className="chart_label"
          style={{
            color: startDay ? "#b0bec5" : null,
            opacity: item.time[3] === "0" ? 1 : 0.75
          }}
        >
          {startDay ? item.date : item.time}
        </div>
      </span>
    );
  }
}
export default ChartBarHotWater;
