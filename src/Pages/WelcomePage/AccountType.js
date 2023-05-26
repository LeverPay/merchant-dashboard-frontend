import React from "react";
import { Link } from "react-router-dom";

function AccountType(props) {
  const { bg, bg2 } = props;
  return (
    <Link to={"/props.url"} className="acc-type-link">
      <div className="leverpay-acc-type" style={{ backgroundColor: bg }}>
        <center>
          <div className="col-md-8">
            <img
              src={props.accountIcon}
              alt="smiley"
              width="10%"
              style={{ backgroundColor: bg2 }}
            />
            <h6>{props.type}</h6>
            <p>{props.details}</p>
          </div>
        </center>
      </div>
    </Link>
  );
}

export default AccountType;
