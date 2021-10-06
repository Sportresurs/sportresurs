import { createContext, useState } from "react";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [filterData, setFilterData] = useState({
    purposeOfAreas: [],
    districts: [],
  });

  const handleCoordinates = (value) => {
    setCoordinates(value);
  };
  const handleFilterData = (e) => {
    setFilterData([
      { label: e.target.textContent, value: e.target.textContent },
    ]);
  };

  return (
    <Context.Provider
      value={{
        coordinates,
        filterData,
        handleCoordinates,
        handleFilterData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
