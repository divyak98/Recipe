import React, { useState } from 'react';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

// Define recipe data
const recipes = [
  {
    id: '1',
    name: 'Panipuri Recipe',
    description: 'Panipuri, also known as Golgappa, is a popular street food in India consisting of a hollow, crispy puri filled with spicy, tangy water, tamarind chutney, and various fillings like boiled potatoes, chickpeas, or sprouts.',
    steps: [
      'Prepare the puris and fillings.',
      'Make spicy and tangy water by mixing tamarind chutney, spices, and water.',
      'Assemble the puris by filling them with the prepared fillings and spicy water.',
      'Serve immediately and enjoy!'
    ]
  },
  {
    id: '2',
    name: 'Maggie Recipe',
    description: 'Maggie, also known as instant noodles, is a quick and easy dish made by boiling noodles and mixing them with a flavored powder, sauce, or seasoning.',
    steps: [
      'Boil water and cook noodles according to package instructions.',
      'Drain the noodles and set aside.',
      'Prepare the seasoning mix by mixing it with hot water.',
      'Combine the cooked noodles with the seasoning mix and serve hot.'
    ]
  },
  {
    id: '3',
    name: 'Cold Coffee Recipe',
    description: 'Cold coffee is a refreshing beverage made by blending chilled coffee with milk, sugar, and ice cubes. It is often flavored with vanilla or chocolate and topped with whipped cream.',
    steps: [
      'Brew coffee and let it cool completely.',
      'In a blender, combine cooled coffee, milk, sugar, and ice cubes.',
      'Blend until smooth and frothy.',
      'Pour into glasses and top with whipped cream if desired.'
    ]
  },
  {
    id: '4',
    name: 'Sandwich Recipe',
    description: 'A sandwich is a versatile dish made by placing fillings such as vegetables, cheese, meat, or spreads between slices of bread. It can be customized with various ingredients and served cold or toasted.',
    steps: [
      'Choose your bread and fillings.',
      'Layer the fillings between slices of bread.',
      'Press the sandwich together gently and slice if desired.',
      'Serve immediately or wrap for later.'
    ]
  },
  {
    id: '5',
    name: 'Virgin Mojito Recipe',
    description: 'A refreshing mocktail made with mint leaves, lime juice, sugar, soda, and ice.',
    steps: [
      'Muddle mint leaves and lime juice with sugar in a glass.',
      'Add ice cubes and top up with soda.',
      'Stir well and serve chilled.',
      'Garnish with mint leaves and lime wedges if desired.'
    ]
  },
  {
    id: '6',
    name: 'Pasta Recipe',
    description: 'Classic Italian pasta dish with tomato sauce, garlic, basil, and Parmesan cheese.',
    steps: [
      'Cook pasta according to package instructions.',
      'In a saucepan, heat olive oil and sauté garlic until golden brown.',
      'Add chopped tomatoes, basil, salt, and pepper. Cook until tomatoes are soft.',
      'Add cooked pasta to the sauce and toss well. Serve hot with grated Parmesan cheese.'
    ]
  }
];

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = (recipeId) => {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    setSelectedRecipe(recipe);
  };

  const handleReturnToMenu = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated && <h1>Welcome, {user.name}!</h1>}
        {!isAuthenticated && (
          <div className="login-container">
            <h1 className="login-message">Please login to continue.</h1>
          </div>
        )}
        {isAuthenticated && !selectedRecipe && (
          <>
            <div>
              <h2>Explore Delicious Recipes</h2>
            </div>
            <div className="recipe-container">
              {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card" onClick={() => handleSearch(recipe.id)}>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedRecipe && (
          <div className="recipe-details active">
            <h2>{selectedRecipe.name}</h2>
            <p>{selectedRecipe.description}</p>
            <ol>
              {selectedRecipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <div>
              <button className="return-button" onClick={handleReturnToMenu}>Back to Menu</button>
            </div>
          </div>
        )}
        <footer className="App-footer">
          {isAuthenticated ? (
            <button className="logout-button" onClick={logout}>Logout</button>
          ) : (
            <button className="login-button" onClick={loginWithRedirect}>Login With Redirect</button>
          )}
        </footer>
      </header>
    </div>
  );
}

export default App;
