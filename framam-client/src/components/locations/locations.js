import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyle from "./mapStyles";
import CustomIcon from "../assets/trash.png";

const RecyclingLocations = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // not safe nb: just for test
  });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const showInfoWindow = () => {
    setInfoWindowOpen(true);
  };
  const { position, infoWindowData } = props;
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const pos = {
  //       lat: position.coords.latitude,
  //       lgn: position.coords.longitude
  //     }
  //   })
  // }

  const center = { lat: 5.55164, lng: -0.194864 };

  const markers = [
    { name: "loc-1", location: { lat: 5.559642, lng: -0.195583 } },
    { name: "loc-2", location: { lat: 5.557207, lng: -0.189261 } },
    { name: "loc-3", location: { lat: 5.55164, lng: -0.194864 } },
    { name: "loc-4", location: { lat: 5.557739, lng: -0.178414 } },
    { name: "loc-5", location: { lat: 5.552438, lng: -0.185148 } },
  ];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-center pb-5">
        Find Recycling Facilities In Accra - Ghana
      </h1>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{ styles: mapStyle.silver }}
      >
        {markers.map((marker) => {
          return (
            <div key={marker.name}>
              <MarkerF
                position={marker.location}
                options={{ icon: CustomIcon }}
                onClick={showInfoWindow}
              >
                {infoWindowOpen && (
                  <InfoWindowF
                    position={position}
                    onCloseClick={() => setInfoWindowOpen(false)}
                  >
                    <div>
                      <img
                        src="https://img.icons8.com/color/256/user-female-circle.png"
                        alt="avatar"
                      />
                      <div>
                        {center.lat} | {center.lng}
                      </div>
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            </div>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default RecyclingLocations;
