import React, { useEffect, useState } from 'react';
import './App.css';
import { geolocated } from "react-geolocated";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

function App(props: any) {
  const [coordAvailable, setCoordAvailable] = useState(false)
  const [position, setPosition] = useState<any>()

  useEffect(()=> {
    console.log(props.isGeolocationAvailable)
    console.log(props.isGeolocationEnabled)
    console.log(props.coords)
    if (props.isGeolocationAvailable && props.isGeolocationEnabled && props.coords) {
      setPosition([props.coords.latitude, props.coords.longitude])
      setCoordAvailable(true)
    }
  }, [props.isGeolocationAvailable, props.isGeolocationEnabled, props.coords])

  return (
    <>{coordAvailable ? (
        <Map center={position} zoom={20}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </Map>
      ) : (
        <div>Loading</div>
      )
    }</>
  );
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);

// export default App;
