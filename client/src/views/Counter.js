import React, { Component } from "react";
import { socket } from "./components/global/header";

import FlipNumbers from "react-flip-numbers";

import { CAlert } from "@coreui/react";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counterNumber: [],
      // this is where we are connecting to with sockets,
    };
  }

  getData = (CounterData) => {
    console.log("getData");
    console.log(CounterData);
    this.setState({ counterNumber: CounterData });
  };

  changeData = () => {
    console.log("Changedata");
    socket.emit("initial_data", localStorage.getItem("currentCounterName"));
  };

  componentDidMount() {
    console.log("componentDidMount");

    let localData = localStorage.getItem("currentCounterName");

    if (!localData) {
      console.log("PUSH");
      this.props.history.push(`/`);
    } else {
      var state_current = this;
      socket.on("get_data", state_current.getData);
      socket.on("change_data", this.changeData);

      socket.emit("adduser", localStorage.getItem("currentCounterName"));
      socket.emit("initial_data", localStorage.getItem("currentCounterName"));
    }
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    socket.off("get_data");
    socket.off("change_data");
  }

  addCounter = (id) => {
    console.log("addCounter");
    var counterID = id;
    //console.log(counterID);
    socket.emit("addCounter", counterID);
  };

  subtractCounter = (id) => {
    console.log("subtractCounter");
    if (this.state.counterNumber.counter > 0) {
      var counterID = id;
      //console.log(counterID);
      socket.emit("subtractCounter", counterID);
    }
  };

  // To get the initial data
  getCounterData() {
    console.log("getCounterData");

    let localData = localStorage.getItem("currentCounterName");

    return (
      <div>
        <CAlert color="info" closeButton>
          You are currently using the counter named: {localData}
        </CAlert>
        <div className="app">
          <div>
            <div class="count">
              <FlipNumbers
                play
                color="black"
                width={50}
                height={50}
                numbers={`${this.state.counterNumber.counter}`}
              />
            </div>

            <div class="buttons">
              <button onClick={() => this.subtractCounter(localData)}>-</button>

              <button onClick={() => this.addCounter(localData)}>+</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.getCounterData()}</div>;
  }
}
export default Counter;
