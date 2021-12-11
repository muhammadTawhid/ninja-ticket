import { Link } from "react-router-dom";
import React from "react";
// import { useParams } from 'react-router-dom'

const TicketCard = (props) => {
  const { ticketValue, price, img, id } = props.ticket;
  return (
    <div className="col-md-3 col-sm-1 d-flex justify-content-center">
      <div
        className="card text-white border-0 my-5"
        style={{
          width: "15rem",
          background: "transparent",
          textTransform: "uppercase",
        }}
      >
        <img src={img} className="card-img " alt="..." />
        <div className="card-img-overlay" style={{ height: "300px" }}>
          <h1 className="card-title">
            <b>{ticketValue}</b>
          </h1>
          <Link to={"/destination/" + id}>
            <button
              style={{
                backgroundImage: "linear-gradient(to right, #ff5b00 , #ffa700)",
                border: "none",
                borderRadius: "30px",
                padding: "10px 20px",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Buy Now
            </button>
          </Link>
          <br />
          <h1
            style={{
              position: "absolute",
              bottom: "1%",
              left: "20%",
              fontSize: "3.5em",
            }}
          >
            <b>${price}</b>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
