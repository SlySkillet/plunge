import "./Hero_Component.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";
import React, { useEffect, useState } from "react";

function Hero_Component() {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8000/categories' ;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    }
  }

  useEffect(() => {
      fetchData()
  }, []);

  let cards = [
    categories.map(categorie => (
      {
      key: uuidv4(),
      content: (
        <Card imagen={categorie.image_1} name={categorie.name}/>
      )
      }
    ))

  ];
  return (
    <div className="">
      <Carousel
        cards={cards}
        height="500px"
        width="100%"
        margin="0 auto"
        offset={200}
        showArrows={false}
      />
    </div>
  );
}

export default Hero_Component;
