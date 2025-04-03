import React from "react";
import { Helmet } from "react-helmet";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";

const Company = () => {
  return (
    <>
      <Helmet>
        <title>Nosotros | Aberturas Ferrero</title>
      </Helmet>
      <div className="container-company">
        <HeaderTitle
          text={"Nosotros"}
          backgroundImage="/img/imgFixed/jobsHome/ventanas/ventana3.jpg"
        />
        <div
          className="card-def card-company"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="content">
            <div
              className="image-container"
              data-aos="fade-up"
              data-aos-duration="600"
            ></div>
            <div
              className="text-container"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              <h3>Impulsados por la pasión, guiados por la excelencia</h3>
              <p>
                Con casi tres décadas de experiencia en el sector, nuestra
                empresa se dedica a ofrecer
                <strong>servicios de la más alta calidad.</strong> Nos guían
                nuestros principios fundamentales de honestidad, integridad y
                excelencia. Nos esforzamos en poner siempre las necesidades de
                nuestros clientes al frente, trabajando constantemente para
                mejorar nuestros servicios.
              </p>
              <p>
                En nuestro equipo, creemos en la innovación continua y
                trabajamos incansablemente para superar las expectativas de
                nuestros clientes. Durante años, hemos construido una reputación
                sólida fundamentada en la integridad y el compromiso.
                <strong>
                  Nuestro objetivo es mantenernos como un socio confiable para
                  nuestros clientes,
                </strong>
                brindando soluciones personalizadas que satisfacen sus
                necesidades y les ayudan a alcanzar sus objetivos.
              </p>
              <p>
                Si busca una empresa comprometida con la calidad de sus
                servicios y con una excepcional atención al cliente, no busque
                más.
                <strong> Somos el equipo que está buscando.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
