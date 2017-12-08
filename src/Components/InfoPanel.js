// =====================================
//  Component Info Panel
// =====================================
import React, { Component } from "react";
import "./css/info_item.css";
import TextItemWithIcon from "./TextItemWithIcon";
class InfoPanel extends Component {
  // componentWillUnmount() {
  //   console.log("[IP] componentWillUnmount");
  // }

  // componentWillReceiveProps() {
  //   console.info("[IP] componentWillReceiveProps");
  // }

  // // ------------------------------
  // componentDidMount() {
  //   console.log("[IP] componentDidMount ");
  // }

  render() {
    let infoData = this.props.lastData;
    // console.warn("\n>>>>>[IP] render", JSON.stringify(infoData));
    return (
      <div>
        <div className="box_info">
          <div className="App-icon" />
          <div className={"item"}>
            <TextItemWithIcon
              className={`text-with-icon title_color`}
              label={"• Hot Water Statistic •"}
              delimiter=" "
            />
            <br />
            <TextItemWithIcon
              className={`text-with-icon t_min`}
              label={"Min"}
              val={infoData.tHotWaterPerDayMin}
              unit={"°C"}
            />
            <TextItemWithIcon
              className={`text-with-icon t_avg`}
              label={"Avg"}
              val={infoData.tHotWaterPerDayAvg}
              unit={"°C"}
            />
            <TextItemWithIcon
              className={`text-with-icon  temperature`}
              label={"Max"}
              val={infoData.tHotWaterPerDayMax}
              unit={"°C"}
            />
          </div>
          <div className={"item"}>
            <TextItemWithIcon
              className={`text-with-icon sym_time`}
              label={"Duration"}
            />
            <TextItemWithIcon
              className={`text-with-icon temperature`}
              label={"> 40°C"}
              val={infoData.vals40}
              unit={"%"}
            />
            <TextItemWithIcon
              className={`text-with-icon temperature`}
              label={"> 45°C"}
              val={infoData.vals45}
              unit={"%"}
            />
          </div>
        </div>
        <div className={"copyright"}>©2017 JENERAL SAMOPAL COMPANY</div>
      </div>
    );
  }
}
export default InfoPanel;
