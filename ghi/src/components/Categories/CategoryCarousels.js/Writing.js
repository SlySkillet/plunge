import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function WritingCategory() {
  const [writingClasses, setWritingClasses] = useState([]);
  const [writingClasses1, setWritingClasses1] = useState([]);
  const [writingClasses2, setWritingClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadWritingClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=6`);
      if (response.ok) {
        const data = await response.json();
        setWritingClasses(data);
      } else {
        console.error(response);
      }
    }
    loadWritingClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setWritingClasses1(writingClasses.slice(0, 4));
    }
    setStack();
  }, [writingClasses]);

  useEffect(() => {
    function setStack() {
      setWritingClasses2(writingClasses.slice(4, 8));
    }
    setStack();
  }, [writingClasses]);

  return (
    <div>
      <ReturnCarousel
        stack1={writingClasses1}
        stack2={writingClasses2}
        title="Writing"
        categoryId={6}
      />
    </div>
  );
}

export default WritingCategory;
