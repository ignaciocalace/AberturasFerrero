import React from "react";
import { Helmet } from "react-helmet";
import CardContact from "../../../components/CardContact/CardContact.jsx";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle.jsx";

function Contact() {
  const SocialIcon = ({ platform }) => {
    return (
      <svg
        className={`social-icon ${platform}`}
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() =>
          window.open(
            platform === "facebook"
              ? "https://www.facebook.com/profile.php?id=100093168695820"
              : "https://www.instagram.com/aberturasferrero/",
            "_blank"
          )
        }
      >
        {platform === "facebook" ? (
          <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.82V14.708H9.692v-3.615H12.82V8.151c0-3.094 1.89-4.785 4.659-4.785 1.325 0 2.463 0.099 2.795 0.144v3.24h-1.918c-1.504 0-1.796 0.715-1.796 1.763v2.313h3.587l-0.467 3.615h-3.12V24h6.116c0.732 0 1.325-0.593 1.325-1.325V1.325C24 0.593 23.407 0 22.675 0z" />
        ) : (
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        )}
      </svg>
    );
  };
  return (
    <>
      <Helmet>
        <title>Nosotros | Aberturas Ferrero</title>
      </Helmet>
      <div className="contact-container">
        <HeaderTitle text={"Contacto"} />

        <div className="contact-info-container">
          <div className="card-contact-container">
            <CardContact
              className="card-whatsapp"
              image={"/img/imgFixed/whatsapp.png"}
              title={"Whatsapp"}
              description={"+598 94 285 654"}
              description1={"+598 94 322 635"}
              link={"https://wa.me/+59894285654?"}
              link1={"https://wa.me/+5989322635?"}
            />
            <CardContact
              className="card-phone"
              image={"/img/imgFixed/phone.png"}
              title={"Teléfono"}
              description={"094 285 654"}
              description1={"094 322 635"}
              link={"tel:+59894285654"}
              link1={"tel:+59894322635"}
            />
            <CardContact
              className={"card-email"}
              image={"/img/imgFixed/email.png"}
              title={"Email"}
              description={"aberturas@hotmail.com"}
              description1={"aberturasferrerotaller@gmail.com"}
              link={"mailto:aberturas@hotmail.com"}
              link1={"mailto:aberturasferrerotaller@gmail.com"}
            />
            <div
              className="social-container"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-offset="-150"
            >
              <SocialIcon platform="facebook" />
              <SocialIcon platform="instagram" />
            </div>
          </div>

          <div
            className="map-container"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13102.496344887566!2d-55.9373871!3d-34.8153982!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f073dcb42adf4c5%3A0xa2bb45c8c58ed5bb!2sAberturas%20Ferrero!5e0!3m2!1ses-419!2suy!4v1718981545779!5m2!1ses-419!2suy"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aberturas Ferrero Location"
            ></iframe>
            <p>Lomas de Solymar, Canelones, Uruguay.</p>
          </div>
        </div>
        <div
          className="info-social-container"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-offset="-150"
        >
          <h4>
            Nuestro horario de atención es de
            <strong> Lunes a Viernes de 8hs a 17hs</strong>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Contact;
