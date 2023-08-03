import { React, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

function SearchResults() {
  let [searchParams] = useSearchParams();
  const term = searchParams.get("term");
  const [classes, setClasses] = useState([]);

  const baseUrl = process.env.REACT_APP_API_HOST;

  useEffect(() => {
    const fetchData = async () => {
      let url = `${baseUrl}/api/classes?search_term=${term}`;
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        setClasses(data);
      } else {
        console.error(response);
      }
    };
    fetchData();
  }, [baseUrl, searchParams, term]);

  return (
    <div className="all-upcoming-card-container">
      <h1 className="upcoming-title">Search Results</h1>
      {classes.length < 1 ? (
        <h5 className="text-center">No results found</h5>
      ) : (
        <div className="card-container">
          {classes.map((classIterable, idx) => {
            const classDetailUrl = `../classes/${classIterable.id}`;
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
                      <Link to={classDetailUrl} className="btn btn-primary">
                        Class Details
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
