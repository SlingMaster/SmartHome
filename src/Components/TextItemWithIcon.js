// =====================================
//  Component TextItemWithIcon
// =====================================
import React, { Component } from "react";
import "./css/text_with_icon.css";
class TextItemWithIcon extends Component {
  static defaultProps = {
    delimiter: " • "
  };
  render() {
    let strVal = isNaN(parseInt(this.props.val, 10))
      ? " "
      : parseFloat(this.props.val).toFixed(1);
    return (
      <div className={this.props.className}>
        {this.props.label}{this.props.delimiter}<span>{strVal}</span>
        {this.props.unit}
      </div>
    );
  }
}
export default TextItemWithIcon;
