import React from "react";
import SwiperH from "../Swipers/SwiperH.jsx";

function HomeImgCarr() {
  const imagePaths1 = [
    "/img/imgJobs/1/DSC_8224.jpg",
    "/img/imgJobs/2/DSC_8229.jpg",
  ];
  return (
    <>
      <div className="container-jobs-homeimgcarr">
        <div className="container-jobs-presentation">
          <SwiperH imagePaths={imagePaths1} />
          <h3>Ventanas</h3>
        </div>
        <div className="container-jobs-presentation">
          <SwiperH imagePaths={imagePaths1} />
          <h3>Cerramientos</h3>
        </div>
        <div className="container-jobs-presentation">
          <SwiperH imagePaths={imagePaths1} />
          <h3>Herrería</h3>
        </div>
      </div>
    </>
  );
}

export default HomeImgCarr;
