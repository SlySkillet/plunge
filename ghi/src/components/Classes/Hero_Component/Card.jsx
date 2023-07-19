import Styles from "./Card.module.css";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";

function Card({ imagen, name }) {
  const [show, setShown] = useState(false);
  const [categories, setCategories] = useState();

  const fetchData = async() => {
    const url = 'http://localhost:8000/categories';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCategories(data)
    }
  }

  useEffect(() => {
      fetchData()
  }, []);

  const props3 = useSpring({
    opacity: 1,
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={imagen} alt="" />
      <h2>{name}</h2>
      <div className={Styles.btnn}>
        <Button text="Plunge Into" />
      </div>
    </animated.div>
  );
}

export default Card;
