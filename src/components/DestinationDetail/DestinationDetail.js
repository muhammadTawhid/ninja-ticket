import "./DestinationDetail.css";
import React, { useContext } from "react";
import ticketLogo from "../../images/ticket.png";
import { userContext } from "../../App";

const DestinationDetail = () => {
  const [signedInUser, setSignedInUser] = useContext(userContext);
  const searchDestination = () => {
    const newDestination = { ...signedInUser };
    newDestination.pickFrom = "";
    newDestination.pickTo = "";
    setSignedInUser(newDestination);
  };

  return (
    <div className="  details-div">
      <div className=" destination-div">
        <h5>{signedInUser.pickFrom}</h5>
        <h5>{signedInUser.pickTo}</h5>
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
      <button onClick={searchDestination}>Search Again</button>
    </div>
  );
};

export default DestinationDetail;
