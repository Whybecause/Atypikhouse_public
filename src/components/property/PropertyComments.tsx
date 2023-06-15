// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import { MyModal } from "../styledComponent";
import CommentList from "../comments/CommentList.component";

const PropertyComments = ({ reviews }): JSX.Element => {

  return (
    <MyModal
      size="full"
      toggle={
        <a>
          Voir les commentaires (
          {reviews?.length ? reviews?.length : 0})
        </a>}
      header="Liste des commentaires."
      body={<CommentList reviews={reviews} />}
      isClosableBottom={true}
    />
  );
};


export default PropertyComments;
