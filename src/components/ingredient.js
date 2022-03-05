import React, { useRef, useState, useEffect } from "react";
import "../styles/ingredients.css";
import Details from "./recipeDetails";
import Loader from "react-loader-spinner";

const Ingredient = ({ meals, loadingList }) => {
  const ref = useRef(null);

  const [toggle, setToggle] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    const id = e.target.parentElement.getAttribute("data-id");
    setRecipeDetails(id);
    setToggle(true);
    setLoading(true);
  };

  useEffect(async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeDetails}`
      );
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    } catch {
      alert("There was a problem");
    }
  }, [recipeDetails]);

  if (meals === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      {loadingList ? (
        <div className="loader">
          <Loader
            type="ThreeDots"
            color="FFF"
            height={100}
            width={100}
            timeout={30000}
          />
        </div>
      ) : (
        <>
          {meals.meals.map((meal) => {
            return (
              <>
                <div
                  className="ingredient"
                  key={meal.idMeal}
                  data-id={meal.idMeal}
                  ref={ref}
                >
                  <>
                    <img src={meal.strMealThumb} alt="" width="30px" />
                    <p>{meal.strMeal}</p>
                    <button onClick={handleClick} className="secondary-btn">
                      Get Recipe
                    </button>{" "}
                  </>
                </div>
              </>
            );
          })}{" "}
        </>
      )}

      <Details
        recipe={recipe}
        setToggle={setToggle}
        toggle={toggle}
        loading={loading}
      />
    </React.Fragment>
  );
};

export default Ingredient;
