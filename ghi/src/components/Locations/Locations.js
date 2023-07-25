import React, { useMemo, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import { useGetTokenQuery } from "../../store/authApi";
// import { FaPaintBrush } from "react-icons/fa";

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
  // console.log("user", user);
  // console.log("script", LoadScript);

  // LOAD CLASSES IN AREA
  useEffect(() => {
    async function loadClasses() {
      const response = await fetch(
        "http://localhost:8000/classes?feed=upcoming"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);

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
  // console.log("classes => ", classes);

  useEffect(() => {
    async function loadMapBounds() {
      const bounds = await GoogleMap.getBounds();
      console.log("mapBounds: ", bounds);
    }
    loadMapBounds();
  }, [GoogleMap]);

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
              // CLASS ICONS
              // const icon = {
              //   1: {
              //     url: "https://cdn-icons-png.flaticon.com/32/66/66246.png",
              //   },
              //   2: {
              //     // Design and Style
              //   },
              //   3: {
              //     // Arts and Entertainment
              //   },
              //   4: {
              //     // Business
              //   },
              //   5: {
              //     // Sports and Gaming
              //   },
              //   6: {
              //     // Writing
              //   },
              //   7: {
              //     // Science and Tech
              //   },
              //   8: {
              //     // Home and lifestyle
              //   },
              //   9: {
              //     // Community and Government
              //   },
              //   10: {
              //     // Health and Wellness
              //   },
              //   11: {
              //     // Food
              //   },
              // };
              return (
                <MarkerF
                  key={idx}
                  // icon={classIterable.category_id}
                  // icon={"https://cdn-icons-png.flaticon.com/32/66/66246.png"}
                  // icon={"https://cdn-icons-png.flaticon.com/32/67/67745.png"}
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
