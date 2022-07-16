import "./DestinationDetail.css";
import React, { useContext } from "react";
import ticketLogo from "../../images/ticket.png";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData/fakeData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const DestinationDetail = () => {
  const { id } = useParams();
  const ticket = fakeData.find((oneTicket) => oneTicket.id === id);

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
        <div className=" destination-div">
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
        <div className=" d-flex justify-content-between align-items-center ticket-details">
          <img style={{ width: "50px" }} src={ticketLogo} alt="" />
          <p>Ticket 1</p>
          <p>{ticket.price}</p>
        </div>
        <div className=" d-flex justify-content-between align-items-center ticket-details">
          <img style={{ width: "50px" }} src={ticketLogo} alt="" />
          <p>Ticket 2</p>
          <p>{ticket.price * 2}</p>
        </div>
        <div className=" d-flex justify-content-between align-items-center ticket-details">
          <img style={{ width: "50px" }} src={ticketLogo} alt="" />
          <p>Ticket 3</p>
          <p>{ticket.price * 3}</p>
        </div>
        <button onClick={searchDestination}>Search Again</button>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Book Ticket
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Ticket Booked</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Your Ticket Booked Successfully
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
