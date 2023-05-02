import React, { useState, useRef } from "react";
import Button from "../General/Button component/Button";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import Select from "react-select";

export default function Form() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(null);
  const [Input, setInput] = useState({
    firstName: "",
    lastName: "",
    businuessName: "",
    country: null,
    image: "",
  });

  const [Image, setImage] = useState(null);

  const [ReadOnly, setReadOnly] = useState(true);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const countryOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: countries[code].name,
  }));

  const handleCountryChange = (value) => {
    setCountry(value);
  };

  const editInfo = () => {
    setReadOnly(false);
    console.log(ref1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Input.firstName !== "" && Input.lastName !== "") {
      console.log(Input.firstName, Input.lastName);
    }

    if (Input.businuessName !== "") {
      console.log(Input.businuessName);
    }

    if (country !== "") {
      console.log(country.label);
    }

    if (isValidPhoneNumber(phone) && isPossiblePhoneNumber(phone)) {
      console.log(phone);
    }

    if (Image) {
      console.log(Image);
    }

    setReadOnly(true);
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

  const handleDivClick = () => {
    if (!ReadOnly) {
      const input = document.createElement("input");
      input.type = "file";
      input.style.zIndex = "5";
      input.accept = "image/x-png,image/jpeg,/image/jpg";
      input.onchange = changeImage;
      input.click();
    }
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <>
      <section className="profile-edit d-flex justify-content-around align-items-center">
        <div className="profile-img rounded-circle" onClick={handleDivClick}>
          <img
            className={`rounded-circle ${!ReadOnly ? `opacity-75 cursor` : ``}`}
            src={!Image ? require("../../Assets/user's image.png") : Image}
            alt=""
          />
        </div>

        {/* Allows user to change information on the database  */}
        <Button
          style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
          click={editInfo}
        >
          Change
          <img
            className="mx-2"
            src={require("../../Assets/Edit-btn.svg").default}
            alt=""
          />
        </Button>

        <Button
          style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}
          click={removeImage}
        >
          Remove
          <img
            className="mx-2"
            src={require("../../Assets/Delete-btn.svg").default}
            alt=""
          />
        </Button>
      </section>

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
              ref={ref1}
              readOnly={ReadOnly}
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
              ref={ref2}
              readOnly={ReadOnly}
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
              ref={ref3}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="Country" className="rounded-1">
            Country
          </label>

          <div className="items">
            <Select
              options={countryOptions}
              className="select-btn rounded-1"
              value={country}
              onChange={handleCountryChange}
              isDisabled={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="Country" className="rounded-1">
            Phone Number
          </label>

          <div className="items">
            <PhoneInput
              international
              value={phone}
              onChange={(val) => setPhone(val)}
              className="select-btn rounded-1"
              disabled={ReadOnly}
            />
          </div>
        </div>

        <div className="d-flex mt-5 justify-content-center align-items-center">
          {/* Discard changes, fetch information from database and make forms on page readOnly */}

          <Button
            style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}
            click={discardChanges}
          >
            Discard Changes
          </Button>

          {/* performs a post and get request on the database to update database and render information on the client */}
          <Button
            style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
            click={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
}
