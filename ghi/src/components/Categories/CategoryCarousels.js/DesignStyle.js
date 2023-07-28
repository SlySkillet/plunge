import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function DesignCategory() {
  const [designClasses, setDesignClasses] = useState([]);
  const [designClasses1, setDesignClasses1] = useState([]);
  const [designClasses2, setDesignClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadDesignClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=2`);
      if (response.ok) {
        const data = await response.json();
        setDesignClasses(data);
      } else {
        console.error(response);
      }
    }
    loadDesignClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setDesignClasses1(designClasses.slice(0, 4));
    }
    setStack();
  }, [designClasses]);

  useEffect(() => {
    function setStack() {
      setDesignClasses2(designClasses.slice(4, 8));
    }
    setStack();
  }, [designClasses]);
  return (
    <ReturnCarousel
      stack1={designClasses1}
      stack2={designClasses2}
      title="Design & Style"
      categoryId={2}
    />
  );
}

export default DesignCategory;
