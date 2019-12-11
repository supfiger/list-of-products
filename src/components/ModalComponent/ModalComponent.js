import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ModalWindow from "simple-react-modal";
import cn from "classnames";

import "./ModalComponent.sass";

export default class ModalComponent extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    className: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  };

  render() {
    const {
      props: { className, onClose, show, children }
    } = this;

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
  }
}
