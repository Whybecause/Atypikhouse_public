// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import { InfoMessage, MySpinner } from "../styledComponent";
import { useAppSelector } from "../../hooks/reduxHook";

const PropertiesStatus = ({ children, property }): JSX.Element => {
  const propertiesStatus = useAppSelector(
    (state) => state.properties.status
  );
  const error = useAppSelector((state) => state.properties.error);

  return (
    <>
      {propertiesStatus === "loading" && (
        <MySpinner size="xl" />
      )}
      {propertiesStatus === "succeeded" && (
        property === undefined
          ? (<InfoMessage message="Aucune propriété trouvée." />)
          : (children)
      )}
      {propertiesStatus === "failed" && (
        <InfoMessage message={error} />
      )}
    </>
  );
};


export default PropertiesStatus;
