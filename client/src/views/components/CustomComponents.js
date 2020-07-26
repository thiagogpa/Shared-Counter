import React from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

function ModalCustom({
  willShow,
  type,
  title,
  content,
  confirmationButtonText,
  showCancelButton,
  handleClose,
  cancelButtonText,  
  handleConfirmationClick,
  handleCancelClick,
}) {
  const cancelButton = (
    showCancelButton,
    cancelButtonText,
    handleCancelClick
  ) => {
    return showCancelButton === true ? (
      <div>
        <CButton color="secondary" onClick={handleCancelClick}>
          {cancelButtonText}
        </CButton>
      </div>
    ) : null;
  };

  return (
    <div>
      <CModal show={willShow} onClose={handleClose} color={type}>
        <CModalHeader closeButton>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{content}</CModalBody>
        <CModalFooter>
          <CButton color={type} onClick={handleConfirmationClick}>
            {confirmationButtonText}
          </CButton>

          {cancelButton(
            showCancelButton,
            cancelButtonText,
            handleCancelClick
          )}
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default ModalCustom;
