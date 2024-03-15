import React, { useEffect, useState, useContext } from "react";
import LoadingImg from "../Assets/Loading.gif";
import Navbar from "../Components/Navbar";
import { viewProduct } from "../Service/service";
import { FaArrowUpWideShort } from "react-icons/fa6";
import ProductContainer from "../Components/ProductContainer";
import noteLabelList from "../MockData/CategoryLabelList.json";
import FavoriteContext from "../utils/FavoriteContext";
import useUpdateEffect from "../Hooks/useUpdateEffect";
import ViewProduct from "./ViewProduct";
import Delivery from "./Delivery";

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [toggleViewNotes, setToggleViewNotes] = useState(false);
  const [actveLabel, setActiveLabel] = useState(0);
  const searchPlaceholder = "Search Electronics , Products, Groccery..";
  const [noteName, setNoteName] = useState("");
  const [styleView, setStyleView] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState({
    noteName: "",
  });

  const handleRefresh = () => {
    window.location.reload();
  };
  const onChangeSearchName = (e) => {
    const { name, value } = e.target;
    setNoteName(value);
  };
  const { favorites, removeFromFavorites, addToFavorites } =
    useContext(FavoriteContext);
  useUpdateEffect(() => {
    const fetchData = async () => {
      try {
        let newArr = [];
        for (const proId of favorites) {
          if (!proId) {
          } else {
            const response = await viewProduct(proId);
            if (response && response.product) newArr.push(response.product);
          }
        }
        setProductsList(newArr);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    setLoading(true);
    if (favorites) fetchData();
    else setLoading(false);
  }, [refresh]);
  const [toggleDelivery, setToggleDelivery] = useState(false);
  const [deliveryProducts, setDeliveryProducts] = useState([]);
  const closeDelivery = () => {
    setDeliveryProducts([]);
    setToggleDelivery(false);
  };
  const handleDelivery = (val) => {
    setDeliveryProducts([...deliveryProducts, val]);
    setToggleDelivery(true);
  };
  return (
    <>
      {loading && (
        <div className="loading-bg basic-center-div">
          <img src={LoadingImg} alt="Loading" />
        </div>
      )}
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
            headerName="Favorites"
          />
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column basic-center-div w-100">
            <div className="filter-container" hidden={toggleViewNotes}>
              <div className="filter-label-container">
                <span className={` label-card `}>
                  <FaArrowUpWideShort />
                </span>
                {noteLabelList.map((l, i) => {
                  const active = i === actveLabel;
                  return (
                    <span
                      key={i}
                      onClick={() => setActiveLabel(i)}
                      className={` label-card ${active && "active"}`}
                    >
                      {l}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 notes-container add-scroll-bar">
              <ProductContainer
                selectNotes={(val) => setSelectedNotes(val)}
                viewNoteToggle={toggleViewNotes}
                viewNotes={() => {
                  setToggleViewNotes(true);
                }}
                pageName="Favorites"
                productsList={productsList}
                styleView={styleView}
                deliveryFn={handleDelivery}
              />
              {toggleViewNotes && (
                <ViewProduct
                  productDetails={selectedNotes}
                  closeProductDetails={() => {
                    setToggleViewNotes(false);
                  }}
                />
              )}
              {toggleDelivery && (
                <Delivery
                  productsList={deliveryProducts}
                  closeFn={closeDelivery}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
