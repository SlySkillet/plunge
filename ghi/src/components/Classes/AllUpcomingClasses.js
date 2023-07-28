import { React, useState, useEffect } from "react";

function AllUpcomingClasses() {
  const [classes, setClasses] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    async function loadClasses() {
      const response = await fetch(`${baseUrl}/api/classes?feed=upcoming`);
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error(response);
      }
    }
    loadClasses();
  }, []);

  return (
    <div className="all-upcoming-card-container">
      <h1 className="upcoming-title">All Upcoming Classes</h1>
      <div className="card-container">
        {classes.map((classIterable, idx) => {
          const classDetailUrl = `classes/${classIterable.id}`;
          return (
            <div className="card location-card mx-1" key={idx}>
              <div className="card-body location-card">
                <a href={classDetailUrl}>
                  <img
                    src={classIterable.image_1}
                    className="card-img-top"
                    alt="..."
                  />
                </a>
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
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllUpcomingClasses;
