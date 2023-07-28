import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function MusicCategory() {
  const [musicClasses, setMusicClasses] = useState([]);
  const [musicClasses1, setMusicClasses1] = useState([]);
  const [musicClasses2, setMusicClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadMusicClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=1`);
      if (response.ok) {
        const data = await response.json();
        setMusicClasses(data);
      } else {
        console.error(response);
      }
    }
    loadMusicClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setMusicClasses1(musicClasses.slice(0, 4));
    }
    setStack();
  }, [musicClasses]);

  useEffect(() => {
    function setStack() {
      setMusicClasses2(musicClasses.slice(4, 8));
    }
    setStack();
  }, [musicClasses]);

  return (
    <div>
      <ReturnCarousel
        stack1={musicClasses1}
        stack2={musicClasses2}
        title="Music"
        categoryId={1}
      />
    </div>
  );
}

export default MusicCategory;
