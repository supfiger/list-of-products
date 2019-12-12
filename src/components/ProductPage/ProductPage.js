import React, { Component } from "react";

import { getReviews } from "../../api.js";
import { ReviewModal, Review } from "../index";
import "./ProductPage.sass";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewList: [],
      myReviewList: [],
      loading: false,
      error: false,
      showReviewModal: false
    };
  }

  componentDidMount() {
    this.fetchGetReviews();
  }

  fetchGetReviews = async () => {
    const { product } = this.props.location.state;

    this.setState({
      loading: true
    });
    try {
      const result = await getReviews(product.id, this.props.token);
      this.setState({
        reviewList: result
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
    console.log("reviewList", this.state.reviewList);
  };

  toggleReviewModal = () => {
    this.setState(prevState => ({
      showReviewModal: !prevState.showReviewModal
    }));
  };

  postReview = async () => {
    const { product } = this.props.location.state;

    try {
      const result = await getReviews(product.id, this.props.token);
      this.setState({
        reviewList: result
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
            reviewList
              .reverse()
              .map(item => <Review key={item.id} reviewItem={item} />)
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
          src={`http://smktesting.herokuapp.com/static/${product.img}`}
          alt=""
        />
        <h2 className="productTitle">{product.title}</h2>
        <div className="productText">{product.text}</div>
      </div>
    );
  };

  render() {
    const {
      props: {
        isAuth,
        token,
        location: {
          state: { product }
        }
      },
      state: { showReviewModal }
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
