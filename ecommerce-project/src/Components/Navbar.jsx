import React from "react";
import { IoIosSearch } from "react-icons/io";
import { TbDeviceTabletSearch } from "react-icons/tb";
import { MdArrowForwardIos, MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import logoImg from "../Assets/logo.jpg";
import { PiShoppingCartLight } from "react-icons/pi";
import { MdOutlineRefresh } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiShoppingCart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";

const Navbar = ({
  searchName,
  changeSearchName,
  searchPlaceholder,
  styleView,
  changeStyleView,
  refreshAction,
  headerName = "",
}) => {
  const navigate = useNavigate();
  const onNavigationToPath = (path) => {
    navigate(path);
  };
  const { pathname } = useLocation();

  return (
    <div className="navbar-App">
      <div className={`nav-search-container not-selected"`}>
        <span className="nav-icon">
          <IoIosSearch />
        </span>
        <input
          type="text"
          name="noteName"
          onChange={changeSearchName}
          value={searchName}
          placeholder={searchPlaceholder}
        />
      </div>
      {headerName && <div className="header-text big">{headerName}</div>}

      <div className="nav-login-container">
        <span
          className="nav-icon logo"
          onClick={() => onNavigationToPath("/favorite")}
        >
          {pathname === "/favorite" ? (
            <MdOutlineFavorite />
          ) : (
            <MdFavoriteBorder />
          )}
        </span>
        <span
          className="nav-icon logo"
          onClick={() => onNavigationToPath("/cart")}
        >
          {pathname === "/cart" ? <FaCartShopping /> : <PiShoppingCartLight />}
        </span>
        <span className="nav-icon logo" onClick={() => refreshAction()}>
          <MdOutlineRefresh />
        </span>
        <span className="nav-icon logo">
          <HiOutlineBellAlert />
        </span>
        <img className="nav-logo" src={logoImg} alt="Logo" />
      </div>
    </div>
  );
};

export default Navbar;
