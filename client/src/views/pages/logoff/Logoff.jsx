import React, { Component } from "react";
import axios from "axios";

import cookie from "react-cookies";

export default class Logoff extends Component {
  constructor(props) {
    super(props);

    let axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post('/api/logoff')
      .then((res) => {
        if (res.status === 200) {
          console.log("200");
          console.log(res);
          this.props.history.push("/");
        } else {
          console.log(res);
          console.log("other");
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging OFF please try again");
      });
  }

  render() {
    return null;
  }
}
