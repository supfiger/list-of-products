import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactStars from "react-stars";

import { postReview } from "../../api.js";
import { ModalComponent } from "../index";
import "./ReviewModal.sass";

export default class ReviewModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      rate: 0,
      text: "",
      loading: false
    };
  }

  fetchPostReview = async () => {
    this.setState({
      loading: true
    });

    try {
      // const result = await postReview({ rate, text }, product.id);
      const { rate, text } = this.state;
      if (rate !== 0 && text !== "") {
        this.props.postReview(rate, text);
      }
      this.setState({
        rate: 0,
        text: ""
      });
    } catch (error) {
      this.setState({
        error: error
      });
    } finally {
      this.setState({
        loading: false
      });
    }
    console.log("reviewItems", this.state.reviewItems);
  };

  onChangeRating = rate => {
    this.setState({
      rate
    });
  };

  onChangeText = e => {
    this.setState({
      text: e.target.value
    });
  };

  render() {
    const {
      props: { show, onClose },
      state: { rate, text }
    } = this;

    // if (!this.props.isAuth) {
    //   return (
    //     <ModalComponent
    //       show={show}
    //       onClose={onClose}
    //       className="reviewModalMessage"
    //     >
    //       <h4>Войдите, чтобы написать отзыв.</h4>
    //     </ModalComponent>
    //   );
    // }

    return (
      <ModalComponent show={show} onClose={onClose} className="reviewModalWrap">
        <h4 className="reviewModalTitle">Написать отзыв</h4>
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
        <div className="form-group reviewBlock">
          <div className="reviewModalItem">
            <label htmlFor="reviewArea">Отзыв</label>
            <textarea
              className="form-control reviewText"
              rows="5"
              required
              id="reviewArea"
              maxLength="100"
              value={text}
              onChange={this.onChangeText}
            ></textarea>
          </div>
        </div>
        <div className="reviewBtnWrap">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.fetchPostReview}
          >
            Оставить отзыв
          </button>
        </div>
      </ModalComponent>
    );
  }
}
