import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import db from "../../../config/configFirestore.js";
import { collection, getDocs } from "firebase/firestore/lite";
import Loading from "../../../components/Loading/Loading.jsx";
import CardJobs from "../../../components/CardJob/CardJob.jsx";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Servicio en Mantenimiento</div>;
  }

  return (
    <>
      <Helmet>
        <title>Trabajos | Aberturas Ferrero</title>
      </Helmet>
      <div className="container-jobs">
        <h2>Nuestros trabajos</h2>
        <div className="grid-jobs">
          {jobs.map((job, index) => (
            <CardJobs
              key={index}
              title={job.title}
              type={
                job.type === "Herrería" ? job.type : `Aluminio - ${job.type}`
              }
              image={`./img/imgJobs/${job.images}/img1.jpg`}
              link={job.images}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
