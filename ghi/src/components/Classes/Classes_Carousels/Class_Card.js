import React, { useEffect, useState } from "react";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTokenQuery } from "../../../store/authApi";
import Slider from "react-slick";
import { trim } from "jquery";

function ClassesList() {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const { data: tokenData } = useGetTokenQuery();
  const [featured, setFeatured] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nearby, setNearby] = useState([]);

  const fetchData = async () => {
    const url_featured = `${baseUrl}/api/classes?feed=featured`;
    const url_upcoming = `${baseUrl}/api/classes?feed=upcoming`;
    const response_featured = await fetch(url_featured);
    const response_upcoming = await fetch(url_upcoming);
    if (response_featured.ok) {
      const data = await response_featured.json();
      setFeatured(data.slice(0, 8));
    }
    if (response_upcoming.ok) {
      const data = await response_upcoming.json();
      setUpcoming(data.slice(0, 8));
    }

    if (tokenData) {
      const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      };
      const url_nearby = `${baseUrl}/api/classes?feed=nearby`;
      const response_nearby = await fetch(url_nearby, fetchConfig);
      if (response_nearby.ok) {
        const data = await response_nearby.json();
        setNearby(data.slice(0, 8));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [tokenData]);

  useEffect(() => {
    fetchData();
  }, []);

  const renderSlides_Featured = () =>
    featured &&
    featured.map((classes_details) => (
      <div key={classes_details.id}>
        <a className="nav-link" href={"classes/" + classes_details.id}>
          <div className="card mx-2 border-0" style={{ maxWidth: "275px" }}>
            <div className="card-body">
              <img
                src={classes_details.image_1}
                className="card-img-top"
                alt=""
              ></img>
              <div className="crop-text-2">
                <h5 className="card-title">{classes_details.class_name}</h5>
              </div>
              <p className="card-text">
                {classes_details.location_city},{" "}
                {classes_details.location_state}
              </p>
              <div className="price">
                <span className="Header">${classes_details.price}</span> person
              </div>
            </div>
          </div>
        </a>
      </div>
    ));

  const renderSlides_Upcoming = () =>
    upcoming.map((classes_details) => (
      <div key={classes_details.id}>
        <a className="nav-link" href={"classes/" + classes_details.id}>
          <div className="card mx-2 border-0" style={{ maxWidth: "275px" }}>
            <div className="card-body">
              <img
                src={classes_details.image_1}
                className="card-img-top"
                alt=""
              ></img>
              <div className="crop-text-2">
                <h5 className="card-title">{classes_details.class_name}</h5>
              </div>
              <p className="card-text">
                {classes_details.location_city},{" "}
                {classes_details.location_state}
              </p>
              <div className="price">
                <span className="Header">${classes_details.price}</span> person
              </div>
            </div>
          </div>
        </a>
      </div>
    ));

  const renderSlides_Nearby = () =>
    nearby.map((classes_details) => (
      <div key={classes_details.id}>
        <a className="nav-link" href={"classes/" + classes_details.id}>
          <div className="card mx-2 border-0" style={{ maxWidth: "275px" }}>
            <div className="card-body">
              <img
                src={classes_details.image_1}
                className="card-img-top"
                alt=""
              ></img>
              <div className="crop-text-2">
                <h5 className="card-title">{classes_details.class_name}</h5>
              </div>
              <p className="card-text">
                {classes_details.location_city},{" "}
                {classes_details.location_state}
              </p>
              <div className="price">
                <span className="Header">${classes_details.price}</span> person
              </div>
            </div>
          </div>
        </a>
      </div>
    ));

  const minCards = (feed) => {
    if (feed.length < 4) {
      return feed.length;
    }
    return 4;
  };

  const maxCarouselWidth = (feed) => {
    if (feed.length <= 4) {
      let width = feed.length * 309;
      return { maxWidth: `${width}px` };
    }
    return { maxWidth: `1236px` };
  };

  const setHeader = () => {
    if (nearby.length == 0) {
      return null;
    }
    return "Nearby";
  };
  return (
    <div className="Class_Card">
      <div className="carousel" style={maxCarouselWidth(featured)}>
        <h1 className="Header">Featured</h1>
        <Slider
          slidesToShow={minCards(featured)}
          slidesToScroll={4}
          autoplay={true}
          autoplaySpeed={4000}
          dots={true}
          speed={2000}
          infinite={true}
          swipe={false}
        >
          {renderSlides_Featured()}
        </Slider>
      </div>
      <div className="carousel" style={maxCarouselWidth(upcoming)}>
        <h1 className="Header">Upcoming</h1>
        <Slider
          slidesToShow={minCards(upcoming)}
          slidesToScroll={4}
          autoplay={true}
          autoplaySpeed={4000}
          dots={true}
          speed={2000}
          infinite={true}
        >
          {renderSlides_Upcoming()}
        </Slider>
      </div>
      <div className="carousel" style={maxCarouselWidth(nearby)}>
        <h1 className="Header">{setHeader()}</h1>
        <Slider
          slidesToShow={minCards(nearby)}
          slidesToScroll={4}
          autoplay={true}
          autoplaySpeed={4000}
          dots={true}
          speed={2000}
          infinite={true}
        >
          {renderSlides_Nearby()}
        </Slider>
      </div>
    </div>
  );
}
export default ClassesList;
