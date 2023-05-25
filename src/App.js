import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewPage from "./Pages/OverviewPage/OverviewPage";
import "./App.css";

import SignInPage from "./Pages/SignInPage/SignInPage";
import View from "./Pages/View";

function App(props) {
  return (
    <>
      <div className="contents-container">
        <Routes>
          <Route index element={<SignInPage />} />

          <Route path="view" index element={<View />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
