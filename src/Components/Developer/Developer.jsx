import React, { useState, useContext, useEffect } from "react";
import logo from "../../Assets/vector.png";
import lock from "../../Assets/sec-padlock.png";
import copyIcon from "../../Assets/copy-vector.png";
import TokenContext from "../User-Token/TokenContext";
import { baseUrl, get_merchant_keys } from "../Endpoints/Endpoints";
import axios from "axios";

export default function Developer() {
  const { notify, success } = useContext(TokenContext);
  const [keys, setKeys] = useState({
    test_secret_key: "No key to display",
    test_public_key: "No key to display",
    live_secret_key: "No key to display",
    live_public_key: "No key to display",
  });

  const copyData = (e) => {
    const value = e.target.parentElement.previousElementSibling.value;

    if (value !== "No key to display" && value !== "") {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(value)
          .then(() => success("data successfully copied ✔"))
          .catch(() => notify("Something went wrong! :("));
      } else if (!navigator.clipboard) {
        notify("clipboard is not supported on this device!");
      }
    } else {
      notify("no data to copy, contact us to know more");
    }
  };

  const getMerchantKeys = async () => {
    try {
      const req = await axios.post(baseUrl + get_merchant_keys, null, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("Name")}` },
      });
      if (req.status === 200) {
        setKeys((prev) => ({
          ...prev,
          test_secret_key: req.data?.data?.test_secret_key,
          test_public_key: req.data?.data?.test_public_key,
          live_secret_key: req.data?.data?.live_secret_key,
          live_public_key: req.data?.data?.live_public_key,
        }));
      }
    } catch (err) {
      if (err.response) {
        notify(err.response?.data?.message);
      } else {
        notify("Something went wrong while getting data :(");
      }
    }
  };

  useEffect(() => {
    getMerchantKeys();
  }, []);

  return (
    <>
      <div className="dev-content px-5 py-5 rounded">
        <div className="images-section d-flex justify-content-between mb-3">
          <div>
            <img src={logo} alt="leverpay-logo" />
          </div>
        </div>

        <div className="dev-header">
          <h1 className="fw-bolder text-center fs-5 mb-2">Developer Keys</h1>
          <p className="text-center">
            Please Copy your developer keys and use them wherever needed
          </p>
        </div>

        <div className="dev-inputs-container d-flex flex-column justify-content-center px-5">
          <div className="inputs-container mt-2 mb-3">
            <label htmlFor="test-secret-key">test secret key</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="text"
                name="test_secret_key"
                value={keys.test_secret_key}
                id="test-secret-key"
                className="input rounded mb-2"
                disabled
              />
              <span className="copy-icon" onClick={copyData}>
                <img src={copyIcon} alt="copy" />
              </span>
            </div>
          </div>

          <div className="inputs-container mb-3">
            <label htmlFor="test-public-key">Test public key</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="text"
                name="test_public_key"
                value={keys.test_public_key}
                id="test-public-key"
                className="input rounded mb-2"
                disabled
              />
              <span className="copy-icon" onClick={copyData}>
                <img src={copyIcon} alt="copy" />
              </span>
            </div>
          </div>

          <div className="inputs-container mb-3">
            <label htmlFor="live-secret-key">Live secret key</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="text"
                name="live_secret_key"
                value={keys.live_secret_key}
                id="live-secret-key"
                className="input rounded mb-2"
                disabled
              />
              <span className="copy-icon" onClick={copyData}>
                <img src={copyIcon} alt="copy" />
              </span>
            </div>
          </div>

          <div className="inputs-container mb-3">
            <label htmlFor="live-public-key">Live public key</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="text"
                name="live_public_key"
                value={keys.live_public_key}
                id="live-public-key"
                className="input rounded mb-2"
                disabled
              />
              <span className="copy-icon" onClick={copyData}>
                <img src={copyIcon} alt="copy" />
              </span>
            </div>
          </div>
        </div>

        <div className="dev-footer d-flex justify-content-center align-items-center mt-2">
          <img src={lock} alt="secured" className="mx-2" />
          <p className="m-0">
            Secured by{" "}
            <span className="fw-bolder" style={{ color: "#2962f2" }}>
              Leverpay
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
