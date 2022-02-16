import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

//APIKEYは""としていれば開発者モードで使えます
const APIKEY = process.env.REACT_APP_K;

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
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        center={center.center}
        defaultZoom={zoom}
      >
      </GoogleMapReact>
    </div>
  );
};

export default Maps;