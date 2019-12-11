import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { getReviews } from "../../api.js";
import { ReviewModal, Review } from "../index";
import "./ProductPage.sass";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewItems: [],
      loading: false,
      error: false,
      showReviewModal: false,
      newReviewData: {},
      isNewReview: false,
      newVal: 2
    };
  }

  componentDidMount() {
    this.fetchGetReviews();
    this.setState({
      newReviewData: JSON.parse(localStorage.getItem("myReviews"))
    });
  }

  async fetchGetReviews() {
    const { location } = this.props;

    const {
      state: { product }
    } = location;

    this.setState({
      loading: true
    });

    try {
      const result = await getReviews(product.id);
      this.setState({
        reviewItems: result
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
  }

  toggleReviewModal = () => {
    this.setState(prevState => ({
      showReviewModal: !prevState.showReviewModal
    }));
  };

  postReview = (rate, text) => {
    const { newReviewData } = this.state;
    let updateReviews = newReviewData;
    updateReviews = {
      created_by: {
        username: this.props.username
      },
      rate,
      text
    };

    this.setState({
      loading: false
    });

    this.setState({
      newReviewData: updateReviews,
      isNewReview: true
    });
    localStorage.setItem("myReviews", JSON.stringify(newReviewData));
    console.log("newReviewData", newReviewData);
    this.toggleReviewModal();
  };

  renderReviews = () => {
    const { reviewItems, newReviewData, isNewReview } = this.state;

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
          {isNewReview && <Review reviewItem={newReviewData} />}
          {reviewItems.length > 0 ? (
            reviewItems.map(item => (
              <Review key={item.id} reviewItem={item} isNewReview={false} />
            ))
          ) : (
            <li className="productMessage">There are no reviews here.</li>
          )}
        </ul>
      </div>
    );
  };

  renderProductInfo = () => {
    const { location } = this.props;
    const { product } = location.state;

    return (
      <div className="productTopBlock">
        <img
          className=""
          src={`http://smktesting.herokuapp.com/static/${product.img}`}
          alt=""
        />
        <h2 className="productTitle">{product.title}</h2>
        <div className="productText">{product.text}</div>
      </div>
    );
  };

  render() {
    const { showReviewModal } = this.state;
    const { location, isAuth } = this.props;
    const { product } = location.state;

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
        />
      </div>
    );
  }
}
