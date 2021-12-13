import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Dexie from 'dexie';
import { Location } from './Database';

require('dotenv').config();

const db = new Location();

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = get_center();


function get_center() {
  var center = {
    lat: 35.745,
    lng: 140.523
  };

  var res = db.get_from_db("新宿");

  center = {
    lat: res.lat,
    lng: res.lng
  };

  console.log("current center;");
  console.log(center);
  return center;
}

function MyComponent() {
  console.log(db.get_from_db("hoge"));
  console.log("MyComponent is called");
  const k = process.env.REACT_APP_K;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: k
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        //onLoad={onLoad} // これがいると海中に投げ出される
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)