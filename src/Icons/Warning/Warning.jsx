import "./warning.scss";
import React from "react";

export const Warning = ({ text }) => {
  return (
    <div className="wrapper">
      <div className="f-modal-alert">
        <div className="f-modal-icon f-modal-warning scaleWarning">
          <span className="f-modal-body pulseWarningIns"></span>
          <span className="f-modal-dot pulseWarningIns"></span>
        </div>
      </div>
      <div>{text}</div>
    </div>
  );
};
