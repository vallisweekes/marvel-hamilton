import React from "react";
import "./Modal.css";

const Modal = ({ modalContent: { title, items }, close }) => {
  return (
    <div className="modal">
      <div className="modal_background" onClick={() => close()}></div>
      <div className="modal_content">
        <div className="modal_content_inner">
          <div className="close_modal" onClick={() => close()}>
            <img src="./cancel.png" alt="close" />
          </div>
          <h3>{title}</h3>
          <div className="item_wrapper">
            {items.map((item, index) => (
              <div className="item" key={index}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
