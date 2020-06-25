import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function SearchBar() {
  const { searchValue, setSearchValue } = useContext(RecipesContext);

  const onInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };
  return (
    <div className="search">
      <h3>Search for a Recipe:&nbsp;</h3>
      <input
        type="text"
        placeholder="..."
        onChange={onInputChange}
        value={searchValue}
      />
    </div>
  );
}
