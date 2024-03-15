import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import LoadingImg from "./Assets/Loading.gif";
import { CartProvider } from "./utils/CartContext";
import { FavoriteProvider } from "./utils/FavoriteContext";

const Shop = lazy(() => import("./Pages/Shop"));
const MyOrders = lazy(() => import("./Pages/Orders"));
const Cart = lazy(() => import("./Pages/Cart"));
const Favorites = lazy(() => import("./Pages/Favorite"));

function App() {
  const Loading = () => {
    return (
      <div className="loading-bg basic-center-div">
        <img src={LoadingImg} alt="Loading" />
      </div>
    );
  };
  return (
    <BrowserRouter>
      <div className="d-flex view-page">
        <Sidebar />

        <Suspense fallback={<Loading />}>
          <FavoriteProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorite" element={<Favorites />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </CartProvider>
          </FavoriteProvider>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
