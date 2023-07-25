import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useGetTokenQuery } from "../../store/authApi";

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

  // DETERMINE MAP CENTER
  useEffect(() => {
    async function loadUserLocation() {
      if (tokenData) {
        console.log(tokenData.account.id);
        const url = `http://localhost:8000/account/${tokenData.account.id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      }
    }
    loadUserLocation();
  }, [tokenData]);

  // LOAD CLASSES IN AREA
  useEffect(() => {
    async function loadClasses() {
      const response = await fetch(
        "http://localhost:8000/classes?feed=upcoming"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);
        // FILTER CLASSES BY COORDINATES
        const classesInArea = [];
        for (let classData in data) {
          if (tokenData) {
            if (
              Math.abs(
                parseFloat(data[classData].location_latitude) -
                  parseFloat(user.location_latitude)
              ) < 0.01355 &&
              Math.abs(
                parseFloat(data[classData].location_longitude) -
                  parseFloat(user.location_longitude)
              ) < 0.035663
            ) {
              classesInArea.push(data[classData]);
            }
          } else {
            if (
              Math.abs(
                parseFloat(data[classData].location_latitude) -
                  parseFloat(center.lat)
              ) < 0.01355 &&
              Math.abs(
                parseFloat(data[classData].location_longitude) -
                  parseFloat(center.lng)
              ) < 0.035663
            ) {
              classesInArea.push(data[classData]);
            }
          }
        }
        setClasses(classesInArea);
      } else {
        console.error(response);
      }
    }

    loadClasses();
  }, []);

  console.log("classes:", classes);

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
                  size="32px"
                />
              );
            })}
          </div>
        </GoogleMap>
      </div>
      <div className="card-container">
        {classes.map((classIterable, Idx) => {
          return (
            <div className="card mx-2" key={Idx}>
              <div className="card-body">
                <img
                  src={classIterable.image_1}
                  className="card-img-top"
                  alt="..."
                />
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
