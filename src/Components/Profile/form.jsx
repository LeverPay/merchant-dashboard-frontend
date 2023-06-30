import React, {
  useState,
  useRef,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import Button from "../General/Button component/Button";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import Select from "react-select";
import TokenContext from "../User-Token/TokenContext";
import {
  get_Merchant_Profile,
  baseUrl,
  states,
  cities,
  update_Merchant_Profile,
} from "../Endpoints";
import axios from "axios";
import { CountrySelect } from "../CountrySelect";
import ImageContext from "../General/ImageContext";

export default function Form() {
  const { userToken, userData, setUserData, notify, success } =
    useContext(TokenContext);
  const { vectorImage, setVectorImage } = useContext(ImageContext);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(null);
  const [Input, setInput] = useState({
    firstName: "",
    lastName: "",
    businuessName: null,
    country: null,
    image: "",
    address: "",
    password: "",
    email: "",
  });
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [city_id, setCity_id] = useState();
  const [stateString, setStateString] = useState();
  const [countryValue, setCountryValue] = useState();

  const [selectCountry, setSelectCountry] = useState();
  const [selectState, setSelectState] = useState();
  const [selectCity, setSelectCity] = useState();
  const [countryString, setCountryString] = useState();

  // const [Image, setImage] = useState(null);

  const [ReadOnly, setReadOnly] = useState(true);
  const [disabled] = useState(true);

  // Get profile request on server
  const getProfile = async () => {
    try {
      const request = await axios.get(baseUrl + get_Merchant_Profile, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(request);
      if (request.status === 200) {
        const data = request.data.data;
        //save user data for use somewhere else
        setUserData(data);
        console.log(userData);
        setInput((prev) => {
          return {
            ...prev,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            email: data.email,
          };
        });
        setPhone(data.phone);
        setVectorImage(data.passport);
        setCountry(data.country_id);
        setSelectState(data.state_id);
        setSelectCity(data.city_id);
        data.passport && data.passport !== null ? setImage(data.passport) : "";
      }
    } catch (err) {
      console.log(err);
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

  // Call country APi
  const _country = "/api/v1/get-countries";
  const getCountry = async (country_id) => {
    try {
      const request = await axios.get(baseUrl + _country);
      if (request.status === 200) {
        setCountryData(request.data);
      }

      // Logic to display country name on select placeholder
      if (countryData !== undefined) {
        const list = countryData.data;
        const country_Value = list?.filter((el, i) => country === el.id);
        setCountryValue(country_Value);
        console.log(country_Value, list);
      }
    } catch (err) {
      console.log(err);
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

  const getState = async (country_id) => {
    try {
      const request = await axios.post(baseUrl + states, {
        country_id: country_id,
      });
      console.log(request);
      if (request.status === 200) {
        setStateData(request.data);
      }
    } catch (err) {
      console.log(err);
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

  const getCity = async (states_id) => {
    // states_id === "" || undefined || null ? (states_id = country) : states_id;
    try {
      const request = await axios.post(baseUrl + cities, {
        state_id: states_id,
      });
      console.log(request);
      if (request.status === 200) {
        setCityData(request.data);
        // setCity_id(states_id);
      }
    } catch (err) {
      console.log(err);
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

  // Country callback
  useEffect(() => {
    if (selectCountry !== "") {
      getCountry(selectCountry);
    }
  }, [selectCountry]);

  // Callback for country
  const formCountry = (country_id) => {
    if (countryData !== undefined) {
      setSelectCountry(country_id);
      console.log(`id: ${country_id}`);
    }
  };

  // Callback for state
  const formState = (state_id) => {
    setSelectState(state_id);
    console.log(`State id: ${state_id}`);
  };

  // Callback for city
  const formCity = (city_id) => {
    setSelectCity(city_id);
    console.log(`City id: ${city_id}`);
  };
  // Make request run once on page load
  useLayoutEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getCountry();
    getState(country);
  }, [Input, selectState]);

  useEffect(() => {
    if (selectCountry !== "") {
      getState(selectCountry);
    }
  }, [selectCountry]);

  useEffect(() => {
    if (selectState !== "") {
      getCity(selectState);
    }
  }, [selectState]);

  // Get name value for Id returned on api request
  useEffect(() => {
    if (countryValue !== undefined) {
      const countryName = countryValue.map((el) => el.country_name).toString();
      console.log(countryName);
      setCountryString(countryName);
    }
  }, [countryValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const editInfo = () => {
    setReadOnly(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Input.firstName !== "" && Input.lastName !== "") {
      console.log(Input.firstName, Input.lastName);
    }

    if (Input.businuessName !== "" || Input.businuessName !== null) {
      console.log(Input.businuessName);
    }

    if (Input.password !== "") {
      console.log(Input.password);
    }

    if (Input.email !== "") {
      console.log(Input.email);
    }

    if (Input.address !== "") {
      console.log(Input.address);
    }

    // if (country !== null) {
    //   console.log(country.label);
    // }
    if (
      selectCountry === "" ||
      selectCountry === undefined ||
      selectCountry === null
    ) {
      console.log(country);
    } else {
      console.log(selectCountry);
    }

    if (
      selectState !== "" ||
      selectState !== undefined ||
      selectState !== null
    ) {
      console.log(selectState);
    }

    if (selectCity !== "" || selectCity !== undefined || selectCity !== null) {
      console.log(selectCity);
    }

    if (
      isValidPhoneNumber(phone) &&
      isPossiblePhoneNumber(phone) &&
      phone !== ""
    ) {
      console.log(phone);
    } else {
      notify("Number is invalid");
    }

    if (vectorImage) {
      console.log(vectorImage);
    }

    setReadOnly(true);
    updateProfileData();
  };

  const discardChanges = (e) => {
    e.preventDefault();

    window.location.reload();
  };

  const handleDivClick = () => {
    // if (!ReadOnly) {
    const input = document.createElement("input");
    input.type = "file";
    input.style.zIndex = "5";
    input.accept = "image/x-png,image/jpeg,/image/jpg";
    input.onchange = changeImage;
    input.click();
    // }
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setVectorImage(fileReader.result);
    };
  };

  const removeImage = () => {
    setVectorImage(null);
  };

  const updateProfileData = async () => {
    try {
      const request = await axios.post(
        baseUrl + update_Merchant_Profile,
        {
          first_name: Input.firstName,
          last_name: Input.lastName,
          email: Input.email,
          address: Input.address !== "" ? Input.address : null,
          business_name:
            Input.businuessName !== "" ? Input.businuessName : null,
          phone: phone !== "" ? phone : null,
          password: Input.password !== "" ? Input.password : null,
          country_id:
            selectCountry === undefined ||
            selectCountry === null ||
            selectCountry === ""
              ? country
              : selectCountry,
          state_id: selectState,
          city_id: selectCity,
          passport:
            vectorImage !== null ||
            vectorImage !== undefined ||
            vectorImage !== ""
              ? vectorImage
              : null,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
          },
        }
      );
      console.log(request);
    } catch (err) {
      console.log(err);
      if (
        err.response.status === 400 ||
        err.response.status === 401 ||
        err.response.status === 403 ||
        err.response.status === 404
      ) {
        notify(err.response.data.message);
      } else {
        if (err.response !== undefined) {
          notify(err.response.data.message);
        } else {
          notify("Something went wrong :(");
        }
      }
    }
  };

  return (
    <>
      <section className="profile-edit d-flex justify-content-around align-items-center">
        <div className="profile-img rounded-circle" onClick={handleDivClick}>
          <img
            className={`rounded-circle ${!ReadOnly ? `opacity-75 cursor` : ``}`}
            src={!vectorImage ? require("../../Assets/edit.png") : vectorImage}
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
              readOnly={disabled}
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
              readOnly={disabled}
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
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="address">Address</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="text"
              name="address"
              value={Input.address}
              onChange={handleChange}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="email">E-mail</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="email"
              name="email"
              value={Input.email}
              onChange={handleChange}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="password">password</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="password"
              name="password"
              value={Input.password}
              onChange={handleChange}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="Country" className="rounded-1">
            Country
          </label>

          <div className="items text-input rounded-1">
            <CountrySelect
              countyList={countryData}
              selector="country_name"
              callback={formCountry}
              value={
                selectCountry === ""
                  ? null
                  : {
                      label: selectCountry,
                      value: selectCountry,
                    }
              }
              placeholder={countryString ? countryString : "Choose an option"}
              disabled={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="State" className="rounded-1">
            State
          </label>

          <div className="items text-input rounded-1">
            <CountrySelect
              countyList={stateData}
              selector="state_name"
              callback={formState}
              value={
                selectState === ""
                  ? null
                  : {
                      label: selectState,
                      value: selectState,
                    }
              }
              placeholder={countryString ? stateString : "Choose an option"}
              disabled={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="city" className="rounded-1">
            City
          </label>

          <div className="items text-input rounded-1">
            <CountrySelect
              countyList={cityData}
              selector="city_name"
              callback={formCity}
              value={
                selectCity === ""
                  ? null
                  : {
                      label: selectCity,
                      value: selectCity,
                    }
              }
              placeholder={countryString ? countryString : "Choose an option"}
              disabled={ReadOnly}
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
