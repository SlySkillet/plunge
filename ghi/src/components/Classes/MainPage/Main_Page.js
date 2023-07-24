// import React from "react";
import ClassesList from "../Classes_Carousels/Class_Card";
import Hero_Component from "../Hero_Component/Hero_Component";



function MainPage() {
  const classes_carousel = ClassesList();
  console.log(classes_carousel);
  const categories_carousel = Hero_Component()
  console.log(categories_carousel)
  return (
    <div>
      {/* <div> {categories_carousel}</div> */}
      <div> {classes_carousel} </div>
    </div>
  );
}

export default MainPage;
