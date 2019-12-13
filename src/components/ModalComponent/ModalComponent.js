import React from "react";
import ModalWindow from "simple-react-modal";
import cn from "classnames";

import "./ModalComponent.sass";

const ModalComponent = props => {
  const { className, onClose, show, children } = props;

  const componentStyles = cn({ modal: true }, { [className]: true });

  return (
    <ModalWindow
      className={componentStyles}
      show={show}
      onClose={onClose}
      transitionSpeed={300}
      closeOnOuterClick={false}
    >
      <div className="modalCloseWrap" onClick={onClose}>
        x
      </div>
      <div className="contentWrap">{children}</div>
    </ModalWindow>
  );
};

export default ModalComponent;
