import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperH({ imagePaths }) {
  const getRandomDelay = () => {
    const baseDelay = 2500;
    const randomVariation = Math.floor(Math.random() * 1000);
    return baseDelay + randomVariation;
  };

  return (
    <>
      <Swiper
        className="swiperH"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: getRandomDelay(),
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        modules={[Autoplay]}
      >
        {imagePaths.map((imagePath, index) => (
          <SwiperSlide key={index}>
            <img
              src={imagePath}
              alt={imagePath.split("/").pop() || `Slide ${index + 1}`}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
