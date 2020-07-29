import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CInput,
  CForm,
  CFormGroup,
  CLabel,
  CCardFooter,
  CButton,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Form, Col } from "react-bootstrap";

import ModalCustom from "./components/CustomComponents";

export default function SearchBar() {
  const history = useHistory();

  const [success, setSuccess] = useState(false);

  const [counterName, setCounterName] = useState([]);

  const handleSubmit = (event) => {
    //console.log(event);
    setCounterName(event.counterName.toUpperCase());

    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .get("/api/counter/" + event.counterName.toUpperCase())
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem("currentCounterName", response.data.code);
        history.push(`/counter`);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(!success);
      });
  };

  const handleCreateNewCounter = (event) => {
    let axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post("/api/counter/addCounter", {
        code: counterName,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("currentCounterName", response.data.code);
        history.push(`/counter`);
      });
  };

  const handleChange = (event) => {};

  const validationSchema = Yup.object().shape({
    counterName: Yup.string().required("Counter name is required"),
  });

  return (
    <div>
      <ModalCustom
        willShow={success}
        type="danger"
        title="Counter was not found"
        content="There's no counter with that name, do you want to create a new one ?"
        confirmationButtonText="YES"
        showCancelButton={true}
        cancelButtonText={"NO"}
        handleClose={() => setSuccess(!success)}
        handleConfirmationClick={() => handleCreateNewCounter()}
        handleCancelClick={() => setSuccess(!success)}
      />

      <Formik
        validationSchema={validationSchema}
        onSubmit={(event) => handleSubmit(event)}
        initialValues={{
          counterName: "",
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
          <CCard>
            <Form noValidate onSubmit={handleSubmit}>
              <CCardHeader>Counter Search</CCardHeader>
              <CCardBody>
                <CForm inline id="myForm">
                  <Form.Group controlId="validationFormik01">
                    <Form.Label>Counter name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="My counter"
                      name="counterName"
                      value={values.counterName}
                      onChange={handleChange}
                      isInvalid={!!errors.counterName && touched.counterName}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.counterName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </CForm>
              </CCardBody>

              <CCardFooter>
                <CButton type="submit" size="sm" color="success">
                  <CIcon name="cil-scrubber" /> Search
                </CButton>
              </CCardFooter>
            </Form>
          </CCard>
        )}
      </Formik>
    </div>
  );
}
