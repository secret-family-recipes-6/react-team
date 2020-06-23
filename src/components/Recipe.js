import React from 'react';

export default function Recipe(props) {
  const {
    category,
    recipe_img,
    title,
  } = props
  return (
    <div className="recipe-card">
      <img
        src={recipe_img}
        alt={title}
      />
      <div className="recipe-card-text">
        <h3>{title}</h3>
        <h4>{category}</h4>
      </div>
    </div>
  );
}
