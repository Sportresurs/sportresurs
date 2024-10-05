import { createContext, useState } from "react";
import districtInfo from "../utils/districtCentrCoords";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [districtCenter, setDistrictCenter] = useState(null);
  const [zoom, setZoom] = useState(null);

  const [center, setCenter] = useState(null);
  const [isSearchPinShow, setIsSearchPinShow] = useState(false);

  const showFilteredDistrict = (districts) => {
    if (districts.length === 1) {
      setCenter(districtInfo[districts[0].value].coords);
      setZoom(districtInfo[districts[0].value].zoom);
      return;
    }
    setCenter(districtInfo.multi.coords);
    setZoom(districtInfo.multi.zoom);
  };

  const handleCoordinates = (value) => {
    setCoordinates(value);
    setIsSearchPinShow(true);
    setCenter(null);
  };

  return (
    <Context.Provider
      value={{
        setCoordinates,
        isSearchPinShow,
        setIsSearchPinShow,
        center,
        setCenter,
        zoom,
        setZoom,
        districtCenter,
        setDistrictCenter,
        coordinates,
        handleCoordinates,
        showFilteredDistrict,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
