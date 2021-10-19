import React from "react";
import Spinner from "../Spinner";

const WithLoader = ({ isLoading, children }) => (
  <>
    {isLoading ? (
      <div>
        <Spinner color="red" size="100px" />
      </div>
    ) : (
      children
    )}
  </>
);

export default WithLoader;
