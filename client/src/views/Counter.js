import React, { Component } from "react";
import { socket } from "./components/global/header";

import FlipNumbers from "react-flip-numbers";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counterNumber: [],
      // this is where we are connecting to with sockets,
    };
  }

  getData = (CounterData) => {
    //console.log(CounterData);
    this.setState({ counterNumber: CounterData });
  };

  changeData = () =>
    socket.emit("initial_data", localStorage.getItem("currentCounterName"));

  componentDidMount() {
    socket.emit("initial_data", localStorage.getItem("currentCounterName"));
    var state_current = this;
    socket.on("get_data", state_current.getData);
    socket.on("change_data", this.changeData);
  }
  componentWillUnmount() {
    socket.off("get_data");
    socket.off("change_data");
  }

  addCounter = (id) => {
    var counterID = id;
    //console.log(counterID);
    socket.emit("addCounter", counterID);
  };

  subtractCounter = (id) => {
    if (this.state.counterNumber.counter > 0) {
      var counterID = id;
      //console.log(counterID);
      socket.emit("subtractCounter", counterID);
    }
  };

  // To get the initial data
  getFoodData() {
    return (
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
            <button
              onClick={() =>
                this.subtractCounter(localStorage.getItem("currentCounterName"))
              }
            >
              -
            </button>

            <button
              onClick={() =>
                this.addCounter(localStorage.getItem("currentCounterName"))
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.getFoodData()}</div>;
  }
}
export default Counter;
