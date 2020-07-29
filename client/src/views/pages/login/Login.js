import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { Form, Col } from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";

import ModalCustom from "../../components/CustomComponents";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hasError: false,
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    let axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post("/api/authenticate", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("200");
          console.log(res);
          this.props.history.push("/");
        } else {
          console.log(res);
          console.log("other");
          this.setState({ hasError: true });
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({ hasError: true });
      });

    
  };

  validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <ModalCustom
          willShow={this.state.hasError}
          type="danger"
          title="Incorrect username/password"
          content="It was not possible to authenticate you, please check your username and password and try again"
          confirmationButtonText="OK"
          showCancelButton={false}
          cancelButtonText={null}
          handleClose={() =>
            this.setState({
              hasError: false,
            })
          }
          handleConfirmationClick={() =>
            this.setState({
              hasError: false,
            })
          }
          handleCancelClick={() => {
            return null;
          }}
        />

        <Formik
          validationSchema={this.validationSchema}
          onSubmit={() => this.handleSubmit()}
          initialValues={{
            username: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <CContainer>
              <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
                <CRow className="justify-content-center">
                  <CCol md="8">
                    <CCardGroup>
                      <CCard className="p-4">
                        <CCardBody>
                          <CForm>
                            <h1>Login</h1>
                            <p className="text-muted">
                              Sign In to your account
                            </p>

                            <Form.Group controlId="validationFormik01">
                              <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    <CIcon name="cil-user" />
                                  </CInputGroupText>
                                </CInputGroupPrepend>

                                <Form.Control
                                  type="username"
                                  name="username"
                                  placeholder="Enter username"
                                  value={this.state.username}
                                  onChange={this.handleChange}
                                  isInvalid={
                                    !!errors.username && touched.username
                                  }
                                />

                                <Form.Control.Feedback type="invalid">
                                  {errors.username}
                                </Form.Control.Feedback>
                              </CInputGroup>
                            </Form.Group>

                            <Form.Group controlId="validationFormik02">
                              <CInputGroup className="mb-4">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    <CIcon name="cil-lock-locked" />
                                  </CInputGroupText>
                                </CInputGroupPrepend>

                                <Form.Control
                                  type="password"
                                  name="password"
                                  placeholder="*********"
                                  value={this.state.password}
                                  onChange={this.handleChange}
                                  isInvalid={
                                    !!errors.password && touched.password
                                  }
                                />

                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </CInputGroup>
                            </Form.Group>

                            <CRow>
                              <CCol xs="6">
                                <CButton
                                  color="primary"
                                  className="px-4"
                                  type="submit"
                                >
                                  Login
                                </CButton>
                              </CCol>
                              <CCol xs="6" className="text-right">
                                <CButton color="link" className="px-0">
                                  Forgot password?
                                </CButton>
                              </CCol>
                            </CRow>
                          </CForm>
                        </CCardBody>
                      </CCard>
                      <CCard
                        className="text-white bg-primary py-5 d-md-down-none"
                        style={{ width: "44%" }}
                      >
                        <CCardBody className="text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua.
                            </p>
                            <Link to="/register">
                              <CButton
                                color="primary"
                                className="mt-3"
                                active
                                tabIndex={-1}
                              >
                                Register Now!
                              </CButton>
                            </Link>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </Form>
            </CContainer>
          )}
        </Formik>
      </div>
    );
  }
}
