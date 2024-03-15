import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./Pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex view-page">
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
