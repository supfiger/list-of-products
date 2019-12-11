import React, { Component } from "react";

import { getReviews } from "../../api.js";
import { ReviewModal, Review } from "../index";
import "./ProductPage.sass";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    this.product = location.state.product;

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
    const getList = JSON.parse(localStorage.getItem("myReviewList")).reverse();
    console.log("getList", getList);
    this.setState({
      myReviewList: getList
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      "myReviewList",
      JSON.stringify(this.state.myReviewList)
    );
  }

  fetchGetReviews = async () => {
    this.setState({
      loading: true
    });

    try {
      const result = await getReviews(this.product.id);
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

  postReview = (rate, text) => {
    const newItem = {
      created_by: {
        username: this.props.username
      },
      id: 1 + Math.random(),
      rate,
      text
    };
    const list = [...this.state.myReviewList];
    list.push(newItem);

    this.setState({
      myReviewList: list
    });
    this.toggleReviewModal();
  };

  renderReviews = () => {
    const { reviewList, myReviewList } = this.state;

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
          {myReviewList.length > 0 &&
            myReviewList
              .reverse()
              .map(item => <Review key={item.id} reviewItem={item} />)}
          {reviewList.length > 0 ? (
            reviewList.map(item => <Review key={item.id} reviewItem={item} />)
          ) : (
            <li className="productMessage">There are no reviews here.</li>
          )}
        </ul>
      </div>
    );
  };

  renderProductInfo = () => {
    const product = this.product;

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
      state: { showReviewModal },
      props: { isAuth }
    } = this;

    return (
      <div className="container">
        {this.renderProductInfo()}
        {this.renderReviews()}
        <ReviewModal
          show={showReviewModal}
          onClose={this.toggleReviewModal}
          postReview={this.postReview}
          product={this.product}
          isAuth={isAuth}
        />
      </div>
    );
  }
}
