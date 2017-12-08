// =====================================
//  Component Chart
// =====================================
import React, { Component } from "react";
import "./css/main.css";
import $ from "jquery";
import { NormalizeData } from "./../Utils/NormalizeData";
import InfoPanel from "./../Components/InfoPanel";
import Charts from "./../Components/Charts";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: "m5",
      loading: false,
      data: [],
      lastData: {}
    };
  }

  sendReguest(interval) {
    var _url =
      "https://api.thingspeak.com/channels/117345/feeds.json?results=720";
    this.setState({
      interval: interval,
      loading: true
    });

    $.ajax({
      url: _url,
      dataType: "json",
      success: data => {
        var normalizeData = NormalizeData(data.feeds, interval);
        var lastData = normalizeData[normalizeData.length - 1];
        this.setState({
          data: normalizeData,
          lastData: lastData,
          loading: false
        });
        // console.info(
        //   "--------------\nMain componentDidMount | Success | NormalizeData",
        //   this.state
        // );
      }
    });
  }

  // componentWillReceiveProps() {
  //   console.info("Main componentWillReceiveProps");
  // }

  componentDidMount() {
    this.sendReguest(30);
  }

  SetSelect(interval) {
    return this.state.interval === interval ? " select" : "";
  }

  render() {
    // console.info(
    //   "render main",
    //   JSON.stringify(this.state.interval, this.state.lastData)
    // );
    return (
      <div>
        <InfoPanel lastData={this.state.lastData} />
        <Charts
          interval={this.state.interval}
          data={this.state.data}
          lastData={this.state.lastData}
          loading={this.state.loading}
        />
        <div className={"box-button"}>
          <button
            className={`button-icon sym-m5` + this.SetSelect(5)}
            onClick={() => this.sendReguest(5)}
          />
          <button
            className={`button-icon sym-m15` + this.SetSelect(15)}
            onClick={() => this.sendReguest(15)}
          />
          <button
            className={`button-icon sym-m30` + this.SetSelect(30)}
            onClick={() => this.sendReguest(30)}
          />
        </div>
      </div>
    );
  }
}
export default Main;
