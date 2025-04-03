import React, { useEffect, useState } from "react";
import { db } from "../../../../config/configFirestore";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading.jsx";
import ErrorMsg from "../../../../components/ErrorMsg/ErrorMsg.jsx";
import HeaderTitle from "../../../../components/HeaderTitle/HeaderTitle.jsx";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    idNumber: "",
    position: "",
    hireDate: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const employeesCollection = collection(db, "Employees");
          const querySnapshot = await getDocs(employeesCollection);
          const employeesList = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setEmployees(employeesList);
        } catch (error) {
          console.error("Error fetching employees:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Está seguro que qquiere eliminar este empleado?")) {
      await deleteDoc(doc(db, "Employees", id));
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (
      !newEmployee.name ||
      !newEmployee.email ||
      !newEmployee.position ||
      !newEmployee.hireDate
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Employees"), newEmployee);
      setEmployees([...employees, { id: docRef.id, ...newEmployee }]);
      setNewEmployee({
        name: "",
        email: "",
        idNumber: "",
        position: "",
        hireDate: "",
      });
      alert("Empleado agregado correctamente.");
    } catch (error) {
      setError(error);
      console.error("Error adding employee:", error);
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMsg message={error} />;

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="employees-container">
      <HeaderTitle text="Empleados" />
      <button className="button button-back" onClick={() => navigate("/admin")}>
        Volver al Administrador
      </button>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Puesto</th>
            <th>Fecha de contratación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.idNumber}</td>
              <td>{employee.position}</td>
              <td>{employee.hireDate}</td>
              <td className="table-actions">
                <button
                  className="button button-view"
                  onClick={() => navigate(`/admin/empleados/${employee.id}`)}
                >
                  Horarios
                </button>
                <button
                  className="button button-delete"
                  onClick={() => handleDelete(employee.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar Nuevo Empleado</h2>
      <form className="employee-form" onSubmit={handleAddEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newEmployee.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={newEmployee.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="idNumber"
          placeholder="Cédula"
          value={newEmployee.idNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Puesto"
          value={newEmployee.position}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="hireDate"
          value={newEmployee.hireDate}
          onChange={handleChange}
          required
        />
        <button className="button button-add" type="submit">
          Agregar Empleado
        </button>
      </form>
    </div>
  );
};

export default Employees;
