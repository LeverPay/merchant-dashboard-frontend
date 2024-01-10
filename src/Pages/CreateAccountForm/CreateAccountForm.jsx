import React, { useState, useEffect, useRef } from "react";
import "./create-account-form.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
 import ContinueIcon from "../../Assets/continue-arrow.svg"
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  fetchInfo,
  states,
  cities,
  baseUrl,
  signup,
  verify_Mail,
  resendVerification_Token,
  countries,
} from "../../Components/Endpoints";
import axios from "axios";
import "./VerifyEmail.css";
import { toast } from "react-toastify";
import Verify from "./verify";
import PasswordEye from "../../Assets/eyes1.svg"
import PasswordLock from "../../Assets/Vector 2.svg"
import EyeOpen from "../../Assets/eye-open.svg";
import EyeClose from "../../Assets/eye-close.jpg";
export default function CreateAccountForm({ accType }) {
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [v_email, setV_email] = useState("");
  const [renderVerify, setRenderVerify] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [displayFormNumber, setDisplayFormNumber] = useState(1);


  const [person, setPerson] = useState({
    firstName: "",
    otherName: "",
    lastName: "",
    dob: "",
    gender: "Select gender",
    address: "",
    businessName: "",
    rcNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    starter: false,
    registered: false,
    agree: false,
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setPerson((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });

  const successNotify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      theme: "light",
    });

  const fetchcountryData = async () => {
    //fetch country
    try {
      const req1 = await axios.get(baseUrl + countries);
      if (req1.status === 200) {
        const response1 = req1.data?.data?.map((el) => el);
        setCountryData(response1);
      }
    } catch (err) {
      errorNotify("something went wrong while getting country");
    }
  };
  useEffect(() => {
    fetchcountryData();
  }, []);

  const fetchState = async (id) => {
    try {
      id = person.country;
      const req2 = await axios.post(baseUrl + states, {
        country_id: id,
      });
      if (req2.status === 200) {
        const response = req2.data?.data;
        setStateData(response);
      }
    } catch (err) {
      errorNotify("Something went wrong while fetching states");
    }
  };

  useEffect(() => {
    if (person.country !== "") fetchState(person.country);
  }, [person.country]);

  const fetchcity = async (id) => {
    try {
      id = person.state;
      const req3 = await axios.post(baseUrl + cities, {
        state_id: id,
      });
      if (req3.status === 200) {
        const response = req3.data?.data;
        setCityData(response);
      }
    } catch (err) {
      errorNotify("something went wrong while fetching city");
    }
  };

  useEffect(() => {
    if (person.state !== "") fetchcity(person.state);
  }, [person.state]);
  // console.log(cityData, "is city data");

  // const handleChecked = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()\-_=+{};:,<.>?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{10,}$/;

  function validateForm(e) {
    console.log(person,'...........here persn');
    e.preventDefault();
    // Check if the First Name is an Empty string or not.

    if (person.firstName.length == 0) {
      errorNotify("Invalid Form, First Name cannot be empty");
      return;
    }

    // checks if last name is empty
    if (person.lastName.length == 0) {
      errorNotify("Invalid Form, Lastname cannot be empty");
      return;
    }

    const selectedDate = new Date(person.dob);

    // Get the current date
    const currentDate = new Date();

    // Calculate the minimum allowed date (5 years ago from the current date)
    const minAllowedDate = new Date(
      currentDate.getFullYear() - 10,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (person.dob.length == 0) {
      errorNotify("Invalid Form, birth date can not be empty");
    } else if (person.dob.length > 0) {
      if (selectedDate < minAllowedDate) {
        // chaecks if date of birth is empty
      } else if (selectedDate >= minAllowedDate) {
        errorNotify(
          "Date of birth is too recent. Must be at least 10 years ago."
        );
        return;
      }
    }

    if (person.gender.length == 0 || person.gender === "Select gender") {
      errorNotify("Invalid Form, gender can not be empty");
      return;
    }
    // Check if the Email is an Empty string or not.
    if (person.email.length == 0) {
      errorNotify("Invalid Form, Email Address can not be empty");
      return;
    } else if (!emailRegex.test(person.email)) {
      errorNotify("Invalid mail format");
    } else {
    }

    //Check if address length is an Empty string or not

    if (person.address.length == 0) {
      errorNotify("Invalid Form, Address cannot be empty");
      return;
    }

    //checks if country value is empty
    if (person.country === "") {
      errorNotify(
        "counrty value cannot be empty, please select a country to get state"
      );
      return;
    }

    // chacks if state value is empty
    if (person.country === "1") {
      if (person.state === "") {
        errorNotify(
          "state value cannot be empty, please select a state to get city"
        );
        return;
      }
    }

    // checks if city value is empty
    if (person.country === "1") {
      if (person.city === "") {
        errorNotify("city value cannot be empty");
        return;
      }
    }

    if (value === "") {
      errorNotify("phone number cannot be empty and must be valid!");
    }

    // if (person.registered && person.starter) {
    //   errorNotify("Please select only one business category");
    //   return;
    // }

    // Check if BusinuessName is an Empty string
    if (person.businessName.length == 0) {
      errorNotify("Invalid Form, Business name cannot be empty");
      return;
    }

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (person.password.length < 10) {
      errorNotify(
        "Invalid Form, Password must contain more than or equal to 10 characters."
      );
    } else if (!passwordRegex.test(person.password)) {
      errorNotify(
        "password must be 10characters long, must contain at least a special character and a number"
      );
    } else if (person.password !== person.confirmPassword) {
      errorNotify("password mismatch");
    } else {
    }

    if (!person.agree) {
      errorNotify("Accept Terms of Services to continue");
      return;
    }

    if (person.country === 1) {
      if (
        person.agree &&
        person.password === person.confirmPassword &&
        person.email.length > 0 &&
        emailRegex.test(person.email) &&
        passwordRegex.test(person.password) &&
        person.address.length > 0 &&
        person.businessName.length > 0 &&
        person.city !== "" &&
        person.state !== "" &&
        person.country !== "" &&
        value !== "" &&
        person.dob !== "" &&
        selectedDate < minAllowedDate
      ) {
        handleSubmit();
      }
    } else {
      if (
        person.agree &&
        person.password === person.confirmPassword &&
        person.email.length > 0 &&
        emailRegex.test(person.email) &&
        passwordRegex.test(person.password) &&
        person.address.length > 0 &&
        person.businessName.length > 0 &&
        person.country !== "" &&
        value !== "" &&
        person.dob !== "" &&
        selectedDate < minAllowedDate
      ) {
        handleSubmit();
      }
    }
  }

  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      setAnimate(true);
      const register = await axios.post(baseUrl + signup, {
        first_name: person.firstName,
        last_name: person.lastName,
        address: person.address,
        password: person.password,
        email: person.email,
        business_name: person.businessName,
        phone: value,
        country_id: person.country,
        state_id: person.state,
        city_id: person.city,
      });
      console.log(register);
      if (register.status === 200) {
        successNotify("Signup Success ✔");
        localStorage.setItem("registered", "true");
        setAnimate(false);
        const cookie = localStorage.getItem("registered");
        // Continue process
        if (cookie) {
          setRenderVerify(true);
        }
        setV_email(register.data.data.email);
      } else {
        errorNotify("Something went wrong :(");
      }
    } catch (err) {
      setAnimate(false);
      if (err.response) {
        if (
          err.response?.data?.data?.business_name ||
          err.response?.data?.data?.email ||
          err.response?.data?.data?.phone
        ) {
          err.response?.data?.data?.business_name?.map((el) => errorNotify(el));
          err.response?.data?.data?.email?.map((el) => errorNotify(el));
          err.response?.data?.data?.phone?.map((el) => errorNotify(el));
        }
      } else {
        errorNotify("Something went wrong :(");
      }
    }
  }

  const continue_toVerification = () => {
    setRenderVerify(true);
  };

  const handlePageDisplay=(page)=>{
    if(page === 2) {

      if (person.firstName && person.lastName && person.gender && person.dob) {
        setDisplayFormNumber(page)
      }
      return
      return
    }else if(page === 3) {
      if (person.email && person.address && person.country && person.city && person.country && person.state) {
        setDisplayFormNumber(page)
      }
      return
    
    } else if (page==4){
      if (person.businessName && person.rcNumber) {
        setDisplayFormNumber(page)
      }
      return
    } else if (page ===1){
      setDisplayFormNumber(page)
    }
 
  }

  return (
      <>
     {!renderVerify && (
    <div className="welcome-main-container">
  
<div className="welcome-signin-right-side">
    <div className="welcome-signin-right-side-footer">
      <div className="welcome-footer-down">
      Hi! Merchants.
      </div>
    </div>
</div>
<div className="welcome-signin-left-side">  

<div className="welcome-signin-left-side-top">
  <span className="welcome-signin-left-side-top-header">
  Get Started with Leverpay!
  </span>
  <span className="welcome-signin-left-side-top-text">
  Let's get to know you better!
  </span>
  <span className="welcome-signin-left-side-top-text">
  Please fill out the form below to personalize your experience.
  </span>

  </div>

<div className="welcome-signin-left-side-bottom">
    <div className="welcome-signin-main-card">
      <span className="welcome-login-form-title">
        {displayFormNumber===1?"PERSONAL PROFILE":displayFormNumber===2? "CONTACT INFO." : displayFormNumber === 3 ? "BUSINESS PROFILE" :"CREATE PASSWORD" }
      </span>
  

      {displayFormNumber===1?
      
      <div className="welcome-login-form-input">

        <span className="welcome-login-form-label">First Name</span>
        <span className="welcome-username-input">
                <input type="text"  className="welcome-userInput" placeholder={person.firstName ? person.firstName:"Enter FirstName"}   
                   name="firstName"
                    required
                    onChange={handleChange}
                    value={person.firstName}
                  id="firstName"
                    />
          </span>
         
        <span className="welcome-login-form-label">Last Name</span>

        <span className="welcome-username-input">
                <input type="text"  className="welcome-userInput" placeholder="Enter LastName"   
                   name="lastName"
                    required
                    onChange={handleChange}
                    value={person.lastName}
                  id="lastName"
                    />
          </span>

        <span className="welcome-login-form-label">Other Name</span>

        <span className="welcome-username-input">
                <input type="text"  className="welcome-userInput" placeholder="Other Name"   
                   name="otherName"
                    required
                    onChange={handleChange}
                    value={person.otherName}
                  id="otherName"
                    />
          </span>

        <span className="welcome-login-form-label">Gender</span>

        <span className="welcome-username-input">
                      <select
               required
                type="text"
               className="welcome-userInput"
               onChange={handleChange}
               value={person.gender}
               id="gender"
               name="gender"
             >
               <option value="">Select gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
             </select>
          </span>

        <span className="welcome-login-form-label">Date of Birth</span>

        <span className="welcome-username-input">
                <input type="date"  className="welcome-userInput" placeholder="Enter DOB"   
                   name="dob"
                    required
                    onChange={handleChange}
                    value={person.dob}
                  id="dob"
                    />
          </span>
      
     

        <button className="welcome-login-button"  
          onClick={()=>handlePageDisplay(2)}
         
       >
        Continue <img src={ContinueIcon}/>
  
        </button>
        </div> 



        :displayFormNumber===2  ?
        
        
          <div className="welcome-login-form-input">

        <span className="welcome-login-form-label">Email</span>
        <span className="welcome-username-input">
                <input type="email"  className="welcome-userInput" placeholder="Enter Email"   
                  name="email"
                    required
                    onChange={handleChange}
                    value={person.email}
                  id="email"
                    />
          </span>
        
        <span className="welcome-login-form-label">Phone</span>

        <span className="welcome-username-input">
                       <PhoneInput
                value={value}
                onChange={setValue}
                placeholder="Phone number"
                required
                id="phone"
              />
          </span>

        <span className="welcome-login-form-label">Address</span>

        <span className="welcome-username-input">
                <input type="text"  className="welcome-userInput" placeholder="Address"   
                  name="address"
                    required
                    onChange={handleChange}
                    value={person.address}
                  id="address"
                    />
          </span>

        <span className="welcome-login-form-label">Country</span>

        <span className="welcome-username-input">
            <select 
            required
             name="country"
             value={person.country}
             onChange={handleChange}
             className="welcome-userInput"
             id="country"
             >
          <option value="" disabled>Select an option</option>
             {countryData !== null ? (
             countryData?.map((el) => (
             <option key={el.id} value={el.id}>
             {el.country_name}
             </option>
             ))
             ) : (
             <option value="">No value to display</option>
             )}
             </select>
          </span>

          {person.country !== "" && (<> <span className="welcome-login-form-label">State</span>

        <span className="welcome-username-input">
                {/* <input type="text"  className="welcome-userInput" placeholder="State"   
                  name="state"
                    required
                    onChange={handleChange}
                  id="state"
                    /> */}

                 <select
                 className="welcome-userInput"
                 onChange={handleChange}
                 value={person.state}
                 name="state"
                 id="state"
                 >
                   <option value=""  >Select an option</option>
                 {stateData !== null ? (
                 stateData?.map((el) => (
                 <option key={el.id} value={el.id}>
                 {el.state_name}
                 </option>
                 ))
                 ) : (
                 <option value="">No value to display</option>
                 )}
                 </select>
          </span></>)}

          {person.state !== "" && (
<>
  <span className="welcome-login-form-label">City</span>

      <span className="welcome-username-input">
 
                  <select
                  className="welcome-userInput"
                  onChange={handleChange}
                  name="city"
                  value={person.city}
                  id="city"
                  >
                 <option value=""  >Select an option</option>
                  {cityData !== null ? (
                  cityData?.map((el) => (
                  <option key={el.id} value={el.id}>
                  {el.city_name}
                  </option>
                  ))
                  ) : (
                  <option value="">No value to display</option>
                  )}
                  </select>
        </span>
        </>)}




        <button className="welcome-login-button"  
        onClick={()=>handlePageDisplay(3)}
        
        >
        Continue <img src={ContinueIcon}/>

        </button>
          </div>


            :displayFormNumber===3  ?

             
          <div className="welcome-login-form-input">

          <span className="welcome-login-form-label">Business Name</span>
          <span className="welcome-username-input">
                  <input type="text"  className="welcome-userInput" placeholder="Business Name"   
                    name="businessName"
                      required
                      value={person.businessName}
                      onChange={handleChange}
                    id="businessName"
                      />
            </span>
          
          <span className="welcome-login-form-label">RC Number</span>

          <span className="welcome-username-input">
                  <input type="text"  className="welcome-userInput" placeholder="RC Number"   
                    name="rcNumber"
                      required
                      onChange={handleChange}
                      value={person.rcNumber}
                    id="rcNumber"
                      />
            </span>

          {/* <span className="welcome-login-form-label">Business Type</span>

          <span className="welcome-username-input">
                  <input type="text"  className="welcome-userInput" placeholder="Business Type"   
                    name="businessType"
                      required
                      onChange={handleChange}
                    id="businesstype"
                      />
            </span> */}

          <button className="welcome-login-button"  
            onClick={()=>handlePageDisplay(4)}
          
        >
          Continue <img src={ContinueIcon}/>

          </button>
          </div>     :  

            <div className="welcome-login-form-input">

            <span className="welcome-login-form-label">Password</span>
            <span className="welcome-username-input">
                    <input    className="welcome-userInput" placeholder="Password"   
                      name="password"
                      type={showPassword ? "text" : "password"}
               
                        required
                        value={person.password}
  
                        onChange={handleChange}
                      id="password"
                        />
                            <span onClick={toggleShowPassword}>
                    {showPassword ? (
                      <img className="" src={EyeOpen} alt="Scholar" height={'20px'} />
                    ) : (
                      <img
                        className=""
                        src={ EyeClose}
                        alt="Scholar"
                        height={'20px'}
                      />
                    )}
                  </span>
              </span>
            
            <span className="welcome-login-form-label">Confirm Password</span>
        
            <span className="welcome-username-input">
                    <input    className="welcome-userInput" placeholder="Confirm Password"   
                      name="confirmPassword"
                      type={showPassword1 ? "text" : "password"}
                        required
                        value={person.confirmPassword}
                        onChange={handleChange}
                      id="confirmPassword"
                        />
                         <span onClick={toggleShowPassword1}>
                    {showPassword1 ? (
                      <img className="" src={EyeOpen} alt="Scholar" height={'20px'} />
                    ) : (
                      <img
                        className=""
                        src={ EyeClose}
                        alt="Scholar"
                        height={'20px'}
                      />
                    )}
                  </span>
              </span>


              <div className="welcome-agreement-div">
              <input
                    required
                    type="checkbox"
                    name="agree"
                    value={person.agree}
                    onChange={handleChange}
                    style={{
                    height: "15px",
                    width: "15px",
                    }}
                    id="agree"
                    />
                <span className="welcome-form-text-six">I agree to Leverpay Terms & Privacy Policy</span>
              </div>


            <button className="welcome-login-button"  
            onClick={validateForm}
            animate={animate}
            
            >
            SUBMIT

            </button>
            </div>
          }
        <p className="welcome-account-creation welcome-form-text-one"> 
        Already Signed-up?{" "}
        &nbsp;
        <Link to={"/"} className="welcome-form-text-two welcome-color-one">
          Sign in
          </Link>
            </p>
            <p className="welcome-account-creation welcome-form-text-one"> 
        Already have an Account?{" "}
        &nbsp;
        <Link  onClick={continue_toVerification} className="welcome-form-text-two welcome-color-one">
          Continue to email verification
          </Link>
            </p>
         <div className="welcome-page-router">
            <span onClick={()=>handlePageDisplay(1)} className={displayFormNumber===1?"welcome-single-router-active":"welcome-single-router-inactive"} ></span>
            <span onClick={()=>handlePageDisplay(2)} className={displayFormNumber===2?"welcome-single-router-active":"welcome-single-router-inactive"}></span>
            <span onClick={()=>handlePageDisplay(3)} className={displayFormNumber===3?"welcome-single-router-active":"welcome-single-router-inactive"}></span>
            <span onClick={()=>handlePageDisplay(4)} className={displayFormNumber===4?"welcome-single-router-active":"welcome-single-router-inactive"}></span>
         </div>
 
      <div className="welcome-login-form-footer">
        <div className="welcome-form-text-two"> <Link to={"https://leverpay.io/privacy-policy"} className="welcome-form-text-two" target="_blank"> Privacy </Link> &  <Link to={"https://leverpay.io/terms-conditions"} className="welcome-form-text-two" target="_blank">Terms</Link>   </div>
        {/* <span className="welcome-form-text-one">Contact Us</span> */}
      </div>
   
    </div>
    </div>

    </div>


    </div>)}
    {renderVerify && <Verify mail={v_email} renderSignUp={setRenderVerify} />}  
    </>
  );
}
