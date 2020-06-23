import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import { RecipesContext } from './contexts/RecipesContext';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';
import { axiosWithAuth } from './utils/axiosWithAuth';

const initialRecipes = [];

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const getRecipes = () => {
      axiosWithAuth().get('/recipes')
        .then(res => {
          setRecipes(res.data);
        })
        .catch(err => {
          console.log(err)
        })

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
              <Route path='/signup' component={SignUpForm}/>
              <Route path='/signin' component={SignInForm}/>
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
