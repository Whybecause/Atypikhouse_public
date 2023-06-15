import React from "react";
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { useAppSelector } from "../hooks/reduxHook";
import { selectPropertiesById } from "../slices/propertiesSlice";

function MyMap() {
  const router = useRouter();
  const propertyId = Number(router.query.id);
  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));
  const propertyStatus = useAppSelector((state) => state.properties.status);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
  });
  const [center, setCenter] = React.useState(null);

  const onLoad = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: property?.adress?.city },
      function (results, status) {
        if (status == "OK") {
          setCenter(results[0].geometry.location);
        } else {
          console.log(status);
        }
      }
    );
  };

  const onUnmount = () => setCenter(null);

  return isLoaded && propertyStatus === "succeeded" ? (
    <GoogleMap
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
      <></>
    </GoogleMap>
  ) : <></>;
}


export default React.memo(MyMap);
