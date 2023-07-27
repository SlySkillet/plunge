import { React } from "react";
import MusicCategory from "./CategoryCarousels.js/Music";
import DesignCategory from "./CategoryCarousels.js/DesignStyle";
import ArtCategory from "./CategoryCarousels.js/ArtsEntertainment";
import BusinessCategory from "./CategoryCarousels.js/Business";
import SportsCategory from "./CategoryCarousels.js/SportsGaming";
import WritingCategory from "./CategoryCarousels.js/Writing";
import ScienceCategory from "./CategoryCarousels.js/ScienceTech";
import HomeCategory from "./CategoryCarousels.js/Home";
import CommunityCategory from "./CategoryCarousels.js/Community";
import HealthCategory from "./CategoryCarousels.js/Health";
import FoodCategory from "./CategoryCarousels.js/Food";
// function MusicCategory() {}

function BrowseCategories() {
  return (
    <div>
      <MusicCategory />
      <DesignCategory />
      <ArtCategory />
      <BusinessCategory />
      <SportsCategory />
      <WritingCategory />
      <ScienceCategory />
      <HomeCategory />
      <CommunityCategory />
      <HealthCategory />
      <FoodCategory />
    </div>
  );
}

export default BrowseCategories;
