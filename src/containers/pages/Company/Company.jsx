import React from "react";
import { Helmet } from "react-helmet";

const Company = () => {
  return (
    <>
      <Helmet>
        <title>Nosotros | Aberturas Ferrero</title>
      </Helmet>
      <div className="container-company">
        <h2>Sobre nosotros</h2>
        <div className="card-def card-company">
          <div className="content">
            <div className="image-container">
              <div className="zoom-effect"></div>
            </div>
            <div className="text-container">
              <h3>Impulsados por la pasión, guiados por la excelencia</h3>
              <p>
                Con casi tres décadas de experiencia en el sector, nuestra
                empresa se dedica a ofrecer{" "}
                <span>servicios de la más alta calidad.</span> Nos guían
                nuestros principios fundamentales de honestidad, integridad y
                excelencia. Nos esforzamos en poner siempre las necesidades de
                nuestros clientes al frente, trabajando constantemente para
                mejorar nuestros servicios.
              </p>
              <p>
                En nuestro equipo, creemos en la innovación continua y
                trabajamos incansablemente para superar las expectativas de
                nuestros clientes. Durante años, hemos construido una reputación
                sólida fundamentada en la integridad y el compromiso. Nuestro
                objetivo es mantenernos como un socio confiable para nuestros
                clientes, proporcionando soluciones personalizadas que
                satisfacen sus necesidades y les ayudan a alcanzar sus
                objetivos.
              </p>
              <p>
                Si busca una empresa comprometida con la calidad de sus
                servicios y con una excepcional atención al cliente, no busque
                más.
                <span> Somos el equipo que está buscando.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
