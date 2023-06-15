// Import Third-party Dependencies
import React from "react";
import { useSession } from "next-auth/client";

// Import Internal Dependencies
import { InfoMessage, MySpinner } from "../../styledComponent";

const WithAuthPage = ({ children }): JSX.Element => {
  const [session, loading] = useSession();

  return (
    <>
      {loading && ( <MySpinner size="xl"/>)}
      {!loading && !session && (<InfoMessage message="Connectez-vous pour accéder à cette page."/>)}
      {!loading && session && (children)}
    </>
  );
};


export default WithAuthPage;