import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useGetTokenQuery } from "../../store/authApi";
import { Link } from "react-router-dom";

function Map() {
  const center = useMemo(() => ({ lat: 38.909677, lng: -77.029657 }), []);
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const [user, setUser] = useState([]);
  const [classes, setClasses] = useState([]);
  const { data: tokenData } = useGetTokenQuery();

  const baseUrl = process.env.REACT_APP_API_HOST;

  // DETERMINE MAP CENTER
  useEffect(() => {
    async function loadUserLocation() {
      if (tokenData) {
        const url = `${baseUrl}/api/account_details`;
        const fetchConfig = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error(response);
        }
      }
    }
    loadUserLocation();
  }, [baseUrl, tokenData]);

  // LOAD CLASSES IN AREA
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
  }, [baseUrl]);

  return (
    <div>
      <div className="outer-map-container">
        <GoogleMap
          zoom={15}
          center={
            tokenData
              ? {
                  lat: parseFloat(user.location_latitude),
                  lng: parseFloat(user.location_longitude),
                }
              : center
          }
          mapContainerClassName="map-container"
          options={mapOptions}
        >
          <div>
            <MarkerF
              position={
                tokenData
                  ? {
                      lat: parseFloat(user.location_latitude),
                      lng: parseFloat(user.location_longitude),
                    }
                  : center
              }
            />
          </div>
          <div>
            {classes.map((classIterable, idx) => {
              // ICON DIRECTORY
              const icons = [
                "https://cdn-icons-png.flaticon.com/32/9602/9602783.png",
                "https://cdn-icons-png.flaticon.com/32/3980/3980755.png",
                "https://cdn.icon-icons.com/icons2/2622/PNG/32/map_entertainment_icon_158317.png",
                "https://cdn-icons-png.flaticon.com/32/3585/3585639.png",
                "https://cdn-icons-png.flaticon.com/32/94/94148.png",
                "https://cdn-icons-png.flaticon.com/32/1440/1440231.png",
                "https://cdn-icons-png.flaticon.com/32/3393/3393920.png",
                "https://cdn-icons-png.flaticon.com/32/9610/9610642.png",
                "https://cdn-icons-png.flaticon.com/32/7874/7874908.png",
                "https://cdn-icons-png.flaticon.com/32/67/67468.png",
                "https://cdn-icons-png.flaticon.com/32/3143/3143865.png",
              ];
              return (
                <MarkerF
                  key={idx}
                  position={{
                    lat: parseFloat(classIterable.location_latitude),
                    lng: parseFloat(classIterable.location_longitude),
                  }}
                  icon={icons[classIterable.category_id - 1]}
                />
              );
            })}
          </div>
        </GoogleMap>
      </div>
      <div className="card-container location-page">
        {classes.map((classIterable, Idx) => {
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

function Locations() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Map />
    </div>
  );
}

export default Locations;
