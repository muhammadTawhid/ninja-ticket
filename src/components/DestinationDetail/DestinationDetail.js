import "./DestinationDetail.css";
import React from "react";
import ticketLogo from "../../images/ticket.png";

const DestinationDetail = () => {
  return (
    <div className="  details-div">
      <div className=" destination-div">
        <h5>Mirpur</h5>
        <h5>Dhanmondi</h5>
      </div>

      <div className="d-flex align-items-center ticket-details ">
        <p>
          <strong>Your Selection: First Class Ticket</strong>
        </p>
      </div>
      <div className=" d-flex justify-content-between align-items-center ticket-details">
        <img style={{ width: "50px" }} src={ticketLogo} alt="" />
        <p>Ticket 1</p>
        <p>$23</p>
      </div>
      <div className=" d-flex justify-content-between align-items-center ticket-details">
        <img style={{ width: "50px" }} src={ticketLogo} alt="" />
        <p>Ticket 2</p>
        <p>$23</p>
      </div>
      <div className=" d-flex justify-content-between align-items-center ticket-details">
        <img style={{ width: "50px" }} src={ticketLogo} alt="" />
        <p>Ticket 3</p>
        <p>$23</p>
      </div>
      <button>Search Again</button>
    </div>
  );
};

export default DestinationDetail;
