import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { productItem } = props;

  return (
    <li className="card productItem">
      <Link
        to={{
          pathname: `/list-of-products/productlist/${productItem.id}`,
          state: {
            product: productItem,
          },
        }}
      >
        <img
          className="card-img-top"
          src={`https://smktesting.herokuapp.com/static/${productItem.img}`}
          alt=""
        />
        <div className="card-body productBody">
          <h4 className="card-title">{productItem.title}</h4>
        </div>
      </Link>
    </li>
  );
};

export default Product;
