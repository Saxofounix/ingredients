import React from "react";
import Loader from "react-loader-spinner";

const Details = ({ recipe, setToggle, toggle, loading }) => {
  const handleClick = () => {
    setToggle(false);
  };

  if (recipe.meals === null) {
    return null;
  }

  return (
    <React.Fragment>
      {toggle
        ? recipe.meals.map((recipeD) => {
            return (
              <>
                <div key={recipeD.idMeal} className="recipe-wrapper">
                  {loading ? (
                    <div className="recipe">
                      <div className="loader">
                        <Loader
                          type="ThreeDots"
                          color="#FFF"
                          height={100}
                          width={100}
                          timeout={30000}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="recipe" key={Date.now}>
                      <h4>{recipeD.strMeal}</h4>
                      <p>{recipeD.strInstructions}</p>
                      <a
                        href={recipeD.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Video Tutorial
                      </a>
                      <button onClick={handleClick}>Close</button>
                    </div>
                  )}
                </div>
              </>
            );
          })
        : null}
    </React.Fragment>
  );
};

export default Details;
