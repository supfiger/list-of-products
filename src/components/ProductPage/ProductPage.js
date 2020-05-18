import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { getReviews } from "../../api.js";
import { ReviewModal, Review } from "../index";
import "./ProductPage.sass";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewList: [],
      error: false,
      showReviewModal: false,
    };
  }

  componentDidMount() {
    this.fetchGetReviews();
  }

  fetchGetReviews = async () => {
    if (!this.props.location.state) {
      return <Redirect to="/list-of-products/" />;
    }

    const { product } = this.props.location.state;

    try {
      const result = await getReviews(product.id);
      this.setState({
        reviewList: result.reverse(),
      });
    } catch (error) {
      this.setState({
        error: error,
      });
    }
  };

  toggleReviewModal = () => {
    this.setState((prevState) => ({
      showReviewModal: !prevState.showReviewModal,
    }));
  };

  postReview = async () => {
    const { product } = this.props.location.state;

    try {
      const result = await getReviews(product.id, this.props.token);
      this.setState({
        reviewList: result.reverse(),
      });
    } catch (error) {
      this.setState({
        error: error,
      });
    }
    this.toggleReviewModal();
  };

  renderReviews = () => {
    const { reviewList } = this.state;

    return (
      <div className="reviewsWrap">
        <div className="commnetsTopGroup">
          <h3>Отзывы</h3>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.toggleReviewModal}
          >
            Написать отзыв
          </button>
        </div>
        <ul className="reviewsGroupList">
          {reviewList.length > 0 ? (
            reviewList.map((item) => <Review key={item.id} reviewItem={item} />)
          ) : (
            <li className="productMessage">There are no reviews here.</li>
          )}
        </ul>
      </div>
    );
  };

  renderProductInfo = () => {
    const { product } = this.props.location.state;

    return (
      <div className="productTopBlock">
        <img
          className=""
          src={`https://smktesting.herokuapp.com/static/${product.img}`}
          alt=""
        />
        <h2 className="productTitle">{product.title}</h2>
        <div className="productText">{product.text}</div>
      </div>
    );
  };

  render() {
    if (!this.props.location.state) {
      return <Redirect to="/list-of-products/" />;
    }

    const {
      props: {
        isAuth,
        token,
        location: {
          state: { product },
        },
      },
      state: { showReviewModal },
    } = this;

    return (
      <div className="container">
        {this.renderProductInfo()}
        {this.renderReviews()}
        <ReviewModal
          show={showReviewModal}
          onClose={this.toggleReviewModal}
          postReview={this.postReview}
          product={product}
          isAuth={isAuth}
          token={token}
        />
      </div>
    );
  }
}
