import React, { useEffect, useState } from "react";
import { FaAndroid } from "react-icons/fa";
import {
  SiDell,
  SiHp,
  SiAsus,
  SiHcl,
  Si4Chan,
  SiApacheflink,
  SiArc,
  SiApple,
  SiAwesomelists,
  SiBaidu,
  SiBookmyshow,
  SiBurgerking,
  SiCounterstrike,
  SiEa,
  SiEpson,
  SiExordo,
} from "react-icons/si";
import { IoLogoWindows } from "react-icons/io";
import { TbBrandGoogleFilled } from "react-icons/tb";
import Navbar from "../Components/Navbar";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [toggleViewNotes, setToggleViewNotes] = useState(false);
  const [actveLabel, setActiveLabel] = useState(0);
  const searchPlaceholder = "Search Electronics , Products, Groccery..";
  const [noteName, setNoteName] = useState("");
  const [styleView, setStyleView] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState({
    noteName: "",
  });
  const productsList = [
    <IoLogoWindows />,
    <SiApple />,
    <TbBrandGoogleFilled />,
    <SiHcl />,
    <SiAsus />,
    <SiHp />,
    <SiDell />,
    <FaAndroid />,
    <Si4Chan />,
    <SiApacheflink />,
    <SiBurgerking />,
    <SiExordo />,
    <SiEpson />,
    <SiEa />,
    <SiArc />,
    <SiAwesomelists />,
    <SiBookmyshow />,
    <SiBaidu />,
    <SiCounterstrike />,
  ];
  const handleRefresh = () => {
    window.location.reload();
  };
  const onChangeSearchName = (e) => {
    const { name, value } = e.target;
    setNoteName(value);
  };

  return (
    <>
      <div className="main-page add-scroll-bar flex-col">
        <div>
          <Navbar
            searchName={noteName}
            changeSearchName={onChangeSearchName}
            styleView={styleView}
            changeStyleView={() => setStyleView(!styleView)}
            searchPlaceholder={searchPlaceholder}
            notesTile={selectedNotes.noteName}
            refreshAction={() => setRefresh(!refresh)}
            headerName=""
          />
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column basic-center-div w-100">
            <div className="header-text center">Our Vendors</div>
            <div
              className={`mt-2 notes-small-container full-container add-scroll-bar `}
            >
              {productsList.map((product, index) => {
                return (
                  <div
                    className=" contact-product-list basic-center-div"
                    key={index}
                  >
                    {product}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
