import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import InputAddress from "./InputAddress";

function Map() {
  const center = useMemo(() => ({ lat: 38.909677, lng: -77.029657 }), []);
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    async function loadClasses() {
      const response = await fetch(
        "http://localhost:8000/classes?feed=upcoming"
      );
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error(response);
      }
    }
    loadClasses();
  }, []);
  console.log("classes => ", classes);

  return (
    <div>
      <div className="outer-map-container">
        <div className="controls">
          <h1>Your Location</h1>
          <InputAddress />
        </div>
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="map-container"
          options={mapOptions}
        >
          <div>
            <MarkerF position={center} />
          </div>
          <div>
            {classes.map((classIterable, idx) => {
              return (
                <MarkerF
                  key={idx}
                  position={{
                    lat: parseFloat(classIterable.location_latitude),
                    lng: parseFloat(classIterable.location_longitude),
                  }}
                />
              );
            })}
          </div>
        </GoogleMap>
      </div>
      <div className="card-container">
        {classes.map((classIterable, Idx) => {
          return (
            <div className="card" key={Idx}>
              <img
                src={classIterable.image_1}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{classIterable.class_name}</h5>
                <p className="card-text">{classIterable.description}</p>
                <p className="card-text">{classIterable.location_address}</p>
                <a href="#" className="btn btn-primary">
                  Class Details
                </a>
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
