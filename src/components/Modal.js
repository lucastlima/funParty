import React from "react";
import ReactDOM from "react-dom";
import { StyledBackdrop, StyledContent } from "../style/styledComponents";
const rootModal = document.getElementById("modal");

const Modal = ({ children, handleClose, openState }) => {
  const stopProp = e => {
    e.stopPropagation();
  };
  return ReactDOM.createPortal(
    <StyledBackdrop openState={openState} onClick={handleClose}>
      <StyledContent onClick={stopProp}>{children}</StyledContent>
    </StyledBackdrop>,
    rootModal
  );
};

export default Modal;
