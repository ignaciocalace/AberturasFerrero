import React from "react";
import { Helmet } from "react-helmet";
import CardExpandable from "../../../components/CardExpandable/CardExpandable.jsx";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
        <h2>Servicios</h2>
        <div className="grid-services">
          <CardExpandable
            className="item-service"
            image={`./img/imgFixed/aluminio.jpg`}
            title={`Carpinteria de Aluminio`}
            text={`Trabajamos con 2 de las empresas más reconocidas en el Uruguay, Abasur S.A. y Aluminios del Uruguay S.A.`}
            info={infoAluminio}
          />
          <CardExpandable
            className="item-service"
            image={`./img/imgFixed/herreria.jpg`}
            title={`Herrería`}
            text={`Si lo que busca es seguirdad, decoración o ambas, nuestros servicios de herrería son la mejor opción.`}
            info={infoHierro}
          />
        </div>
        <div className="container-button">
          <Link to={whatsappLink} target="_blank" rel="noopener noreferrer">
            Necesito más información{" "}
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
