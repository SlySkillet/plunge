import "./HeroComponent.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";
import React from "react";

function HeroComponent() {
  let cards_1 = [
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/music.png"
          title="Music"
          urlCategory="/categories/1"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/design.png"
          title="Design and Style"
          urlCategory="/categories/2"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/arts.png"
          title="Arts & Entertainment"
          urlCategory="/categories/3"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/business.png"
          title="Business"
          urlCategory="/categories/4"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/sports.png"
          title="Sports & Gaming"
          urlCategory="/categories/5"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/writing.png"
          title="Writing"
          urlCategory="/categories/6"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/science.png"
          title="Science & Tech"
          urlCategory="/categories/7"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/home.png"
          title="Home & Lifestyle"
          urlCategory="/categories/8"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/community.png"
          title="Community & Government"
          urlCategory="/categories/9"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/health.png"
          title="Health & Wellness"
          urlCategory="/categories/10"
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://henrykimphotography.com/plunge/food.png"
          title="Food"
          urlCategory="/categories/11"
        />
      ),
    },
  ];
  return (
    <div className="">
      <Carousel
        cards={cards_1}
        height="500px"
        width="100%"
        margin="0 auto"
        offset={3}
      />
    </div>
  );
}

export default HeroComponent;
