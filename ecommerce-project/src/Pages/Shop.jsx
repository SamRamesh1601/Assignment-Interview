import React, { useEffect, useState } from "react";
import LoadingImg from "../Assets/Loading.gif";
import Navbar from "../Components/Navbar";
import { getAllProduct, getSearchProduct } from "../Service/service";
import { FaArrowUpWideShort } from "react-icons/fa6";
import ProductContainer from "../Components/ProductContainer";
import noteLabelList from "../MockData/CategoryLabelList.json";
import useUpdateEffect from "../Hooks/useUpdateEffect";
import ViewProduct from "./ViewProduct";
import Delivery from "./Delivery";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [toggleViewNotes, setToggleViewNotes] = useState(false);
  const [actveLabel, setActiveLabel] = useState(0);
  const searchPlaceholder = "Search Electronics , Products, Groccery..";
  const [productName, setProductName] = useState("");
  const [styleView, setStyleView] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState({});

  const handleRefresh = () => {
    window.location.reload();
  };
  const onChangeSearchName = (e) => {
    const { name, value } = e.target;
    setProductName(value);
  };

  useUpdateEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProduct();
        if (res) {
          setNotesList(res.products);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    setLoading(true);
    fetchData();
  }, [refresh]);
  useUpdateEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSearchProduct(productName);
        if (res) {
          setNotesList(res.products);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    if (productName) fetchData();
  }, [productName]);

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
      {/* <Delivery productsList={notesList} /> */}

      <div className="main-page add-scroll-bar flex-col">
        <div>
          <Navbar
            searchName={productName}
            changeSearchName={onChangeSearchName}
            styleView={styleView}
            changeStyleView={() => setStyleView(!styleView)}
            searchPlaceholder={searchPlaceholder}
            refreshAction={() => setRefresh(!refresh)}
            headerName="Shop now"
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
                pageName="Shop"
                productsList={notesList}
                deliveryFn={handleDelivery}
                styleView={styleView}
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

export default Shop;
