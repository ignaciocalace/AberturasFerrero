import React from "react";
import { Helmet } from "react-helmet";
import CardContact from "../../../components/CardContact/CardContact.jsx";

function Contact() {
  return (
    <>
      <Helmet>
        <title>Nosotros | Aberturas Ferrero</title>
      </Helmet>
      <div className="container-cards-contact">
        <div>
          <h2>Contacto</h2>
        </div>
        <div className="card-contact-container">
          <CardContact
            className="card-phone"
            image={"/img/imgFixed/phone.png"}
            title={"Teléfono"}
            description={"094 285 654"}
            link={"tel:+59894285654"}
            btnMsg={"Llamar"}
          />
          <CardContact
            className={"card-email"}
            image={"/img/imgFixed/email.png"}
            title={"Email"}
            description={"aberturas@hotmail.com"}
            link={"mailto:aberturas@hotmail.com"}
            btnMsg={"Enviar correo"}
          />
          <CardContact
            className="card-whatsapp"
            image={"/img/imgFixed/whatsapp.png"}
            title={"Whatsapp"}
            description={"+598 94 28 56 54"}
            link={"https://wa.me/+59894285654?"}
            btnMsg={"Chatear"}
          />
        </div>
        <div className="info-contact-container">
          <h4>
            Nuestro horario de atención es de
            <strong> Lunes a Viernes de 8hs a 17hs</strong>
          </h4>
          <p>Lomas de Solymar, Canelones, Uruguay.</p>
        </div>
      </div>
    </>
  );
}

export default Contact;
