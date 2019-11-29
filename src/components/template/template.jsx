import React, { Component } from "react";
import Navigation from "../pages/Navigation";

export default class Template extends Component {
  render() {
    return <Navigation {...this.props} />;
  }
}
