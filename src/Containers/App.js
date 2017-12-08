import React, { Component } from "react";

// import ReactDOM from "react-dom";
// import Flexbox from "flexbox-react";
// import { Switch, Router, Route } from 'react-router-dom';
// import { connect } from "react-redux";
// import createBrowserHistory from "history/createBrowserHistory";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import css --------------------------------
import "./css/App.css";
import Main from "./Main";
//const history = createBrowserHistory();
var classNames = require("classnames");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    // console.info("componentDidMount");
    setTimeout(() => {
      this.setState({
        show: true
      });
    }, 250);
  }

  // componentWillReceiveProps() {
  //   console.info("componentWillReceiveProps");
  // }

  // =====================================
  render() {
    // console.info("render App");
    var classes = classNames("App css-opacity", {
      "css-fade": this.state.show
    });
    return (
      <div className={classes}>
        <div className={`box-midle title`}>bathroom statistic per day</div>
        <Main />
      </div>
    );
  }
}

// =====================================
// route
// =====================================
//   render() {
//     console.info("render App");
//     return (
//       <div className="App">
//         <div className={`box-midle title`}>bathroom statistic per day</div>
//         <div>
//           <Router>
//             <div>
//               <Switch>

//                 <Route exact path="/:chart" component={Main} />
//               </Switch>

//               <div className={"box-button"}>
//                 <Link to="/m5">
//                   <button className={`button-icon sym-m4`} />
//                 </Link>
//                 <Link to="/m10">
//                   <button className={`button-icon sym-m15`} />
//                 </Link>
//                 <Link to="/m30">
//                   <button className={`button-icon sym-m30`} />
//                 </Link>
//               </div>
//             </div>
//           </Router>
//         </div>
//       </div>
//     );
//   }
// }

// <main>
//   {this.props.children}
// </main>
// MAP STATE ------------------------
// function mapStateToProps(state) {
//   return {
//     title: state.appInfo.title,
//     user: state.appInfo.user,
//     show_form: state.appInfo.show_form,
//     year: state.appInfo.year
//   }
// }
// // ---------------------------------
// function mapDispatchToProps(dispatch) {
//   console.info("mapDispatchToProps | dispatch:", dispatch);
//   return {
//     //     setYearFunction: year => {
//     //         dispatch(setYearAction(year))
//     //         console.info("mapDispatchToProps | setYearFunction:", year)
//     //     },
//     actionSendRequest: id => {
//       dispatch(actionSendRequest(id))
//       console.info("mapDispatchToProps | showFormAction:", id)
//     },
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
