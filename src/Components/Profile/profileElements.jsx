import React from "react";
import "./style.css";
import Button from "../General/Button component/Button";

export default function ProfileElements() {
  return (
    <section className="profile-container d-flex flex-column">
      <div className="profile-header d-flex justify-content-start px-4">
        <h2 className="fs-3">Profile</h2>
      </div>

      <section className="profile-contents-container container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="profile-contents mt-4 px-2">
          <h2 className="fs-2">Basic Information</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad vel
            facere sit
          </p>

          <section className="profile-edit d-flex justify-content-around align-items-center">
            <div className="profile-img bg-success rounded-circle">
              <img
                className="rounded-circle"
                src={require("../../Assets/user's image.png")}
                alt=""
              />
            </div>

            <Button style={{ backgroundColor: "#2962f2", color: "#ffffff" }}>
              Change
              <img
                className="mx-2"
                src={require("../../Assets/Edit-btn.svg").default}
                alt=""
              />
            </Button>

            <Button style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}>
              Change
              <img
                className="mx-2"
                src={require("../../Assets/Delete-btn.svg").default}
                alt=""
              />
            </Button>
          </section>

          <section className="form-container mt-4">
            <form action="">
              <div className="mt-2 py-2 d-flex flex-column">
                <label htmlFor="Firstname">First Name</label>

                <div className="">
                  <input
                    className="rounded-1 text-input"
                    type="text"
                    name="firstName"
                  />
                </div>
              </div>

              <div className="mt-1 py-2 d-flex flex-column">
                <label htmlFor="Lastname">Last Name</label>

                <div className="">
                  <input
                    className="rounded-1 text-input"
                    type="text"
                    name="firstName"
                  />
                </div>
              </div>

              <div className="mt-1 py-2 d-flex flex-column">
                <label htmlFor="Businuess-name">Businuess Name</label>

                <div className="">
                  <input
                    className="rounded-1 text-input"
                    type="text"
                    name="firstName"
                  />
                </div>
              </div>

              <div className="mt-1 py-2 d-flex flex-column label">
                <label htmlFor="Country" className="rounded-1">
                  Country
                </label>

                <div className="items">
                  <select name="country" className="rounded-1 select-btn">
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
                <label htmlFor="phone" id="text-input-width-1">
                  <select name="phone" id="" className="select-btn rounded-1">
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
                    name=""
                  />
                </div>
              </div>

              <div className="d-flex mt-5 justify-content-center align-items-center">
                <Button
                  style={{ backgroundColor: "#ebebeb", color: "#ffffff" }}
                >
                  Discard Changes
                </Button>

                <Button style={{ backgroundColor: "#2962f2", color: "#000" }}>
                  Save Changes
                </Button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </section>
  );
}
