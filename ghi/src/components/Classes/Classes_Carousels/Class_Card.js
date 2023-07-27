import React, {useEffect, useState } from 'react';
import "./styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTokenQuery, useLogoutMutation } from "../../../store/authApi" ;
import Slider from "react-slick";

function ClassesList() {
    const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useGetTokenQuery();
  const [featured, setFeatured] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nearby, setNearby] = useState([]);

  const fetchData = async () => {
      const url_featured = 'http://localhost:8000/classes?feed=featured' ;
      const url_upcoming = 'http://localhost:8000/classes?feed=upcoming' ;
      const response_featured = await fetch(url_featured);
      const response_upcoming = await fetch(url_upcoming);
      if (response_featured.ok) {
          const data = await response_featured.json();
          setFeatured(data);
      }
      if (response_upcoming.ok) {
          const data = await response_upcoming.json();
          setUpcoming(data);
      }

    if (tokenData) {
    const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      };
    const url_nearby = 'http://localhost:8000/classes?feed=nearby' ;
    const response_nearby = await fetch(url_nearby, fetchConfig);
    if (response_nearby.ok) {
          const data = await response_nearby.json();
          setNearby(data);
    }
    }
  }


  useEffect(() => {
		fetchData();
	}, [tokenData]);

  useEffect(() => {
      fetchData()
  }, []);

  const renderSlides_Featured = () => featured &&
      featured.map(classes_details => (
          <div key= { classes_details.id} >
            <a className="nav-link" href={ "classes/" + classes_details.id }>
                <div className='card mx-2' style={{maxWidth: '275px'}} >
                  <div className="card-body">
                      <img src={ classes_details.image_1 } className="card-img-top" alt=''></img>
                      <h5 className="card-title">{ classes_details.class_name }</h5>
                      <p className="card-text">
                          { classes_details.location_city}, { classes_details.location_state}
                      </p>
                      <div className='price'>
                       <div>${classes_details.price} person</div>
                      </div>
                  </div>
              </div>
            </a>
          </div>
      ));

  const renderSlides_Upcoming = () =>
      upcoming.map(classes_details => (
          <div key= { classes_details.id} >
            <a className="nav-link" href={ "classes/" + classes_details.id }>
                <div className='card mx-2' style={{maxWidth: '275px'}} href="http://localhost:3000/categories">
                  <div className="card-body">
                      <img src={ classes_details.image_1 } className="card-img-top" alt=''></img>
                      <h5 className="card-title">{ classes_details.class_name }</h5>
                      <p className="card-text">
                          { classes_details.location_city}, { classes_details.location_state}
                      </p>
                      <div className='price'>
                       <div>${classes_details.price} person</div>
                      </div>
                  </div>
              </div>
            </a>
          </div>
      ));

  const renderSlides_Nearby = () =>
      nearby.map(classes_details => (
          <div key= { classes_details.id}>
            <a className="nav-link" href={ "classes/" + classes_details.id }>
                <div className='card mx-2' style={{maxWidth: '275px'}}>
                  <div className="card-body">
                      <img src={ classes_details.image_1 } className="card-img-top" alt=''></img>
                      <h5 className="card-title">{ classes_details.class_name }</h5>
                      <p className="card-text">
                          { classes_details.location_city}, { classes_details.location_state}
                      </p>
                      <div className='price'>
                       <div>${classes_details.price} person</div>
                      </div>
                  </div>
              </div>
            </a>
          </div>
      ));

    const minCards = (feed) => {
        if (feed.length < 4) {
            return feed.length
        }
        return 4
    }

    const maxCarouselWidth = (feed) => {
        if (feed.length <= 4) {
            let width = feed.length * 309;
            return {maxWidth: `${width}px`}
        }
        return {maxWidth: `1236px`}
    }
  return(
    <div className="Class_Card">
      <div className='carousel' style={maxCarouselWidth(featured)}>
        <h1>Featured</h1>
        <Slider
          slidesToShow={minCards(featured)}
          slidesToScroll={2}
          autoplay={false}
          autoplaySpeed={4000}
          swipeToSlide= {true}
        >
          {renderSlides_Featured()}
        </Slider>
      </div>
      <div className='carousel' style={maxCarouselWidth(upcoming)}>
        <h1>Upcoming</h1>
        <Slider
          slidesToShow={minCards(upcoming)}
          slidesToScroll={2}
          autoplay={false}
          autoplaySpeed={4000}
          swipeToSlide= {true}
        >
          {renderSlides_Upcoming()}
        </Slider>
      </div>
      <div className='carousel' style={maxCarouselWidth(nearby)}>
        <h1>Nearby</h1>
        <Slider
          dots={true}
          slidesToShow={minCards(nearby)}
          slidesToScroll={2}
          autoplay={true}
          autoplaySpeed={4000}
          swipeToSlide= {true}
        >
          {renderSlides_Nearby()}
        </Slider>
      </div>
    </div>

    )
}
export default ClassesList;
