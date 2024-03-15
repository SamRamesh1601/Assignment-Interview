import React, { useState, useRef } from "react";
import { FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPeoplePulling, FaCartShopping } from "react-icons/fa6";
import { MdOutlineSettings, MdHome, MdOutlineWebhook } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { BsHandbagFill } from "react-icons/bs";

const Sidebar = ({ open }) => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const isOpen = Boolean(toggleOpen);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const onNavigation = (path) => {
    navigate(path);
  };
  const handleMouseEnter = () => {
    setToggleOpen(true);
  };

  const handleMouseLeave = () => {
    setToggleOpen(false);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const sidebarNav = [
    { name: "Home", img: <MdHome />, path: "/" },
    { name: "Shop Now", img: <FaCartShopping />, path: "/shop" },
    { name: "Cart", img: <FaShoppingBasket />, path: "/cart" },
    { name: "My Orders", img: <BsHandbagFill />, path: "/orders" },
    { name: "Contact", img: <FaPeoplePulling />, path: "/contact" },
  ];
  const { pathname } = useLocation();
  return (
    <>
      <div
        className={`sidebar-app ${
          !isOpen && "not-open"
        } basic-center-div flex-col`}
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`sidebar-head basic-center-div  ${!isOpen && "not-open"}`}
        >
          <div className={`mini-head-text unique ${!isOpen && "not-show"}`}>
            Ecommerce
          </div>
          <span
            className="side-icon outline"
            onClick={() => setToggleOpen(!toggleOpen)}
          >
            {isOpen ? <MdOutlineWebhook /> : <IoReorderThree />}
          </span>
        </div>
        <div
          className={`mini-sub-sidebar ${
            !isOpen && "not-open"
          } basic-center-div flex-col`}
        >
          {sidebarNav.map((nav, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  if (nav.name === "New Notes") {
                    setShowAddNotes(true);
                  } else {
                    onNavigation(nav.path || "/");
                  }
                  setActiveNav(i);
                }}
                className={`mini-mini-sub-sidebar basic-center-div
                  ${pathname === nav.path && "active"}
                  ${!isOpen && "not-open"}`}
              >
                <div className={`side-icon small ${!isOpen && "not-open"}`}>
                  {nav.img}
                </div>
                <div className={`mini-head-text ${!isOpen && "not-show"}`}>
                  {nav.name}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`sidebar-head bottom  basic-center-div ${
            !isOpen && "not-open"
          }`}
        >
          <span className="side-icon">
            <MdOutlineSettings />
          </span>
          <div className={`mini-head-text big ${!isOpen && "not-show"}`}>
            Settings
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

{
  /* <span className={`three-dot-icon ${!isOpen && 'not-open'}`}  onClick ={(e) => {  setToggleOpen(!toggleOpen); e.stopPropagation(); }} >{!isOpen ? <IoReorderThree /> : <IoCloseOutline />}</span> */
}
