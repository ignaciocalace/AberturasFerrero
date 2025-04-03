import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import Header from "./containers/Header/Header.jsx";
import Home from "./containers/pages/Home/Home.jsx";
import Jobs from "./containers/pages/Jobs/Jobs.jsx";
import Footer from "./containers/Footer/Footer.jsx";
import Login from "./containers/pages/Login/Login.jsx";
import Admin from "./containers/pages/Admin/Admin.jsx";
import Contact from "./containers/pages/Contact/Contact.jsx";
import Company from "./containers/pages/Company/Company.jsx";
import Services from "./containers/pages/Services/Services.jsx";
import JobDetail from "./containers/pages/JobDetail/JobDetail.jsx";
import JobsAdmin from "./containers/pages/Admin/JobsAdmin/JobsAdmin.jsx";
import Measurement from "./containers/pages/Measurement/Measurement.jsx";
import Employees from "./containers/pages/Admin/Employees/Employees.jsx";
import EmployeesDetails from "./containers/pages/Admin/Employees/EmployeesDetails/EmployeesDetails.jsx";

function App() {
  useEffect(() => {
    AOS.init();
    const initializeGTM = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-1G73Z3M8SY`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-1G73Z3M8SY");
      };
    };

    initializeGTM();
  }, []);

  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trabajos" element={<Jobs />} />
          <Route path="/trabajos/:jobId" element={<JobDetail />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/nosotros" element={<Company />} />
          <Route path="/contacto" element={<Contact />} />
          <Route
            path="/medidas"
            element={user ? <Measurement /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/login" />}
          />
          <Route path="/admin/trabajos" element={<JobsAdmin />} />
          <Route
            path="/admin/empleados"
            element={
              user ? <Employees user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/empleados/:id"
            element={
              user ? <EmployeesDetails user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
