import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const APIKEY = process.env.REACT_APP_K;

const containerStyle = {
  width: "100vh",
  height: "100%",
};

const Maps = (props) => {
  const [center, setCenter] = useState(props);
  const [zoom, setZoom] = useState(13);
  const [currentPosition, setCurrentPosition] = useState();

  useEffect(() => {
     setCenter(props);
     console.log("@useeffect");
     console.log(props);
 }, [props])

  // 初期表示地点
  const success = data => {
    const currentPosition = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
    };
    setCurrentPosition(currentPosition);
    setCenter(currentPosition);
  };

  const error = data => {
    const currentPosition = {
      lat: 35.673542,
      lng: 135.433338
    };
    setCurrentPosition(currentPosition);
    setCenter(currentPosition);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={APIKEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center.center}
          zoom={zoom}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Maps;