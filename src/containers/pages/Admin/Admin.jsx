import "./Admin.scss";

import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg.jsx";

Modal.setAppElement("#root");

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  if (loading) return <Loading />;
  if (error) return <ErrorMsg message={error} />;
  return (
    <div className="container-admin">
      <HeaderTitle text="Panel Administración" />
      <div className="logout-button-container">
        <button
          className="button-standard button-logout"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
      <div>
        <h2>Bienvenido {user.displayName || "usuario"}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user.uid}
        </p>
        <div className="button-group">
          <button
            className="button-jobs"
            onClick={() => navigate("/admin/trabajos")}
          >
            Administrador de trabajos
          </button>
          <button
            className="button-employees"
            onClick={() => navigate("/admin/empleados")}
          >
            Administrador de empleados
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
