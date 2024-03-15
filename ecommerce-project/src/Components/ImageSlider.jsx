import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ImageSlider = ({ imgeList }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgeList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgeList.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="my-2 Image-slider">
      <img
        src={imgeList[currentImageIndex]}
        alt="Slider Image"
        onError={(e) => {
          const randomIndex = Math.floor(Math.random() * imgeList.length);
          e.target.src = fallbackImages[randomIndex];
          e.target.onerror = null;
        }}
      />
      <button className="img-slide-btn left" onClick={prevImage}>
        <MdKeyboardArrowLeft />
      </button>
      <button className="img-slide-btn right" onClick={nextImage}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default ImageSlider;
