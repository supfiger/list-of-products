import React from "react";
import ReactStars from "react-stars";
import "./Review.sass";

const Review = props => {
  const { reviewItem } = props;

  return (
    <li className="reviewProductItem">
      <div className="reviewCreator">{reviewItem.created_by.username}</div>
      <div className="reviewContent">
        <ReactStars
          value={reviewItem.rate}
          count={5}
          size={30}
          color2={"#ff8d00"}
          edit={false}
          className="reviewRate"
        />
        <div>{reviewItem.text}</div>
      </div>
    </li>
  );
};

export default Review;
