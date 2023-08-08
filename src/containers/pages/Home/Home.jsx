import React from "react";
import { Link } from "react-router-dom";
import CardAbout from "../../../components/CardAbout/CardAbout.jsx";
import HomeImgCarr from "../../../components/HomeImgCarr/HomeImgCarr.jsx";
import { Helmet } from "react-helmet";

function Home({ show }) {
  return (
    <>
      <Helmet>
        <title>Aberturas Ferrero</title>
      </Helmet>
      <div
        className={`container-cards-home ${show ? "adjust-about-cards" : ""}`}
      >
        <h2>Más sobre nosotros</h2>
        <div className="card-about-container">
          <CardAbout
            image="/img/imgFixed/medal.svg"
            title="Calidad"
            description="Nos caracterizamos por brindar un servicio de primer nivel, entregando productos de alta calidad y acorde a tus necesidades."
          />
          <CardAbout
            image="/img/imgFixed/guarantee.svg"
            title="Garantía"
            description="Cada trabajo cuenta con garantía, asegurando la satisfacción del cliente y solucionando cualquier inconveniente o desperfecto de fabricación."
          />
          <CardAbout
            image="/img/imgFixed/clock.svg"
            title="Puntualidad"
            description="Nuestros servicios y productos son entregados en tiempo y forma, cumpliendo con los plazos acordados con nuestros clientes."
          />
        </div>
      </div>

      <div className="container-jobs-home">
        <h2>Conocé lo que hacemos</h2>
        <HomeImgCarr />
        <div className="container-jobs-home-btns">
          <Link to="/trabajos">Ver trabajos</Link>
          <Link to="/servicios">Ver servicios</Link>
        </div>
      </div>

      <div className="container-contact-home">
        <h2>Tus proyectos se pueden hacer realidad</h2>
        <h2>
          Contacta con nosotros por <span>correo electrónico</span>,{" "}
          <span>WhatsApp</span> o <span>teléfono</span>
        </h2>
        <Link to="/contacto">Más información</Link>
      </div>
    </>
  );
}

export default Home;
