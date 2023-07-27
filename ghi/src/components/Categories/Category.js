import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Category() {
  let { Id } = useParams();
  const [classes, setClasses] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  const fetchData = async () => {
    let url = `${baseUrl}/api/classes?category=${Id}`;
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      setClasses(data);
    } else {
      console.error(response);
    }
  };

  const categoriesTable = {
    1: "Music",
    2: "Design & Style",
    3: "Arts & Entertainment",
    4: "Business",
    5: "Sports & Gaming",
    6: "Writing",
    7: "Science & Tech",
    8: "Home & Lifestyle",
    9: "Community & Government",
    10: "Health & Wellness",
    11: "Food",
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="all-upcoming-card-container">
      <h1 className="upcoming-title">{categoriesTable[Id]}</h1>
      <div className="card-container">
        {classes.map((classIterable, idx) => {
          const classDetailUrl = `/classes/${classIterable.id}`;
          return (
            <div className="card location-card mx-2" key={idx}>
              <div className="card-body location-card">
                <img
                  src={classIterable.image_1}
                  className="card-img-top"
                  alt="..."
                />
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
                        ? classIterable.location_address.substr(0, 13) + "..."
                        : classIterable.location_address}
                    </p>
                  </li>
                  <li className="list-group-item">
                    <a href={classDetailUrl} className="btn btn-primary">
                      Class Details
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
