import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

function Map() {
  const center = useMemo(() => ({ lat: 38.909677, lng: -77.029657 }), []);
  console.log("center =>", center);
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <MarkerF position={{ lat: 38.909677, lng: -77.029657 }} />
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
