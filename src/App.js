import "./index.scss";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./containers/Header/Header.jsx";
import Home from "./containers/pages/Home/Home.jsx";
import Jobs from "./containers/pages/Jobs/Jobs.jsx";
import Footer from "./containers/Footer/Footer.jsx";
import Contact from "./containers/pages/Contact/Contact.jsx";
import Company from "./containers/pages/Company/Company.jsx";
import Services from "./containers/pages/Services/Services.jsx";
import JobDetail from "./containers/pages/JobDetail/JobDetail.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [show, setShow] = useState(false);

  const handleShowChange = (show) => {
    setShow(show);
  };

  return (
    <>
      <BrowserRouter>
        <Header onShowChange={handleShowChange} />
        <Routes>
          <Route path="/" element={<Home show={show} />} />
          <Route path="/trabajos" element={<Jobs />} />
          <Route path="/trabajos/:jobId" element={<JobDetail />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/nosotros" element={<Company />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
