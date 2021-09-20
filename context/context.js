import { createContext, useState } from "react";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);

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
