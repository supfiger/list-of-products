import React, { Component } from "react";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

import { postReview } from "../../api.js";
import { ModalComponent } from "../index";
import "./ReviewModal.sass";

export default class ReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 0,
      text: "",
      error: false,
      rateError: "",
      textError: ""
    };
  }

  fetchPostReview = async () => {
    try {
      const { rate, text } = this.state;
      const isValid = this.validate();

      if (isValid) {
        const result = await postReview(
          { rate, text },
          this.props.product.id,
          this.props.token
        );
        this.props.postReview(result);
        this.setState({
          rate: 0,
          text: "",
          rateError: "",
          textError: ""
        });
      }
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  onChangeRating = rate => {
    this.setState({
      rate
    });
  };

  onChangeText = e => {
    let val = e.target.value;
    val.trim();

    this.setState({
      text: val
    });
  };

  validate = () => {
    const { rate, text } = this.state;
    let rateError = "";
    let textError = "";

    if (rate == 0) {
      rateError = "Вы должны поставить рейтинг";
    }
    if (!text || /^\s+$/.test(text)) {
      textError = "Вы должны заполнить это поле";
    }

    if (rateError || textError) {
      this.setState({
        rateError,
        textError
      });
      return false;
    }

    return true;
  };

  render() {
    const {
      props: { show, onClose },
      state: { rate, text, error, rateError, textError }
    } = this;

    if (!this.props.isAuth) {
      return (
        <ModalComponent
          show={show}
          onClose={onClose}
          className="reviewModalMessage"
        >
          <h4>Войдите, чтобы написать отзыв.</h4>
          <Link className="btn btn-primary modalButton" to="/login">
            Вход
          </Link>
        </ModalComponent>
      );
    }

    return (
      <ModalComponent show={show} onClose={onClose} className="reviewModalWrap">
        <h4 className="reviewModalTitle">Написать отзыв</h4>
        <div className="rateBlock">
          <ReactStars
            value={rate}
            count={5}
            size={60}
            color2={"#ff8d00"}
            edit={true}
            className="setReviewRating"
            half={false}
            onChange={this.onChangeRating}
          />
          {rateError && <div className="warningMessage">{rateError}</div>}
        </div>
        <div className="reviewBlock">
          <label htmlFor="reviewArea">Отзыв</label>
          <textarea
            className="form-control reviewModalText"
            rows="5"
            required
            id="reviewArea"
            maxLength="90"
            value={text}
            onChange={this.onChangeText}
          ></textarea>
          {textError && <div className="warningMessage">{textError}</div>}
        </div>
        <div className="reviewBtnWrap">
          <button
            className="btn btn-primary modalButton"
            type="button"
            onClick={this.fetchPostReview}
          >
            Оставить отзыв
          </button>
        </div>
        {error && <div className="errorMessage">{error}</div>}
      </ModalComponent>
    );
  }
}
