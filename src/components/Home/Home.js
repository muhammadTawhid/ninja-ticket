import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData/fakeData.json";
import TicketCard from "../TicketCard/TicketCard";

const Home = () => {
  console.log(fakeData);
  const [ticketCards, setTicketCards] = useState([]);

  useEffect(() => setTicketCards(fakeData), []);
  console.log(ticketCards, "ticked");

  return (
    <div>
      <div className="container ticket-container">
        <div className="text-center">
          <h1
            style={{
              backgroundImage: "linear-gradient(to right, #ff5b00, #ffa700)",
              borderRadius: "5px",
              marginTop: "20px",
              padding: "5px 0px",
            }}
          >
            <b>SELECT YOUR TICKET</b>
          </h1>
        </div>
        <div className="row">
          {ticketCards.map((ticket) => (
            <TicketCard ticket={ticket} key={ticket.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
