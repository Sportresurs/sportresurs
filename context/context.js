import { createContext, useState } from "react";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState({});

  const handleCoordinates = (value) => {
    setCoordinates(value);
  };

  return (
    <Context.Provider value={{ coordinates, handleCoordinates }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };

/* import React from "react";

const Context = React.createContext();

export default Context; */
