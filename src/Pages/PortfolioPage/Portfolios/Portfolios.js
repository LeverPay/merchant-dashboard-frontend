import React from "react";
import "./portfolios.css";
export const Portfolios = (props) => {
  const { bg, coin, coinNum, coinAmount, coinName, color } = props;
  return (
    <>
      <div className="col-md-12">
        {" "}
        <div
          className="col-md-12 portfolio-container"
          style={{ backgroundColor: bg }}
        >
          {" "}
          <img src={coin} alt="smiley" className="col-md-" />
          <br />
          <div className="coin-digits" style={{ color: color }}>
            <h6>{coinNum}</h6>
            <h4>{coinAmount}</h4>
          </div>
        </div>
        <center>
          {" "}
          <h5>{coinName}</h5>
        </center>
      </div>
    </>
  );
};
