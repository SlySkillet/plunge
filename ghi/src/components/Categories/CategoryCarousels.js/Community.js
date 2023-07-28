import { React, useState, useEffect } from "react";
import ReturnCarousel from "./ReturnCarousel";

function CommunityCategory() {
  const [communityClasses, setCommunityClasses] = useState([]);
  const [communityClasses1, setCommunityClasses1] = useState([]);
  const [communityClasses2, setCommunityClasses2] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadCommunityClasses() {
      const response = await fetch(`${baseUrl}/api/classes?category=9`);
      if (response.ok) {
        const data = await response.json();
        setCommunityClasses(data);
      } else {
        console.error(response);
      }
    }
    loadCommunityClasses();
  }, []);
  useEffect(() => {
    function setStack() {
      setCommunityClasses1(communityClasses.slice(0, 4));
    }
    setStack();
  }, [communityClasses]);

  useEffect(() => {
    function setStack() {
      setCommunityClasses2(communityClasses.slice(4, 8));
    }
    setStack();
  }, [communityClasses]);

  return (
    <div>
      <ReturnCarousel
        stack1={communityClasses1}
        stack2={communityClasses2}
        title="Community & Government"
        categoryId={9}
      />
    </div>
  );
}

export default CommunityCategory;
