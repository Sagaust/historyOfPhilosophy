"use client";

import React, { useEffect } from "react";
import ReactModal from "react-modal";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Visualization Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <button onClick={onClose} className="close-button">
        Close
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
