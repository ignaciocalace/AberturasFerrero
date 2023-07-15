import React from "react";
import CardContact from "../../../components/CardContact/CardContact.jsx";

function Contact() {
  return (
    <div className="container-cards-contact">
      <div>
        <h1>Contacto</h1>
      </div>
      <div className="card-contact-container">
        <CardContact
          className={"card-email"}
          image={"/img/imgFixed/mail.svg"}
          title={"Email"}
          description={"aberturas@hotmail.com"}
          link={"mailto:aberturas@hotmail.com"}
          btnMsg={"Enviar correo"}
        />
        <CardContact
          className="card-phone"
          image={"/img/imgFixed/phone.svg"}
          title={"Teléfono"}
          description={"094 285 654"}
          link={"tel:+59894285654"}
          btnMsg={"Llamar"}
        />
        <CardContact
          className="card-whatsapp"
          image={"/img/imgFixed/whatsapp.svg"}
          title={"Whatsapp"}
          description={""}
          link={"https://wa.me/+59894285654?"}
          btnMsg={"Chatear"}
        />
      </div>
      <div>
        <h4>
          Nuestro horario de atención es de
          <strong> Lunes a Viernes de 8hs a 17hs</strong>
        </h4>
        <p>Lomas de Solymar, Canelones, Uruguay.</p>
      </div>
    </div>
  );
}

export default Contact;
