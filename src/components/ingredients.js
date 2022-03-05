import React, { useRef, useEffect, useState } from "react";
import Ingredient from "./ingredient";
// import "./styles/ingredients.css";

const Ingredients = () => {
  const ref = useRef(null);

  const [value, setValue] = useState();
  const [meals, setMeals] = useState();
  const [loadingList, setLoadingList] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setValue(ref.current.value);
    ref.current.value = null;
    setLoadingList(true);
  };

  useEffect(async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`
      );
      let data = await response.json();
      if (data.meals !== null) {
        setMeals(data);
      } else {
        setLoadingList(false);
        return;
      }
    } catch {
      alert("Fatal error");
      setLoadingList(false);
    }
    setLoadingList(false);
  }, [value]);

  return (
    <>
      <div className="search-wrapper">
        {/* SVG divider start */}
        <div className="shape-divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        {/* SVG divider end */}
        <form>
          <h2>Find meals for your ingredients</h2>
          <input type="text" ref={ref} />
          <button onClick={handleClick}>Search</button>
          <p>
            Search bar accepts one ingredient at a time (e.g. chicken breast,
            chilli)
          </p>
        </form>
      </div>
      <div className="ingredients-list">
        <Ingredient meals={meals} loadingList={loadingList} />
      </div>
    </>
  );
};

export default Ingredients;
