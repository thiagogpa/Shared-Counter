import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./header.css";

// The Header creates links that can be used to navigate
// between routes.
var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: process.env.REACT_APP_BACKEND, // Update 3001 with port on which backend-my-app/server.js is running.
    };

    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (<></>);
  }
}

export { Header, socket };
