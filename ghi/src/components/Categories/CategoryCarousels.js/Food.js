import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function FoodCategory() {
  const [foodClasses, setFoodClasses] = useState([]);
  const [foodClasses1, setFoodClasses1] = useState([]);
  const [foodClasses2, setFoodClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadFoodClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=11`);
      if (response.ok) {
        const data = await response.json();
        setFoodClasses(data);
      } else {
        console.error(response);
      }
    }
    loadFoodClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setFoodClasses1(foodClasses.slice(0, 4));
    }
    setStack();
  }, [foodClasses]);

  useEffect(() => {
    function setStack() {
      setFoodClasses2(foodClasses.slice(4, 8));
    }
    setStack();
  }, [foodClasses]);

  return (
    <div>
      <ReturnCarousel
        stack1={foodClasses1}
        stack2={foodClasses2}
        title="Food"
        categoryId={11}
      />
    </div>
  );
}

export default FoodCategory;
