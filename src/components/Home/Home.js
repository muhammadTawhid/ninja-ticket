import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData/fakeData.json";
import TicketCard from "../TicketCard/TicketCard";
import imageUrl from "../../images/bg.jpg";

const Home = () => {
  console.log(fakeData);
  const [ticketCards, setTicketCards] = useState([]);

  useEffect(() => setTicketCards(fakeData), []);
  console.log(ticketCards, "ticked");

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        {ticketCards.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
