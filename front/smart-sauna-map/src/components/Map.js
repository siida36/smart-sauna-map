import React from 'react';
import GoogleMapReact from 'google-map-react';
import { SaunaMarker } from './Marker';

// APIKEYは""としていれば開発者モードで使えます
const APIKEY = process.env.REACT_APP_K;

function Maps({ center, zoom = 13, saunas = [] }) {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        center={center}
        defaultZoom={zoom}
      >
        {saunas.map(
          (sauna, index) => (
            <SaunaMarker
              // TODO: sauna.id が取得できるようになったら index の代わりに使用する
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              lat={sauna.lat}
              lng={sauna.lng}
              sauna={sauna}
            />
          ),
        )}
      </GoogleMapReact>
    </div>
  );
}

export default Maps;
