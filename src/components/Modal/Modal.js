import React from "react";
import "./Modal.css";

const Modal = ({ setIsOpen, text, handleOnClick, children }) => {
  return (
    <div className="modal">
      <div className="content-modal">
        <div className="header-modal">
          <h2>{text}</h2>
          <button className="btn-dismiss" onClick={() => setIsOpen(false)}>
            x
          </button>
        </div>
        {children}
        <div className="footer-modal">
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleOnClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
