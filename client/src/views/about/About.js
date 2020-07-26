import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CJumbotron,
  CRow,
  CEmbed,
  CEmbedItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

const Jumbotrons = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>About</CCardHeader>
            <CCardBody>
              <CJumbotron className="border">
                <h1 className="display-1">Hello, world!</h1>
                <p className="lead">
                  Hey ! My name is Thiago Andrade and this is a real time counter, created so that multiple users can share a
                  live counter among themselves, developed using React, NodeJS, Socket.io and MongoDb.
                </p>
                <hr className="my-2" />
                <p>
                  If would like to take a look at the code you can do so by
                  checking out my github page, there are also some other projects you may enjoy !
                </p>
                <p className="lead">
                  <form action="https://github.com/thiagogpa">
                    <CButton
                      className="btn-github btn-brand mr-1 mb-1"
                      type="submit"
                    >
                      <CIcon name="cib-github" />
                      <span>Github</span>
                    </CButton>
                  </form>
                </p>
              </CJumbotron>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Jumbotrons;
