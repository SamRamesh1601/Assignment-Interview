import moment from "moment";
import React, { useContext, useState } from "react";
import { TbTruckLoading } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";
import { BsTrash2Fill } from "react-icons/bs";
import { MdCloudySnowing, MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { SiCoffeescript } from "react-icons/si";
import { BiCookie } from "react-icons/bi";
import FavoriteContext from "../utils/FavoriteContext";
import CartContext from "../utils/CartContext";
import ToastAlert from "../utils/ToastAlert";

const ProductContainer = ({
  productsList = [],
  viewNotes,
  pageName,
  styleView,
  selectNotes,
  deliveryFn,
}) => {
  const pageNoContentSvg = {
    Shop: {
      icon: <TbTruckLoading />,
      content: "Few moments",
    },
    Favorites: {
      icon: <BiCookie />,
      content: "No Favorites",
    },
    MyOrders: {
      icon: <SiCoffeescript />,
      content: "No Orders, just order more",
    },
    Cart: {
      icon: <MdCloudySnowing />,
      content: "No Cart Items, just pick and order ",
    },
    default: {
      icon: <BsTrash2Fill />,
      content: "No Items Found",
    },
  };
  const noContentSvg = pageName
    ? pageNoContentSvg[pageName]
    : pageNoContentSvg["default"];
  const onSelectedNotes = (val) => {
    selectNotes(val);
    viewNotes();
  };
  const [toastMsg, setToastMsg] = useState("");

  const resultPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * resultPerPage;
  const endIndex = Math.min(startIndex + resultPerPage, productsList.length);
  const lastPaganation = Math.ceil(productsList.length / resultPerPage);
  const paganationNumbers = productsList.length
    ? parseInt(productsList.length / resultPerPage) + 1
    : 0;

  const { favorites, removeFromFavorites, addToFavorites } =
    useContext(FavoriteContext);
  const { cart, removeFromCart, addToCart } = useContext(CartContext);

  const [favoriteItems, setFavoriteItems] = useState([...favorites]);
  const [cartItems, setCartItems] = useState([...cart]);

  const handleFavoriteItems = (id) => {
    if (favoriteItems.includes(id)) {
      removeFromFavorites(id);
      setToastMsg("Remove from Favorites");
    } else {
      addToFavorites(id);
      setToastMsg("Add to Favorites");
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
      setToastMsg("Already taken to the Cart");
    } else {
      addToCart(id);
      setToastMsg("Add Items to the Purchase Cart");
    }
    setCartItems((prevFavoriteItems) => {
      if (prevFavoriteItems.includes(id)) {
        return prevFavoriteItems.filter((item) => item !== id);
      } else {
        return [...prevFavoriteItems, id];
      }
    });
  };

  return (
    <>
      <div className={`notes-small-container `}>
        {productsList && productsList.length !== 0
          ? productsList.slice(startIndex, endIndex).map((product, index) => (
              <div className="product-grid" key={index}>
                <div className="product-details">
                  <div
                    className="product-images basic-center-div"
                    onClick={() => {
                      onSelectedNotes(product);
                    }}
                  >
                    <img
                      src={
                        product.image_small_url ||
                        product.image_url ||
                        product.image_front_small_url ||
                        product.image_front_url ||
                        product.image_thumb_url
                      }
                      alt={product.product_name}
                      onError={(e) => {
                        const fallbackImages = [
                          product.image_url,
                          product.image_front_small_url,
                          product.image_front_url,
                          product.image_thumb_url,
                        ];
                        const randomIndex = Math.floor(
                          Math.random() * fallbackImages.length
                        );
                        e.target.src = fallbackImages[randomIndex];
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h1
                      className="product-name"
                      onClick={() => {
                        onSelectedNotes(product);
                      }}
                    >
                      {product.product_name}
                    </h1>
                    <p className="product-price">{`$${
                      product.product_quantity || 0
                    }`}</p>
                    <div className="ratings d-flex">
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStarHalf />
                      <div className="ratings-text">4.5 ratings</div>
                    </div>
                    <div className="buy-now d-flex">
                      <button
                        className="product-btn nowidth"
                        onClick={() => handleCartItems(product.id)}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          deliveryFn(product);
                        }}
                        className="product-btn nowidth black"
                      >
                        Buy Now
                      </button>
                    </div>
                    <button
                      className="product-btn circle white fav"
                      onClick={() => handleFavoriteItems(product.id)}
                    >
                      {favoriteItems.includes(product.id) ? (
                        <MdOutlineFavorite />
                      ) : (
                        <MdFavoriteBorder />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          : pageName !== "Shop" && (
              <div className="empty-container basic-center-div flex-col">
                <span
                  className={`empty-container-icon ${
                    pageName === "Shop" && "getAnimate"
                  }`}
                >
                  {noContentSvg["icon"]}
                </span>
                <span
                  className={`empty-container-text ${
                    pageName === "Shop" && "getAnimate"
                  } `}
                >
                  {noContentSvg["content"]}
                </span>
              </div>
            )}
      </div>
      {productsList && productsList.length >= resultPerPage && (
        <div className="button-group d-flex justify-content-start align-items-center">
          <button className="paganation-btn" onClick={() => setCurrentPage(1)}>
            {"<<"}
          </button>
          <button
            className="paganation-btn"
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
          >
            {"<"}
          </button>
          {paganationNumbers &&
            Array.from(Array(paganationNumbers).keys()).map((i) => {
              const pageNum = parseInt(i + 1);
              return (
                <button
                  key={i}
                  className="paganation-btn"
                  onClick={() =>
                    currentPage !== pageNum && setCurrentPage(pageNum)
                  }
                >
                  {pageNum}
                </button>
              );
            })}

          <button
            className="paganation-btn"
            onClick={() =>
              currentPage !== lastPaganation && setCurrentPage(currentPage + 1)
            }
          >
            {">"}
          </button>
          <button
            className="paganation-btn"
            onClick={() =>
              currentPage !== lastPaganation && setCurrentPage(lastPaganation)
            }
          >
            {">>"}
          </button>
        </div>
      )}
      <ToastAlert toastMsg={toastMsg} />
    </>
  );
};

export default ProductContainer;
