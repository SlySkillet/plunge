import React, {useEffect, useState } from 'react';
import "./styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

function ClassesList() {
  const [classes, setClasses] = useState([]);

  const fetchData = async () => {
      const url = 'http://localhost:8000/classes' ;
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json();
          setClasses(data);
          console.log(data)
      }
  }
  useEffect(() => {
      fetchData()
  }, []);

  const renderSlides = () =>
      classes.map(classes_details => (
          <div key= { classes_details.id} >
              <div className='card mx-2'>
                  <div className="card-body">
                      <img src={ classes_details.image_1 } className="card-img-top" alt=''></img>
                      <h5 className="card-title">{ classes_details.class_name }</h5>
                      <p className="card-text">
                          { classes_details.location_city}, { classes_details.location_state}
                      </p>
                      <div className='price'>
                      <p>$<text className=''>{classes_details.price}</text> person</p>
                      </div>
                  </div>
              </div>
          </div>
      ));

  return(
    <div className="Class_Card">
      <div className='carousel'>
        <h1>Categories</h1>
        <Slider
          dots={false}
          slidesToShow={4}
          slidesToScroll={2}
          autoplay={false}
          autoplaySpeed={3000}
        >
          {renderSlides()}
        </Slider>
      </div>
      <div className='carousel'>
        <h1>Location</h1>
        <Slider
          dots={false}
          slidesToShow={4}
          slidesToScroll={2}
          autoplay={false}
          autoplaySpeed={3000}
        >
          {renderSlides()}
        </Slider>
      </div>
      <div className='carousel'>
        <h1>Upcoming</h1>
        <Slider
          dots={false}
          slidesToShow={4}
          slidesToScroll={2}
          autoplay={false}
          autoplaySpeed={3000}
        >
          {renderSlides()}
        </Slider>
      </div>
    </div>

    )
}
export default ClassesList;




/* <div className='container'>
  {classes.map(classes_details => {
      return (
          <div key= { classes_details.id} >
            <div className='col'>
              <div className='card'>
                  <div className="card-body">
                      <img src={ classes_details.image_1 } className="card-img-top" alt=''></img>
                      <h5 className="card-title">{ classes_details.class_name }</h5>
                      <p className="card-text">
                          { classes_details.location_city}, { classes_details.location_state}
                      </p>
                      <div>
                      ${classes_details.price}/person
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )
  })}
</div> */
