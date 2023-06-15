import React from "react";
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { useAppSelector } from "../hooks/reduxHook";

function MapOnSearch({ properties, searchedLocation }) {
  const propertyStatus = useAppSelector((state) => state.properties.status);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
  });

  const [center, setCenter] = React.useState(null);
  const [propertiesCoord, setPropertiesCoord] = React.useState([]);

  console.log(searchedLocation);
  //Set the center location of the map according to the query
  const onLoad = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: `${searchedLocation} France` },
      function (results, status) {
        if (status == "OK") {
          setCenter(results[0].geometry.location);
        } else {
          console.log(status);
        }
      }
    );

    for (const property of properties) {
      geocoder.geocode(
        { address: `${property.adress.street} ${property.adress.city} ${property.adress.ZIPCode} France` },
        function (results, status) {
          if (status == "OK") {
            setPropertiesCoord(prev => [...prev, {id: property.id, coord: results[0].geometry.location }])
          }
        }
      )
    }
  };

  const onUnmount = () => {
    setCenter(null);
    setPropertiesCoord([]);
  }

  // used to keep the propertiesCoord array OK if we use filters on the search coz the component is not going to recalculate coord
  const findPropertyCoord = (id) => {
    const index = propertiesCoord.findIndex(item => item.id === id)
    return propertiesCoord[index]?.coord
  }

  return isLoaded && propertyStatus === "succeeded" ? (
    <GoogleMap
    center={center}
    zoom={searchedLocation === "France" ? 7 : 12}
    onLoad={onLoad}
    onUnmount={onUnmount}
    >
      {properties?.map(property => (
        <Marker
          position={findPropertyCoord(property.id)}
          onClick={() => alert(`${property.name} ${property.adress.city}`)}
          label={`${property.price.toString()}€`}
        />
      ))}
      <></>
    </GoogleMap>
  ) : <></>;
}


export default React.memo(MapOnSearch);
