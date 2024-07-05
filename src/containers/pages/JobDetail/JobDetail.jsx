import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../../../config/configFirestore.js";
import { doc, getDoc } from "firebase/firestore/lite";
import Loading from "../../../components/Loading/Loading.jsx";
import { Link, useLocation, useParams } from "react-router-dom";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg.jsx";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const location = useLocation();
  const whatsappMessage = `Buenas! Quiero algo similar a esto: https://aberturasferrero.com${location.pathname}`;
  const whatsappLink = `https://wa.me/+59894285654?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  useEffect(() => {
    const getJob = async () => {
      try {
        const jobRef = doc(db, "JobsNew", jobId);
        const jobSnapshot = await getDoc(jobRef);

        if (jobSnapshot.exists()) {
          setJob(jobSnapshot.data());
        } else {
          setError("No existe el trabajo solicitado.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [jobId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg />;
  }

  const renderSwiperSlides = () => {
    return job.images.map((image, index) => (
      <SwiperSlide key={index}>
        <img src={image} alt={`${job.title} ${index + 1}`} loading="lazy" />
      </SwiperSlide>
    ));
  };

  return (
    <div className="container-job-detail">
      <Helmet>
        <title>{job.title} | Aberturas Ferrero</title>
        <meta property="og:title" content={job.title} />
        <meta
          property="og:description"
          content={`${job.type} - ${job.description}`}
        />
        <meta property="og:image" content={job.images[0]} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <h2>{job.title}</h2>
      <div
        className="container-swipers"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <Swiper
          className="swiperJobs-img"
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {renderSwiperSlides()}
        </Swiper>
        <Swiper
          className="swiperJobs-thumbs"
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          breakpoints={{
            1: {
              slidesPerView: 3.3,
            },

            768: {
              slidesPerView: 4.3,
            },

            1024: {
              slidesPerView: Math.min(6.3, job.images.length),
            },
          }}
        >
          {renderSwiperSlides()}
        </Swiper>
      </div>
      <div
        className="container-card-text"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <h3>{job.type}</h3>
        <p>{job.description}</p>
        <Link to={whatsappLink} target="_blank" rel="noopener noreferrer">
          Quiero algo similar{" "}
          <FontAwesomeIcon
            icon={faWhatsapp}
            bounce
            transform="grow-5 right-5"
          />
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;
