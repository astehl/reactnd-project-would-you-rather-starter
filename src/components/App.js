import React, {Component} from "react";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
        <div>App</div>
    );
  }
}

export default connect()(App);
