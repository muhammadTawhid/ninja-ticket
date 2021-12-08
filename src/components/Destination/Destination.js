import "./Destination.css"
import React from 'react';
import map from "../../images/image 6.png"
import DestinationDetail from "../DestinationDetail/DestinationDetail";

const Destination = () => {
    const handleChange =(e) =>{
        console.log(e.target.value)
    }
    return (
        <div>
            <div className="container bg-white">
                <div style={{width:"1100px"}} className="  row p-5 justify-content-around">
                    <div className="col-md-4">
                        {/* <div className="input-box">
                            <label htmlFor="">Pick from</label>
                            <input type="text"  required/>
                            <label htmlFor="">Pick to</label>
                            <input type="text" required/>
                            <label htmlFor="">Date</label>
                            <input onChangeCapture={handleChange} type="date" name="" id="" required/>
                            <button className="search-btn">Search</button>
                        </div> */}
                        <DestinationDetail/>
                    </div>
                    <div  className="col-md-8 map-div">
                        <img src={map} alt="" />
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d58421.42156628421!2d90.32864412251462!3d23.77094515310323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2sMirpur-1%2C%20Dhaka!3m2!1d23.795603699999997!2d90.3536548!4m5!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhanmondi%2C%20Dhaka!3m2!1d23.746149499999998!2d90.3742307!5e0!3m2!1sen!2sbd!4v1638887342271!5m2!1sen!2sbd" style={{width:"600px", height:"450px"}} ></iframe> */}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Destination;