import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function HomeCategory() {
  const [homeClasses, setHomeClasses] = useState([]);
  const [homeClasses1, setHomeClasses1] = useState([]);
  const [homeClasses2, setHomeClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadHomeClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=8`);
      if (response.ok) {
        const data = await response.json();
        setHomeClasses(data);
      } else {
        console.error(response);
      }
    }
    loadHomeClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setHomeClasses1(homeClasses.slice(0, 4));
    }
    setStack();
  }, [homeClasses]);

  useEffect(() => {
    function setStack() {
      setHomeClasses2(homeClasses.slice(4, 8));
    }
    setStack();
  }, [homeClasses]);

  return (
    <div>
      <ReturnCarousel
        stack1={homeClasses1}
        stack2={homeClasses2}
        title="Home & Lifestyle"
        categoryId={8}
      />
    </div>
  );
}

export default HomeCategory;
