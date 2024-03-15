import React, { useState } from "react";

const CategorySelection = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onSelectCategory(selectedCategory);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelectCategory(selectedCategory);
  };

  return (
    <div className="category-selection">
      <h2>Select a Category</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedCategory}>
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default CategorySelection;
