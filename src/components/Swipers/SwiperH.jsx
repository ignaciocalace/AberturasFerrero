import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperH({ imagePaths }) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        lazy={true}
        modules={[Autoplay]}
        className="swiperH"
      >
        {imagePaths.map((imagePath, index) => (
          <SwiperSlide key={index}>
            <img src={imagePath} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
