import React from "react";

export default function CreateAccountForm() {
  return (
    <>
      <form>
        {" "}
        <center>
          <h5>Create your business account</h5>
        </center>
        <h6>First Name</h6>
        <input type="text" className="form-control" />
        <h6>Last Name</h6>
        <input type="text" className="form-control" />
        <h6>BusinessName</h6>
        <input type="text" className="form-control" />
        <h6>Select Country</h6>
        <CountrySelect />
        <h6>Phone Number</h6>
        <PhoneInput
          value={value}
          onChange={setValue}
          placeholder="Mobile number"
        />
        <h6>Email address</h6>
        <input type="text" className="form-control" />{" "}
        <div className="flexy flexyM">
          <input
            type="checkbox"
            name="color"
            checked={isChecked}
            onChange={handleChecked}
            style={{
              height: "height:15px",
              width: "15px",
            }}
          />
          <span
            style={{
              fontFamily: "AgrandirBold",

              fontSize: "12px",
              marginTop: "15px",
              marginLeft: "15px",
            }}
          >
            {" "}
            I agree to the <strong>Terms of Service</strong> and
            <strong> Privacy Policy.</strong>
          </span>
        </div>
        <button
          // disabled={submitButtonDisabled}
          className="acct-btn"
          // onClick={handleClick}
        >
          Create Account
        </button>
        <p style={{ fontSize: "13px", marginTop: "4px", color: "black" }}>
          Already have an count?{" "}
          <Link
            to={"/"}
            style={{
              color: "#2962F2",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
