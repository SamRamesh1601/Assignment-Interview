import React, { useContext, useEffect, useState } from "react";
import ImageSlider from "../Components/ImageSlider";
import LoadingImg from "../Assets/Loading.gif";
import useUpdateEffect from "../Hooks/useUpdateEffect";
import { IoCloseSharp, IoStar, IoStarHalf } from "react-icons/io5";
import CartContext from "../utils/CartContext";
import FavoriteContext from "../utils/FavoriteContext";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import ToastAlert from "../utils/ToastAlert";
import Delivery from "./Delivery";

const ViewProduct = ({ productDetails, closeProductDetails }) => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [imageList, setImageList] = useState([]);
  useUpdateEffect(() => {
    const imageList = [
      productDetails.image_front_url,
      productDetails.image_front_small_url,
      productDetails.image_url,
      productDetails.image_small_url,
      productDetails.image_nutrition_url,
      productDetails.image_nutrition_small_url,
      productDetails.image_ingredients_url,
      productDetails.image_ingredients_small_url,
      productDetails.image_ingredients_small_url,
    ];
    setImageList(imageList);
  }, []);

  const { favorites, removeFromFavorites, addToFavorites } =
    useContext(FavoriteContext);
  const { cart, removeFromCart, addToCart } = useContext(CartContext);

  const [favoriteItems, setFavoriteItems] = useState([...favorites]);
  const [cartItems, setCartItems] = useState([...cart]);

  const handleFavoriteItems = (id) => {
    if (favoriteItems.includes(id)) {
      removeFromFavorites(id);
      setToastMsg("Add to Favorites");
    } else {
      setToastMsg("Remove from Favorites");
      addToFavorites(id);
    }
    setFavoriteItems((favorites) => {
      if (favorites.includes(id)) {
        return favorites.filter((item) => item !== id);
      } else {
        return [...favorites, id];
      }
    });
  };
  const handleCartItems = (id) => {
    if (cartItems.includes(id)) {
    } else addToCart(id);
    setCartItems((prevFavoriteItems) => {
      if (prevFavoriteItems.includes(id)) {
        return prevFavoriteItems.filter((item) => item !== id);
      } else {
        return [...prevFavoriteItems, id];
      }
    });
    setToastMsg("Add Items to the Purchase Cart");
  };
  const [toastMsg, setToastMsg] = useState("");

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
      <div className="main-page view-product add-scroll-bar flex-col">
        {/* <div>
          <Navbar
            searchName={productName}
            changeSearchName={onChangeSearchName}
            styleView={styleView}
            changeStyleView={() => setStyleView(!styleView)}
            searchPlaceholder={searchPlaceholder}
            notesTile={selectedNotes.noteName}
            refreshAction={() => setRefresh(!refresh)}
          />
        </div> */}
        <div className="view-semi-product">
          <div className="semi-product basic-center-div">
            <ImageSlider imgeList={imageList} />
          </div>
          <div className="semi-product basic-vr-center-div">
            <div className="product-header">
              <span className="product-header-text">
                {productDetails.brands} <br />
              </span>
              <span
                className="product-header-text icon"
                onClick={() => {
                  closeProductDetails();
                }}
              >
                <IoCloseSharp />
              </span>
            </div>
            <div className="magic-product-header-text">
              {productDetails.product_name}
            </div>
            <div className="view-product-ratings d-flex">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStarHalf />
              <div className="ratings-text">4.5 ratings</div>
            </div>
            <div className="magic-product-header-text small-bold">
              {`$ ${productDetails.product_quantity || 0}`}
            </div>
            <div className="magic-product-header-text extra-small">
              {productDetails.states || ""}
            </div>
            <div className="view-product-btn-group">
              <button
                className="product-btn nowidth"
                onClick={() => handleCartItems(productDetails.id)}
              >
                Add to Cart
              </button>
              <button
                className="product-btn nowidth black"
                onClick={() => {
                  handleDelivery(productDetails);
                }}
              >
                Buy Now
              </button>
              <button
                className="product-btn nowidth black"
                onClick={() => handleFavoriteItems(productDetails.id)}
              >
                {favoriteItems.includes(productDetails.id) ? (
                  <MdOutlineFavorite />
                ) : (
                  <MdFavoriteBorder />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {toggleDelivery && (
        <Delivery productsList={deliveryProducts} closeFn={closeDelivery} />
      )}
      <ToastAlert toastMsg={toastMsg} />
    </>
  );
};

export default ViewProduct;
