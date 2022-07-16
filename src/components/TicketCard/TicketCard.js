import './TicketCard.css';
import { Link } from "react-router-dom";
import React from "react";

const TicketCard = (props) => {
  const { ticketValue, price, img, id } = props.ticket;
  return (
    <div className="col-md-4 col-sm-6 col-lg-3 d-flex justify-content-center">
      <div className="card text-white border- my-">
        <img src={img} className="card-img " alt="..." />
        <div className="card-img-overlay card-text-div">
          <h1 className="card-title">
            <b>{ticketValue}</b>
          </h1>
          <Link to={"/destination/" + id}>
            <button>Buy Now</button>
          </Link>
          <h1 className="card-price text-center">
            <b>${price}</b>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
