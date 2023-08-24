import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import db from "../../../config/configFirestore.js";
import { collection, getDocs } from "firebase/firestore/lite";
import Loading from "../../../components/Loading/Loading.jsx";
import CardJobs from "../../../components/CardJob/CardJob.jsx";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const ITEMS_PER_PAGE = 10;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobData = querySnapshot.docs.map((doc) => doc.data());
        setJobs(jobData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const paginatedJobs = jobs
    .filter(
      (job) =>
        job.title &&
        job.category &&
        (!selectedType ||
          job.category.toLowerCase().includes(selectedType.toLowerCase()))
    )
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg />;
  }

  return (
    <>
      <Helmet>
        <title>Trabajos | Aberturas Ferrero</title>
      </Helmet>
      <div className="container-jobs">
        <h2>Nuestros trabajos</h2>

        <div className="select-container">
          <p>Mostrar: </p>
          <select
            className="select-list"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="He">Herrería</option>
            <option value="Al">Aluminio</option>
          </select>
        </div>

        <div className="grid-jobs">
          {paginatedJobs.map((job, index) => (
            <CardJobs
              key={index}
              title={job.title}
              type={
                job.category === "he"
                  ? job.type
                    ? `Herrería - ${job.type}`
                    : "Herrería"
                  : job.category === "Al"
                  ? job.type
                    ? `Aluminio - ${job.type}`
                    : "Aluminio"
                  : `Aluminio y Herrería - ${job.type}`
              }
              image={`./img/imgJobs/${job.images}/img1.jpg`}
              link={job.images}
            />
          ))}
        </div>

        <div className="pagination-container">
          <div className="pagination-controls">
            <Button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="2x"
                transform="grow-3"
                style={{ color: "#e69600c6" }}
              />
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
                transform="grow-3"
                style={{ color: "#e69600c6" }}
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
