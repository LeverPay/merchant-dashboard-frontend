import React, { useState } from "react";
import Button from "../General/Button component/Button";

export default function Form() {
  const [Input, setInput] = useState({
    firstName: "",
    lastName: "",
    businuessName: "",
    country: "",
    countryCode: "",
    phoneNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Input.firstName !== "" && Input.lastName !== "") {
      console.log(Input.firstName, Input.lastName);
    }

    if (Input.businuessName !== "") {
      console.log(Input.businuessName);
    }

    if (Input.countryCode !== "" && Input.phoneNo !== "") {
      console.log(Input.countryCode, Input.phoneNo);
    }

    if (Input.country !== "") {
      console.log(Input.country);
    }
  };

  const discardChanges = (e) => {
    e.preventDefault();

    Input.firstName = "";
    Input.lastName = "";
    Input.businuessName = "";
    Input.country = "";
    Input.countryCode = "";
    Input.phoneNo = "";
  };

  return (
    <form action="">
      <div className="mt-2 py-2 d-flex flex-column">
        <label htmlFor="Firstname">First Name</label>

        <div className="">
          <input
            className="rounded-1 text-input"
            type="text"
            name="firstName"
            value={Input.firstName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="Lastname">Last Name</label>

        <div className="">
          <input
            className="rounded-1 text-input"
            type="text"
            name="lastName"
            value={Input.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="Businuess-name">Businuess Name</label>

        <div className="">
          <input
            className="rounded-1 text-input"
            type="text"
            name="businuessName"
            value={Input.businuessName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column label">
        <label htmlFor="Country" className="rounded-1">
          Country
        </label>

        <div className="items">
          <select
            name="country"
            className="rounded-1 select-btn"
            id="Country"
            value={Input.country}
            onChange={handleChange}
          >
            <option value="">Country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Canada">Canada</option>
            <option value="Portugal">Portugal</option>
            <option value="Usa">United states</option>
            <option value="London">London</option>
            <option value="Germany">Germany</option>
            <option value="Tokyo">Tokyo</option>
            <option value="China">China</option>
          </select>
        </div>
      </div>

      <div className="mt-1 py-2 d-flex" id="options">
        <label htmlFor="countryCode" id="text-input-width-1">
          <select
            name="countryCode"
            id="countryCode"
            className="select-btn rounded-1"
            value={Input.countryCode}
            onChange={handleChange}
          >
            <option value="">Short Code</option>
            <option value="+234">+234</option>
            <option value="+31">+31</option>
            <option value="+041">+041</option>
            <option value="+011">+011</option>
          </select>
        </label>

        <div className="px-2" id="text-input-width">
          <input
            className="rounded-1 text-input"
            id=""
            type="text"
            name="phoneNo"
            value={Input.phoneNo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="d-flex mt-5 justify-content-center align-items-center">
        <Button
          style={{ backgroundColor: "#ebebeb", color: "#ffffff" }}
          click={discardChanges}
        >
          Discard Changes
        </Button>

        <Button
          style={{ backgroundColor: "#2962f2", color: "#000" }}
          click={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
