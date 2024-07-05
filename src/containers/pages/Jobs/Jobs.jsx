import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/configFirestore.js";
import { collection, getDocs } from "firebase/firestore/lite";
import Loading from "../../../components/Loading/Loading.jsx";
import CardJob from "../../../components/CardJob/CardJob.jsx";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ITEMS_PER_PAGE, setItemsPerPage] = useState(determineItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      const itemsPerPage = determineItemsPerPage();
      setItemsPerPage(itemsPerPage);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function determineItemsPerPage() {
    return window.innerWidth <= 1090 ? 8 : 9;
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "JobsNew"));
        const jobData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setJobs(jobData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const paginatedJobs = jobs
    .filter((job) => {
      if (!job.title || !job.category) return false;

      if (
        selectedCategory &&
        !job.category.match(new RegExp(selectedCategory, "i"))
      ) {
        return false;
      }

      if (selectedType === "Otros" && job.category.match(/Al/i)) {
        const specificTypes = [
          "Serie 20",
          "Serie 25",
          "Serie 25 Plus",
          "Serie 25 MAX",
          "Serie 30 Mecal",
          "Serie Probba",
          "Serie Módena",
          "Serie Gala",
          "Serie Gala CR",
          "Serie A30 New",
          "Serie Summa",
          "Otros",
        ];
        return !specificTypes.some((type) =>
          job.type.match(new RegExp(type, "i"))
        );
      }

      if (selectedType && !job.type.match(new RegExp(selectedType, "i"))) {
        return false;
      }

      return true;
    })
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
        <HeaderTitle text="Nuestros trabajos" />
        <div className="select-container">
          <p>Mostrar: </p>
          <select
            className="select-list"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Aluminio">Aluminio</option>
            <option value="Herreria">Herrería</option>
            <option value="Aluminio y Herreria">Aluminio y Herrería</option>
            <option value="Otros">Otros</option>
          </select>

          {selectedCategory === "Aluminio" && (
            <select
              className="select-list"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">-</option>
              <option value="Serie 20">Serie 20</option>
              <option value="Serie 25">Serie 25</option>
              <option value="Serie 25 Plus">Serie 25 Plus</option>
              <option value="Serie 25 MAX">Serie 25 MAX</option>
              <option value="Serie 30 Mecal">Serie 30 Mecal</option>
              <option value="Serie Probba">Serie Probba</option>
              <option value="Serie Módena">Serie Módena</option>
              <option value="Serie Gala">Serie Gala</option>
              <option value="Serie Gala CR">Serie Gala CR</option>
              <option value="Serie A30 New">Serie A30 New</option>
              <option value="Serie Summa">Serie Summa</option>
              <option value="Otros">Otros</option>
            </select>
          )}
        </div>

        <div className="grid-jobs">
          {paginatedJobs.map((job, index) => (
            <CardJob
              key={index}
              title={job.title}
              type={
                job.category === "Hereria"
                  ? job.type
                    ? `Herrería - ${job.type}`
                    : "Herrería"
                  : job.category === "Aluminio"
                  ? job.type
                    ? `Aluminio - ${job.type}`
                    : "Aluminio"
                  : job.category === "Aluminio y Herreria"
                  ? `Aluminio y Herrería - ${job.type}`
                  : `Otros - ${job.type}`
              }
              image={
                job.images && job.images.length > 0
                  ? job.images[0]
                  : `./img/imgJobs/placeholder.jpg`
              }
              link={job.id}
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
