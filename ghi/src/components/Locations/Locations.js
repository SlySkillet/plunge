import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

function Map() {
  const center = useMemo(() => ({ lat: 38.909677, lng: -77.029657 }), []);
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
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <MarkerF position={{ lat: 38.909677, lng: -77.029657 }} />
      {/* <MarkerF position={{ lat: 38.911105, lng: -77.029666 }} /> */}
    </GoogleMap>
  );
}

function Locations() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <Map />;
}

export default Locations;
