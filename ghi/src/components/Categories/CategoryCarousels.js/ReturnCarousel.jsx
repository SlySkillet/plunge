import React from "react";
import { Carousel, Stack } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function ReturnCarousel({ stack1, stack2, title, categoryId }) {
  const categoryPagePath = `/categories/${categoryId}`;
  const navigate = useNavigate();
  return (
    <div>
      <div className="upcoming-container">
        <div className="carousel-title-row">
          <h3 className="upcoming-title">{title}</h3>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-primary more-classes-btn"
              onClick={(e) => {
                navigate(categoryPagePath);
              }}
              style={{ maxWidth: "200px" }}
            >
              See More...
            </button>
          </div>
        </div>
        <Carousel variant="dark" className="upcoming-carousel">
          <Carousel.Item>
            <Stack className="card-stack" direction="horizontal" gap={0}>
              {stack1.map((classIterable, Idx) => {
                const classDetailUrl = `../classes/${classIterable.id}`;
                return (
                  <div className="card location-card mx-1" key={Idx}>
                    <div className="card-body location-card">
                      <Link to={classDetailUrl}>
                        <img
                          src={classIterable.image_1}
                          className="card-img-top"
                          alt="..."
                        />
                      </Link>
                      <h5 className="card-title location-card">
                        {classIterable.class_name}
                      </h5>
                      <div></div>
                      <p className="card-text location-card">
                        {classIterable.description.length > 143
                          ? classIterable.description.substr(0, 140) + "..."
                          : classIterable.description}
                      </p>
                      <ul className="list-group list-group-flush location-card">
                        <li className="list-group-item">
                          <p className="card-text location-card">
                            {classIterable.location_address.length > 16
                              ? classIterable.location_address.substr(0, 13) +
                                "..."
                              : classIterable.location_address}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </Stack>
          </Carousel.Item>
          <Carousel.Item>
            <Stack className="card-stack" direction="horizontal" gap={0}>
              {stack2.map((classIterable, Idx) => {
                const classDetailUrl = `../classes/${classIterable.id}`;
                return (
                  <div className="card location-card mx-1" key={Idx}>
                    <div className="card-body location-card">
                      <Link to={classDetailUrl}>
                        <img
                          src={classIterable.image_1}
                          className="card-img-top"
                          alt="..."
                        />
                      </Link>
                      <h5 className="card-title location-card">
                        {classIterable.class_name}
                      </h5>
                      <p className="card-text location-card">
                        {classIterable.description.length > 153
                          ? classIterable.description.substr(0, 150) + "..."
                          : classIterable.description}
                      </p>
                      <ul className="list-group list-group-flush location-card">
                        <li className="list-group-item">
                          <p className="card-text location-card">
                            {classIterable.location_address.length > 18
                              ? classIterable.location_address.substr(0, 15) +
                                "..."
                              : classIterable.location_address}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </Stack>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default ReturnCarousel;
