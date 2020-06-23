import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';
import { RecipesContext } from './contexts/RecipesContext';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';
import { AxiosWithAuth } from './utils/axiosWithAuth';

const initialRecipes = [];

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const getRecipes = () => {
    //get request here to get recipes from the back-end and set them to state
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, getRecipes }}>
      <div className="App">
        <NavBar />
        <main>
          <div className="main-content">
            <Switch>
              <PrivateRoute path="/recipes/:id" component={RecipeDetails} />
              <PrivateRoute path="/add-recipe" component={AddRecipeForm} />
              <PrivateRoute
                path="/recipes/:id/edit"
                component={EditRecipeForm}
              />
              {/* Route to the sign-in page */}
              {/* Route to the sign-up page */}
              {/* Add PrivateRoute to below once token is being passed */}
              <Route exact path="/" component={RecipeList} />
            </Switch>
          </div>
        </main>
      </div>
    </RecipesContext.Provider>
  );
}

export default App;
