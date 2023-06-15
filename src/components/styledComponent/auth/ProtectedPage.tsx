// Import Internal Dependencies
import React from "react";

// Import Third-party Dependencies
import InfoMessage from "../Infos/InfoMessage";
import WithAuthPage from "./WithAuthPage";

interface IProtectedPage {
  children: any
  user: any;
  property: any;
}

const ProtectedPage = ({ children, user, property }: IProtectedPage): JSX.Element => {
  const [isOwner, setIsOwner] = React.useState<boolean>(undefined);

  const isAdmin =
    user && user?.role
      ? user?.role === "ADMIN"
        ? true
        : false
      : undefined;

  const isProprio =
    user && user?.id
      ? user?.id === property?.userId
        ? true
        : false
      : undefined;

  React.useEffect(() => {
    function checkIfOwnerOrAdmin() {
      if (user && property) {
        if (isProprio === true || isAdmin === true) {
          return setIsOwner(true);
        }
        if (isProprio === false || isAdmin === false) {
          return setIsOwner(false);
        }
      }
    }
    checkIfOwnerOrAdmin();
  }, [user, property]);

  return (
    <WithAuthPage>
      {isOwner === undefined && null}
      {isOwner === false && <InfoMessage message="Erreur d'autorisation." />}
      {isOwner === true && (children)}
    </WithAuthPage>
  );
};


export default ProtectedPage;
