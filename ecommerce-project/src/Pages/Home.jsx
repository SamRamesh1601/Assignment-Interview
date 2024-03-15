import React, { useEffect, useState } from "react";
import LoadingImg from "../Assets/Loading.gif";
import Navbar from "../Components/Navbar";
import { FaArrowRight } from "react-icons/fa6";
import { CiMobile3 } from "react-icons/ci";
import { TfiApple } from "react-icons/tfi";
import { AiOutlineTablet } from "react-icons/ai";
import { FaAndroid } from "react-icons/fa";
import { SiDell, SiHp, SiAsus } from "react-icons/si";

import { TbBrandGoogleFilled } from "react-icons/tb";
import { RiWindowsLine } from "react-icons/ri";
import ImageSlider from "../Components/ImageSlider";
import ViewProduct from "./ViewProduct";
import Delivery from "./Delivery";

const SmallContainerList = () => {
  const productsList = [
    <RiWindowsLine />,
    <TfiApple />,
    <TbBrandGoogleFilled />,
    <AiOutlineTablet />,
    <SiAsus />,
    <SiHp />,
    <SiDell />,
    <FaAndroid />,
    <CiMobile3 />,
  ];
  return (
    <div className="product-list">
      {productsList.map((product, index) => {
        return (
          <div className="product-semi-ls basic-center-div" key={index}>
            {product}
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [toggleViewNotes, setToggleViewNotes] = useState(false);
  const searchPlaceholder = "Search Electronics , Products, Groccery..";
  const [noteName, setNoteName] = useState("");
  const [styleView, setStyleView] = useState(false);
  const [notesList, setNotesList] = useState([]);

  const handleRefresh = () => {
    window.location.reload();
  };
  const onChangeSearchName = (e) => {
    const { name, value } = e.target;
    setNoteName(value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, [refresh]);

  const images = [
    "./src/Assets/product-add/p6.png",
    "./src/Assets/product-add/p5.png",
    "./src/Assets/product-add/p7.png",
    "./src/Assets/product-add/p.png",
    "./src/Assets/product-add/p1.png",
    "./src/Assets/product-add/p2.jpg",
    "./src/Assets/product-add/p3.jpg",
    "./src/Assets/product-add/p4.png",
  ];

  return (
    <>
      {loading && (
        <div className="loading-bg basic-center-div">
          <img src={LoadingImg} alt="Loading" />
        </div>
      )}
      <div className="main-page add-scroll-bar flex-col">
        <Navbar
          searchName={noteName}
          changeSearchName={onChangeSearchName}
          styleView={styleView}
          changeStyleView={() => setStyleView(!styleView)}
          searchPlaceholder={searchPlaceholder}
          refreshAction={() => setRefresh(!refresh)}
        />
        <div className="d-flex">
          <div className="d-flex flex-column basic-center-div w-100">
            <ImageSlider imgeList={images} />
            <div className="mt-2 notes-container add-scroll-bar">
              <span className="header-text">
                New Products released
                <span className="mx-2">
                  <FaArrowRight />
                </span>
              </span>
              <SmallContainerList productsList={notesList} />
            </div>
          </div>
          {toggleViewNotes && (
            <ViewProduct
              productDetails={selectedNotes}
              closeProductDetails={() => {
                setToggleViewNotes(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
