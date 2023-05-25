import React from "react";

function AccountType(props) {
  return (
    <Link to={"/props.url"}>
      <div className="leverpay-acc-type">
        <center>
          <img src={props.accountIcon} alt="smiley" className="col-md-12" />
          <h6>{props.type}</h6>
          <p>{props.details}</p>
        </center>
      </div>
      ;
    </Link>
  );
}

export default AccountType;
