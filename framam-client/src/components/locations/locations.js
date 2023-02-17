import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import CustomIcon from "../assets/trash.png";

const RecyclingLocations = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // not safe nb: just for test
  });
  const center = { lat: 5.558175, lng: -0.191471 };
  const markers = [
    { name: "loc-1", location: { lat: 5.559642, lng: -0.195583 } },
    { name: "loc-2", location: { lat: 5.557207, lng: -0.189261 } },
    { name: "loc-3", location: { lat: 5.55164, lng: -0.194864 } },
    { name: "loc-4", location: { lat: 5.557739, lng: -0.178414 } },
    { name: "loc-5", location: { lat: 5.552438, lng: -0.185148 } },
  ];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="mt-20">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
      >
        {markers.map((marker) => {
          return (
            <div key={marker.name}>
              <MarkerF
                position={marker.location}
                options={{ icon: CustomIcon }}
              />
            </div>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default RecyclingLocations;
