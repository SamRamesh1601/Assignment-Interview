import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import useUpdateEffect from "../Hooks/useUpdateEffect";

const Delivery = ({ productsList = [], closeFn }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [productArr, setProductsArr] = useState([]);
  useUpdateEffect(() => {
    setProductsArr(productsList);
  }, [productsList]);
  useEffect(() => {
    if (productArr) {
      const amountOfProducts = productArr.map((item) =>
        parseInt(item.product_quantity)
      );
      const totalAmount = amountOfProducts.reduce((acc, item) => acc + item, 0);

      setTotalAmount(totalAmount);
    }
  }, [productArr]);
  const deleteProductsFromList = (id) => {
    let changeProducts = [...productArr];
    const newArr = changeProducts.filter((item) => item.id !== id);
    if (newArr.length === 0) closeFn();
    setProductsArr(newArr);
  };
  return (
    <div className="main-page view-product delivery-screen add-scroll-bar flex-col">
      <div className="view-semi-product">
        <div className="semi-product delivery-product-container flex-column basic-center-div ">
          <div className="delivery-header-text">Delivery details</div>
          <div className="delivery-product-semi-container">
            <div className="delivery-product-ls add-scroll-bar">
              {productArr.map((product, i) => {
                return (
                  <div className="delivery-product-semi-ls">
                    <div className="left-delivery-product-content">
                      <div className="delivery-content-img">
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
                      <div className="delivery-text-container basic-hr-center-div px-3 flex-column">
                        <h1 className="delivery-content-text head">
                          {product.product_name}
                        </h1>
                        <p className="delivery-content-text">{`$${
                          product.product_quantity || 0
                        }`}</p>
                      </div>
                    </div>
                    <div
                      className="right-delivery-product-content basic-center-div "
                      onClick={() => {
                        deleteProductsFromList(product.id);
                      }}
                    >
                      <IoClose />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="delivery-total-text">
              Total :{" "}
              <div className="delivery-total-price-text">{`$${totalAmount}`}</div>
            </div>
          </div>
        </div>
        <div className="semi-product delivery-form-container flex-column bg-dark basic-center-div">
          <div className="delivery-input-container">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="Email" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="Phone Number" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="Addresss" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="City" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="State" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="Pin-code" />
          </div>
          <div className="delivery-input-container">
            <input type="text" placeholder="Landmark" />
          </div>
          <div className="delivery-input-container">
            <select name="" id="">
              <option>Select Payment Method</option>
              <option>Pay Online</option>
              <option>Cash on Delivery</option>
              <option>Google Pay</option>
            </select>
            {/* <input type="text" placeholder="" /> */}
          </div>
          <div className="mt-3 delivery-btn-group basic-center-div">
            <button className="button-action blue">Buy</button>
            <button
              className="button-action black"
              onClick={() => {
                closeFn();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
