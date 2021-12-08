import React from "react";

const TicketCard = (props) => {
  const { ticketValue, price, img } = props.ticket;
  return (
    <div className="col-md-3 col-sm-1">
      {/* <div className="card" style={{width: "18rem"}}>
                <img src={img} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div> */}

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
          <button
            style={{
              backgroundImage: "linear-gradient(to right, #ff5b00 , #ffa700)",
              border: "none",
              borderRadius: "30px",
              padding: "10px 20px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            className=""
          >
            Buy Now
          </button>
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
