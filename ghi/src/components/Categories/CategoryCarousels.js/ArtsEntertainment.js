import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function ArtCategory() {
  const [artClasses, setArtClasses] = useState([]);
  const [artClasses1, setArtClasses1] = useState([]);
  const [artClasses2, setArtClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadArtClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=3`);
      if (response.ok) {
        const data = await response.json();
        setArtClasses(data);
      } else {
        console.error(response);
      }
    }
    loadArtClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setArtClasses1(artClasses.slice(0, 4));
    }
    setStack();
  }, [artClasses]);

  useEffect(() => {
    function setStack() {
      setArtClasses2(artClasses.slice(4, 8));
    }
    setStack();
  }, [artClasses]);

  return (
    <ReturnCarousel
      stack1={artClasses1}
      stack2={artClasses2}
      title="Arts & Entertainment"
      categoryId={3}
    />
  );
}

export default ArtCategory;
