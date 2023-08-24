import React from "react";
import SwiperH from "../Swipers/SwiperH.jsx";

function HomeImgCarr() {
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const imagePathsVentanas = shuffleArray(
    Array.from(
      { length: 5 },
      (_, index) => `/img/imgFixed/jobsHome/ventanas/ventana${index + 1}.jpg`
    )
  );
  const imagePathsCerramientos = shuffleArray(
    Array.from(
      { length: 13 },
      (_, index) =>
        `/img/imgFixed/jobsHome/cerramientos/cerramientos${index + 1}.jpg`
    )
  );
  const imagePathsHerreria = shuffleArray(
    Array.from(
      { length: 6 },
      (_, index) => `/img/imgFixed/jobsHome/herreria/herreria${index + 1}.jpg`
    )
  );

  return (
    <div className="container-jobs-homeimgcarr">
      <div
        className="container-jobs-presentation"
        data-aos="fade-right"
        data-aos-duration="600"
        data-aos-offset="150"
      >
        <SwiperH imagePaths={imagePathsVentanas} />
        <h3>Ventanas</h3>
      </div>
      <div
        className="container-jobs-presentation"
        data-aos="fade-right"
        data-aos-duration="600"
        data-aos-offset="150"
      >
        <SwiperH imagePaths={imagePathsCerramientos} />
        <h3>Cerramientos</h3>
      </div>
      <div
        className="container-jobs-presentation"
        data-aos="fade-right"
        data-aos-duration="600"
        data-aos-offset="150"
      >
        <SwiperH imagePaths={imagePathsHerreria} />
        <h3>Herrería</h3>
      </div>
    </div>
  );
}

export default HomeImgCarr;
