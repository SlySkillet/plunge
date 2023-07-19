import React, {useEffect, useState } from 'react';
import "./styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

function ClassesList() {
  const [featured, setFeatured] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nearby, setNearby] = useState([]);

  const fetchData = async () => {
      const url_featured = 'http://localhost:8000/classes?feed=featured' ;
      const url_upcoming = 'http://localhost:8000/classes?feed=upcoming' ;
      const url_nearby = 'http://localhost:8000/classes?feed=nearby' ;
      const response_featured = await fetch(url_featured);
      const response_upcoming = await fetch(url_upcoming);
      const response_nearby = await fetch(url_nearby);
      if (response_featured.ok) {
          const data = await response_featured.json();
          setFeatured(data);
          console.log(data)
      }
      if (response_upcoming.ok) {
          const data = await response_upcoming.json();
          setUpcoming(data);
          console.log(data)
      }
      if (response_nearby.ok) {
          const data = await response_nearby.json();
          setNearby(data);
          console.log(data)
      }

  }



  useEffect(() => {
      fetchData()
  }, []);

  const renderSlides_Featured = () =>
      featured.map(classes_details => (
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

  const renderSlides_Upcoming = () =>
      featured.map(classes_details => (
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

  const renderSlides_Nearby = () =>
      featured.map(classes_details => (
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
        <h1>Featured</h1>
        <Slider
          dots={true}
          slidesToShow={4}
          slidesToScroll={2}
          autoplay={true}
          autoplaySpeed={4000}
        >
          {renderSlides_Featured()}
        </Slider>
      </div>
      <div className='carousel'>
        <h1>Upcoming</h1>
        <Slider
          dots={true}
          slidesToShow={4}
          slidesToScroll={2}
          autoplay={true}
          autoplaySpeed={4000}
        >
          {renderSlides_Upcoming()}
        </Slider>
      </div>
      <div className='carousel'>
        <h1>Nearby</h1>
        <Slider
          dots={true}
          slidesToShow={4}
          slidesToScroll={2}
          autoplay={true}
          autoplaySpeed={4000}
        >
          {renderSlides_Nearby()}
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
