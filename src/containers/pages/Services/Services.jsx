import React from "react";
import { Helmet } from "react-helmet";
import CardExpandable from "../../../components/CardExpandable/CardExpandable.jsx";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";

const Services = () => {
  const infoAluminio = [
    {
      Ventanas: {
        description: "Contamos con diferentes tipos de lineas de carpinteria:",
        details: [
          "Livianas: Serie 20, Serie 25 y Serie 30 Mecal.",
          "Media: Serie 25 Plus y variaciones, Serie Probba.",
          "Alta prestación: Serie Módena, Serie Gala, Serie A30 New y Seria Summa.",
        ],
      },
    },
    {
      "Cortinas de enrollar": {
        description:
          "Fabricación e instalación doméstica de cortinas de enrollar en PVC y aluminio con poliuretano expandido, manuales o automatizadas.",
      },
    },
    {
      Cerramientos: {
        description:
          "Cerramientos de barbacoas, galerías, balcones y terrazas, con múltiples combinaciones de aberturas.",
      },
    },
    {
      Claraboyas: {
        description:
          "Fabricación, colocación y reposición de claraboyas en perfiles tradicionales o modernos, con variedad de vidriado, simple o termoacústicos.",
      },
    },
    {
      "Techos Livianos": {
        description: "Fabricados en estructura de aluminio y policarbonato.",
      },
    },
    {
      Vidrieria: {
        description:
          "Instalación de vidrios, reposición, frentes comerciales, mamparas de baño y barandas.",
      },
    },
  ];

  const infoHierro = [
    {
      Rejas: {
        description:
          "Rejas de todos los estilos, fijas y móviles. Para ventanas, puertas y puertas ventanas.",
      },
    },
    {
      "Verjas Perimetrales": {
        description: "Cerramientos de terrenos en varios estilos.",
      },
    },
    {
      Escaleras: {
        description:
          "Escaleras de diferentes usos, residenciales, comerciales y de protección.",
      },
    },
    {
      Portones: {
        description:
          "Portones corredizos, levadizos, basculantes de acceso y de uso interno.",
      },
    },
    {
      Automatización: {
        description:
          "Automatización y mantenimiento de cortinas de enrollar, portones, rampas y claraboyas.",
      },
    },
  ];

  const whatsappMessage = `Buenas! Quería obtener más información sobre sus servicios.`;
  const whatsappLink = `https://wa.me/+59894285654?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  return (
    <>
      <Helmet>
        <title>Servicios | Aberturas Ferrero</title>
      </Helmet>
      <div className="container-services">
        <HeaderTitle
          text={"Servicios"}
          backgroundImage="/img/imgFixed/jobsHome/ventanas/ventana2.jpg"
        />
        <div className="grid-services">
          <CardExpandable
            className="item-service"
            image={`./img/imgFixed/aluminio.jpg`}
            title={`Carpinteria de Aluminio`}
            text={`Trabajamos con dos de las empresas más destacadas en Uruguay: Abasur S.A. y Aluminios del Uruguay S.A., garantizando calidad y confianza en cada proyecto.`}
            info={infoAluminio}
          />
          <CardExpandable
            className="item-service"
            image={`./img/imgFixed/herreria.jpg`}
            title={`Herrería`}
            text={`Si lo que busca es seguridad, decoración o ambas, nuestros servicios de herrería son la mejor opción. Ofrecemos trabajos personalizados de primera calidad.`}
            info={infoHierro}
          />
        </div>
        <div
          className="container-button"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-offset="105"
        >
          <p className="container-button-text">
            Si está buscando asesoramiento para su proyecto, no dudes en
            contactarnos.
          </p>
          <Link
            className="container-button-link"
            to={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Me gustaría hacer otra consulta{" "}
            <FontAwesomeIcon
              icon={faWhatsapp}
              bounce
              transform="grow-5 right-5"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Services;
