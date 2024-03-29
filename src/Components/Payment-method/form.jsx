import React, { useRef, useState, useContext, useEffect } from "react";
import Button from "../General/Button component/Button";
import PaymentImg from "../../Assets/payment-img.png";
import {
  baseUrl,
  update_payment_Method,
  get_all_banks,
  add_bank_details,
  get_user_bank_details,
} from "../Endpoints/Endpoints";
import axios from "axios";
import Notifications from "../General/NotificationContext";
import TokenContext from "../User-Token/TokenContext";
import NairaRemitance from "./NairaRemitance";
import BusdRemitance from "./BusdRemitance";
import UsdcRemitance from "./UsdcRemitance";
import TetherRemitance from "./TetherRemitance";
import { TableHead, HeaderData, data, NairaHeading } from "./TestData";
import Scroll from "../General/ScrollContext";
import Loading from "../General/loading animation/loading";

export default function Form() {
  const [initialRender, setInitialRender] = useState(true);
  const { notify, success } = useContext(TokenContext);
  const { scrollToTop, isVisible } = useContext(Scroll);
  const [naira, setNaira] = useState(false);
  const [usdc, setUsdc] = useState(false);
  const [busd, setBusd] = useState(false);
  const [tether, setTether] = useState(false);

  const [allBanks, setAllBanks] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectIntervals, setSelectedInterVal] = useState(null);
  const [selectNetwork, setSelectedNetwork] = useState(null);
  const [changeInput, setChangeInput] = useState(false);

  const [showTable, setShowTable] = useState(true);
  const [TableHeader] = useState(TableHead);
  const [SecondHeader, setSecondHeader] = useState(HeaderData);
  const [TableBody] = useState(data);
  const [animate, setAnimate] = useState(true);

  const [NairaHeader, setNairaHeader] = useState(true);
  const [NairaBody, setNairaBody] = useState([]);
  const [UsdcBody, setUsdcBody] = useState([]);
  const [BusdBody, setBusdBody] = useState([]);
  const [UsdTBody, setUsdTBody] = useState([]);
  const [active, setActive] = useState(0);

  const [filteredData, setFilteredData] = useState(null);
  const [renderSuccess, setRenderSuccess] = useState(false);
  const [renderLogos] = useState(null);
  const [input, setInput] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });
  const DisplayImg = useRef(),
    TableRef = useRef();

  // Populates with naira data on initial page load
  const initialFilter = () => {
    // const naira = data.filter((el) => el.Type === "Naira");
    const naira = NairaBody?.data?.map((el) => el);
    setFilteredData(naira);

    if (active === 0) {
      const nairaValue = NairaHeading.map((el) => el);
      setNairaHeader(true);
      setSecondHeader(nairaValue);
    }
  };

  const TrackedClickedHeader = (item) => {
    // const filtered = data.filter(
    //   (el) => el.Type.toLowerCase() === item.toLowerCase()
    // );
    const naira = NairaBody?.data?.map((el) => el);
    const usdC = UsdcBody?.data?.map((el) => el);
    const busD = BusdBody?.data?.map((el) => el);
    const usdT = UsdTBody?.data?.map((el) => el);

    if (item === "UsdC") {
      setFilteredData([]);
      setFilteredData(usdC);
      SetAciveHeader(item);
    } else if (item === "Busd") {
      setFilteredData([]);
      setFilteredData(busD);
      SetAciveHeader(item);
    } else if (item === "UsdT") {
      setFilteredData([]);
      setFilteredData(usdT);
      SetAciveHeader(item);
    } else {
      if (item === "Naira") {
        setFilteredData(naira);
        SetAciveHeader(item);
      }
    }

    if (item === "Naira") {
      const nairaValue = NairaHeading.map((el) => el);
      setNairaHeader(true);
      setSecondHeader(nairaValue);
    } else {
      const Header = HeaderData.map((el) => el);
      setNairaHeader(false);
      setSecondHeader(Header);
    }
  };

  const ChangeInputType = () => {
    setChangeInput(!changeInput);
    if (isVisible) scrollToTop();
  };

  const SetAciveHeader = (item) => {
    const activeItem = TableHeader.indexOf(item);
    setActive(activeItem);
    // console.log(active);
  };

  //Renders Table based on data available
  const renderTableByDataLength = () => {
    TableBody.length >= 1 ? setShowTable(true) : setShowTable(false);

    if (!showTable) {
      if (!DisplayImg?.current?.classList?.contains("backgroundImg"))
        DisplayImg.current?.classList?.add("backgroundImg");
    } else {
      if (DisplayImg?.current?.classList?.contains("backgroundImg")) {
        DisplayImg?.current?.classList?.remove("backgroundImg");
      }
    }
  };

  useEffect(() => {
    renderTableByDataLength();
  }, [showTable, naira, busd, usdc, tether, TableBody]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // selected option value
  const handleInstituteSelect = (selectedOption) => {
    setSelectedBank(selectedOption);
    setInput((prev) => ({
      ...prev,
      input1: !changeInput ? selectedOption : "",
    }));
    // console.log(input.input1);
  };

  // Selected interval value
  const handleSelectedInterval = (opt) => {
    setInput((prev) => ({ ...prev, input4: opt }));
    setSelectedInterVal(opt);
    // console.log(input.input4);
  };

  // Display intervals
  const intervals = ["daily", "weekly", "monthly"];
  const allIntervals = intervals
    ? intervals.map((opt) => ({
        value: opt,
        label: opt,
        ...(renderLogos && { logo: "url-to-logo" }),
      }))
    : [];

  // Display Networks on select field
  const networks = ["ERC20", "TRC20", "BEP20"];
  const allNetworks = networks
    ? networks.map((opt) => ({
        value: opt,
        label: opt,
        ...(renderLogos && { logo: "url-to-logo" }),
      }))
    : [];

  const handleSelectedNetwork = (opt) => {
    setInput((prev) => ({ ...prev, input2: opt }));
    setSelectedNetwork(opt);
    // console.log(input.input5);
  };

  //Logic to display bank images on select component
  const CustomOption = ({ innerProps, label, data, isFocused, isSelected }) => (
    <div
      {...innerProps}
      className={`custom-option ${isFocused ? "focused" : ""} ${
        isSelected ? "selected" : ""
      }`}
    >
      {data.logo && (
        <img src={data.logo} alt="bank logo" className="option-logo" />
      )}
      <span>{label}</span>
    </div>
  );

  //Select Component syle
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "2.1rem 4rem",
      borderRadius: "0.8rem",
      border: state.isFocused ? "2px solid #c1bdbd" : "2px solid #c1bdbd",
      outline: "none",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      "&:hover": {
        border: "2px solid #c1bdbd",
        outline: "none",
      },
    }),
  };

  const requestUrl = "https://nigerianbanks.xyz";

  const cryptoExchange = ["Binance", "Coinbase", "Huobi", "Luno"];

  const ExchangeOptions = cryptoExchange
    ? cryptoExchange.map((val) => ({
        value: val,
        label: val,
        ...(renderLogos && { logo: "logo-to-url" }),
      }))
    : [];

  // Fetch banks and set the state...
  const bankOptions = allBanks
    ? allBanks.map((bank) => ({
        value: bank.id,
        label: bank.name,
        logo: bank?.logo,
      }))
    : [];

  //Get banks data
  const getBankLists = async () => {
    try {
      const req = await axios.get(baseUrl + get_all_banks, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      setAllBanks(req.data?.data);
    } catch (err) {
      if (err.response) {
        notify(err.response?.data?.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  useEffect(() => {
    getBankLists();
    getBankDetails();
  }, []);

  useEffect(() => {
    initialFilter();
  }, [NairaBody]);

  // Empty All input values
  const cancel = () => {
    setInput((prev) => ({
      ...prev,
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
    }));
    setSelectedBank(null);
    setSelectedInterVal(null);
    setSelectedNetwork(null);
    setChangeInput(false);
  };

  // Copy values on input to device clipboard
  const copyValue = (e) => {
    const parentValue = e.target
      .closest(".inputs-container-2")
      .querySelector(".input").value;

    if (!navigator.clipboard) {
      notify("Clipboard is not supported");
    } else {
      if (parentValue !== "") {
        navigator.clipboard
          .writeText(parentValue)
          .then(() => success("Data copied to clipboard"))
          .catch((err) => notify("Something Went wrong"));
      } else {
        notify("Input value is empty");
      }
    }
  };

  //Account number value pattern
  const testAccVal = /^\d{10}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.input1 !== "" &&
      input.input1 !== "Choose An Option" &&
      input.input2 !== "" &&
      input.input3 !== ""
      // input.input4 !== "" &&
      // input.input4 !== "Choose An OPtion" &&
      // input.input5 !== "" &&
      // input.input5 !== "Choose An OPtion"
    ) {
      //Validate A/c no input once naira state is true
      if (naira && testAccVal.test(input.input2)) {
        updateBankDetails();
        cancel();

        // Automatically Sets page back to default state if user does't close succes icon manually
        setRenderSuccess(true);

        // Automatically Sets page back to default state if user does't close succes icon manually
        if (!initialRender && !renderSuccess && naira) {
          setTimeout(() => {
            setNaira(false);
            setInitialRender(true);
            setRenderSuccess(false);
            setChangeInput(false);
          }, 3000);
        }
      } else if (busd) {
        // console.log(input);
        cancel();

        // Displays Success icon
        setRenderSuccess(true);

        // Automatically Sets page back to default state if user does't close succes icon manually
        if (!initialRender && !renderSuccess && busd) {
          setTimeout(() => {
            setBusd(false);
            setInitialRender(true);
            setRenderSuccess(false);
          }, 3000);
        }
      } else if (usdc) {
        // console.log(input);
        cancel();

        // Displays success icons
        setRenderSuccess(true);

        // Automatically Sets page back to default state if user does't close succes icon manually
        if (!initialRender && !renderSuccess && usdc) {
          setTimeout(() => {
            setUsdc(false);
            setInitialRender(true);
            setRenderSuccess(false);
          }, 3000);
        }
      } else if (naira && !testAccVal.test(input.input2)) {
        notify("Invalid account number");
      } else {
        // console.log(input);
        // Displays success icon
        setRenderSuccess(true);
        //Empty input fields
        cancel();

        // console.log(initialRender, renderSuccess, tether);

        // Automatically Sets page back to default state if user does't close succes icon manually
        if (!initialRender && !renderSuccess && tether) {
          setTimeout(() => {
            setTether(false);
            setInitialRender(true);
            setRenderSuccess(false);
          }, 3000);
        }
      }
    } else {
      notify("One or more input(s) are empty");
    }
  };

  const showNaira = () => {
    setNaira(!naira);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const showUsdc = () => {
    setUsdc(!usdc);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const showBusd = () => {
    setBusd(!busd);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const showTether = () => {
    setTether(!tether);
    if (initialRender) {
      setInitialRender(!initialRender);
    }
  };

  const updateBankDetails = async () => {
    try {
      const req = await axios.post(
        baseUrl + add_bank_details,
        {
          account_no: input.input2,
          bank_id: input.input1.value.toString(),
          account_name: input.input3,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
          },
        }
      );
      if (req.status === 200) {
        success("Action successful, your details was added!");
      }
    } catch (err) {
      if (err.response) {
        notify(err.response?.data?.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  const getBankDetails = async () => {
    try {
      setAnimate(true);
      const req = await axios.get(baseUrl + get_user_bank_details, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      if (req.status === 200) {
        setAnimate(false);
        setNairaBody(req.data);
      }
    } catch (err) {
      setAnimate(false);
      if (err.response) {
        notify(err.response?.data?.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  return (
    <>
      {initialRender && (
        <>
          <div className="heading-text">
            <h3 className="fs-6 text-center mb-4 page-text">
              Please click on the currency tab to select your preferred
              remittance method.
            </h3>
          </div>
          <div className="form-container flexy flex-column">
            <div className="remitance-btn-container mt-4 ms-lg-5">
              <div></div>
              <button
                className="remitance-btn"
                onClick={showNaira}
                style={{ backgroundColor: "#428F21" }}
              >
                <img
                  src={require("../../Assets/naira-12.png")}
                  alt=""
                  className="mx-2"
                />
                <p className="fs-3 text-center">Naira</p>
              </button>
              <button
                className="remitance-btn"
                onClick={showUsdc}
                style={{ backgroundColor: "#8F2121" }}
              >
                <img
                  src={require("../../Assets/icon-61.png")}
                  alt=""
                  className="mx-2"
                />
                <p className="fs-3 text-center">USDC</p>
              </button>
              <button
                className="remitance-btn"
                onClick={showBusd}
                style={{ backgroundColor: "#0B0230" }}
              >
                <img
                  src={require("../../Assets/busd-21.png")}
                  alt=""
                  className="mx-2"
                />
                <p className="fs-3 text-center">BUSD</p>
              </button>
              <button
                className="remitance-btn"
                onClick={showTether}
                style={{ backgroundColor: "#082E88" }}
              >
                <img
                  src={require("../../Assets/usdt-42.png")}
                  alt=""
                  className="mx-2"
                />
                <p className="fs-3 text-center">USDT</p>
              </button>
            </div>
            <div className="form  col-md-12">
              <div className="flexy ">
                <div
                  className={`col-md-6 paymentimg d-flex ${
                    showTable
                      ? "justify-content-center flex-column"
                      : "align-items-end"
                  }`}
                  ref={DisplayImg}
                >
                  {showTable ? (
                    <div
                      className="table-container d-flex flex-column justify-content-center align-items-center px-4"
                      ref={TableRef}
                    >
                      <div className="table-content d-flex flex-column align-items-center justify-content-center">
                        <table>
                          <thead>
                            <tr className="t-row d-flex align-items-center justify-content-center">
                              {TableHeader.map((el, i) => (
                                <th
                                  key={i}
                                  className={`t-head1 mx-4 fs-5 text-center ${
                                    active === i ? "activeHeader" : ""
                                  }`}
                                  onClick={() => TrackedClickedHeader(el)}
                                >
                                  {el}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        </table>

                        <table className="second-table mt-4 px-2">
                          <thead>
                            <tr>
                              {SecondHeader.map((el, i) => (
                                <th className="fw-bolder px-2 py-2" key={i}>
                                  {el}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          {!NairaHeader && filteredData?.length > 0 ? (
                            <tbody>
                              {filteredData?.map((el, i) => (
                                <tr key={i}>
                                  <td className="px-2 py-2 text-break">
                                    {el.WalletAddress}
                                  </td>
                                  <td className="px-2 py-2">{el.Exchange}</td>
                                  <td className="px-2 py-2">{el.Network}</td>
                                </tr>
                              ))}
                            </tbody>
                          ) : NairaHeader && filteredData?.length > 0 ? (
                            <tbody>
                              {filteredData?.map((el, i) => (
                                <tr key={i}>
                                  <td className="px-2 py-2 text-break">
                                    {el.first_name}
                                  </td>
                                  <td className="px-2 py-2">{el.account_no}</td>
                                  <td className="px-2 py-2">{el.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          ) : animate ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <Loading />
                            </div>
                          ) : (
                            <tbody className="empty text-center fw-bolder mt-2 fs-4">
                              <tr>
                                <td colSpan="3">No Data to display</td>
                              </tr>
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="no-data">No data to display</div>
                  )}
                  <div className="d-flex px-4 align-items-end">
                    <img
                      src={require("../../Assets/ep-info-filled.png")}
                      alt=""
                    />
                    <small className="text-wrap mx-4 fw-bolder">
                      Kindly note that Leverpay allows you to setup more than
                      one remitance method. However, we will remit to any of the
                      options provided.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {naira && (
        <NairaRemitance
          render={naira}
          setRender={setNaira}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
          renderSuccess={renderSuccess}
          setRenderSuccess={setRenderSuccess}
          selectOptions={handleInstituteSelect}
          selectOptions2={handleSelectedInterval}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          intervals={allIntervals}
          renderLogos={renderLogos}
          selectedInterval={selectIntervals}
          CustomOption={CustomOption}
          customSelectStyles={customStyles}
          instituteOption={bankOptions}
          changeInput={changeInput}
          inputValueUpdate={ChangeInputType}
        />
      )}
      {usdc && (
        <UsdcRemitance
          render={usdc}
          setRender={setUsdc}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
          renderSuccess={renderSuccess}
          setRenderSuccess={setRenderSuccess}
          selectOptions={handleInstituteSelect}
          selectOptions2={handleSelectedInterval}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          intervals={allIntervals}
          renderLogos={renderLogos}
          selectedInterval={selectIntervals}
          CustomOption={CustomOption}
          customSelectStyles={customStyles}
          instituteOption={ExchangeOptions}
          networkOptions={allNetworks}
          selectedNetwork={selectNetwork}
          setSelectedNetwork={setSelectedNetwork}
          selectOptions3={handleSelectedNetwork}
        />
      )}
      {busd && (
        <BusdRemitance
          render={busd}
          setRender={setBusd}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
          renderSuccess={renderSuccess}
          setRenderSuccess={setRenderSuccess}
          selectOptions={handleInstituteSelect}
          selectOptions2={handleSelectedInterval}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          intervals={allIntervals}
          renderLogos={renderLogos}
          selectedInterval={selectIntervals}
          CustomOption={CustomOption}
          instituteOption={ExchangeOptions}
          customSelectStyles={customStyles}
          networkOptions={allNetworks}
          selectedNetwork={selectNetwork}
          setSelectedNetwork={setSelectedNetwork}
          selectOptions3={handleSelectedNetwork}
        />
      )}
      {tether && (
        <TetherRemitance
          render={tether}
          setRenderSuccess={setRenderSuccess}
          setRender={setTether}
          setInitialRender={setInitialRender}
          formValue={input}
          handleForm={handleChange}
          setValue={setInput}
          cancelProcess={cancel}
          submitForm={handleSubmit}
          copyText={copyValue}
          renderSuccess={renderSuccess}
          selectOptions={handleInstituteSelect}
          selectOptions2={handleSelectedInterval}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          intervals={allIntervals}
          renderLogos={renderLogos}
          selectedInterval={selectIntervals}
          CustomOption={CustomOption}
          customSelectStyles={customStyles}
          instituteOption={ExchangeOptions}
          networkOptions={allNetworks}
          selectedNetwork={selectNetwork}
          setSelectedNetwork={setSelectedNetwork}
          selectOptions3={handleSelectedNetwork}
        />
      )}
    </>
  );
}
