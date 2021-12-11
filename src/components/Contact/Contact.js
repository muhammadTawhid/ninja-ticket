import React from "react";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarked,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="contact-box">
      <div>
        <FontAwesomeIcon className="icon" icon={faMapMarked} />
        <p>Address: 198 west 21th street Dhaka</p>
      </div>
      <div>
        <FontAwesomeIcon className="icon" icon={faPhone} />
        <p>Phone: +1235 2355 98</p>
      </div>
      <div>
        <FontAwesomeIcon className="icon" icon={faEnvelope} />
        <p>Email: info@mail.com</p>
      </div>
    </div>
  );
};

export default Contact;
