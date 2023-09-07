import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ message, action }) => {
  return createPortal(
    <div className="text-center  p-2 alert-danger alert" style={{ marginTop: `${window.scrollY}px` }} >
      <button className="close" data-dismiss='alert'>
        <span>&times;</span>
      </button>
      <p className="mb-0"> {message}</p>
      <div className="row justify-content-center mt-2">{action}</div>
    </div >,
    document.querySelector("#modal")
  );
};

export default Modal;
