import React from 'react'
import GoogleMapReact from "google-map-react";
import { IoMdWater } from 'react-icons/io';


//APIKEYは""としていれば開発者モードで使えます
const APIKEY = process.env.REACT_APP_K;

function Maps({ center, zoom=13, saunas=[] }) {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        center={center}
        defaultZoom={zoom}
      >
        {saunas.map(
          (sauna, index) => {
            return (
              <SaunaMarker
                key={index}
                lat={sauna.lat}
                lng={sauna.lng}
                sauna={sauna}
              />
            );
          }
        )}
      </GoogleMapReact>
    </div>
  );
};

function SaunaMarker({lat, lng, sauna}) {
  // sauna を描画するコンポーネント.
  return (
    <p><IoMdWater />{sauna.name}</p>
  );
}

export default Maps;
