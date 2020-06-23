import React from 'react';

export default function Recipe() {
  return (
    <div className="recipe-card">
      <img
        src="https://dummyimage.com/300x300/000/ffffff&text=Recipe+Pic"
        alt="filler"
      />
      <div className="recipe-card-text">
        <h3>Recipe Name</h3>
        <h4>Category</h4>
      </div>
    </div>
  );
}
