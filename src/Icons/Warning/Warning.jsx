import './warning.scss';
import React from 'react';

export const Warning = ({ text }) => {
  return (
    <div className="wrapper">
      <div class="f-modal-alert">
        <div class="f-modal-icon f-modal-warning scaleWarning">
          <span class="f-modal-body pulseWarningIns"></span>
          <span class="f-modal-dot pulseWarningIns"></span>
        </div>
      </div>
      <div>{text}</div>
    </div>
  );
};
