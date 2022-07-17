import "./DestinationDetail.css";
import React, { useContext } from "react";
import ticketLogo from "../../images/ticket.png";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData/fakeData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DestinationDetail = () => {
  const { id } = useParams();
  const ticket = fakeData.find((oneTicket) => oneTicket.id === id);
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [signedInUser, setSignedInUser] = useContext(userContext);
  const searchDestination = () => {
    const newDestination = { ...signedInUser };
    newDestination.pickFrom = "";
    newDestination.pickTo = "";
    setSignedInUser(newDestination);
  };

  return (
    <div>
      <div className="details-div">
        <div className="destination-div">
          <h5>
            <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
            {signedInUser.pickFrom}
          </h5>
          <h5>
            <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
            {signedInUser.pickTo}
          </h5>
        </div>

        <div className="d-flex align-items-center ticket-details ">
          <p>
            <strong>Your Selection: {ticket.ticketValue}</strong>
          </p>
        </div>
        <div id={selectedTicket === 1 ? "selectedTicket" : ""} className="d-flex justify-content-between align-items-center ticket-details" onClick={() => setSelectedTicket(1)}>
          <img style={{ width: "50px" }} src={ticketLogo} alt="" />
          <p>Ticket 1</p>
          <p>{ticket.price}</p>
        </div>
        <div id={selectedTicket === 2 ? "selectedTicket" : ""} className="d-flex justify-content-between align-items-center ticket-details" onClick={() => setSelectedTicket(2)}>
          <img style={{ width: "50px" }} src={ticketLogo} alt="" />
          <p>Ticket 2</p>
          <p>{ticket.price * 2}</p>
        </div>
        <div id={selectedTicket === 3 ? "selectedTicket" : ""} className="d-flex justify-content-between align-items-center ticket-details" onClick={() => setSelectedTicket(3)}>
          <img style={{ width: "50px" }} src={ticketLogo} alt="" />
          <p>Ticket 3</p>
          <p>{ticket.price * 3}</p>
        </div>
        <button onClick={searchDestination}>Search Again</button>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Book Ticket
        </button>
      </div>

      {/* <!-- Modal -->  */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{selectedTicket ? "Your Ticket Booked Successfully" : "Ticket Booked"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!selectedTicket && "Your Ticket Booked Successfully"}
              {selectedTicket && "You Have Booked " + selectedTicket + " Tickets"}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
