import "./Destination.css";
import React, { useContext } from "react";
import DestinationDetail from "../DestinationDetail/DestinationDetail";
import { userContext } from "../../App";
import { useForm } from "react-hook-form";

const Destination = () => {
  const [signedInUser, setSignedInUser] = useContext(userContext);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  console.log(errors, "err");
  const onSubmit = (data) => setDestination(data);

  const setDestination = (data) => {
    const userDestination = { ...signedInUser };
    userDestination.pickFrom = data.pickFrom;
    userDestination.pickTo = data.pickTo;
    setSignedInUser(userDestination);
  };

  console.log(signedInUser.pickFrom);
  return (
    <div>
      <div className="container destination-container bg-white">
        <div className="my-5 row destination-row">
          <div className="col-md-4 col-sm-">
            {!signedInUser.pickFrom ? (
              <form onSubmit={(e) => e.preventDefault()} className="input-box">
                <label htmlFor="">Pick from</label>
                <input
                  {...register("pickFrom", {
                    required: "This field is required",
                    pattern: {
                      value: /^([A-Z][^0-9]*)$/,
                      message:
                        "First letter must be uppercase and number not allowed",
                    },
                  })}
                  onKeyUp={() => trigger("pickFrom")}
                  type="text"
                />
                {errors.pickFrom && (
                  <small style={{ color: "red" }}>
                    {errors.pickFrom?.message}
                  </small>
                )}
                <label htmlFor="">Pick to</label>
                <input
                  {...register("pickTo", {
                    required: "This field is required",
                    pattern: {
                      value: /^([A-Z][^0-9]*)$/,
                      message:
                        "First letter must be uppercase and number not allowed",
                    },
                  })}
                  onKeyUp={() => trigger("pickTo")}
                  type="text"
                />
                {errors.pickTo && (
                  <small style={{ color: "red" }}>
                    {errors.pickTo?.message}
                  </small>
                )}
                <label htmlFor="">Date</label>
                <input
                  className="mb-3"
                  type="date"
                  {...register("date", { required: "Select date" })}
                />
                {errors.date && (
                  <small style={{ color: "red" }}>{errors.date?.message}</small>
                )}
                <button onClick={handleSubmit(onSubmit)} className="search-btn">
                  Search
                </button>
              </form>
            ) : (
              <DestinationDetail />
            )}
          </div>
          <div className="col-md-8 col-sm- map-div">
            <iframe
              className="iframe-map"
              title="google map"
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d58421.42156628421!2d90.32864412251462!3d23.77094515310323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2sMirpur-1%2C%20Dhaka!3m2!1d23.795603699999997!2d90.3536548!4m5!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhanmondi%2C%20Dhaka!3m2!1d23.746149499999998!2d90.3742307!5e0!3m2!1sen!2sbd!4v1638887342271!5m2!1sen!2sbd"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;

// /^([A-Z][^0-9]*)$/  first letter uppercase and number not allowed
