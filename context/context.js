import { createContext, useState } from "react";
import districtInfo from "../utils/districtCentrCoords";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [districtCenter, setDistrictCenter] = useState(null);
  const [zoom, setZoom] = useState(15);

  const [center, setCenter] = useState({ lat: 49.841328, lng: 24.031592 });
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

  const handleFilterDistrict = (e) => {
    setZoom(districtInfo[e.target.textContent].zoom);
    setDistrictCenter(districtInfo[e.target.textContent].coords);
  };

  const handleCoordinates = (value) => {
    setCoordinates(value);
    setIsSearchPinShow(true);
    setCenter(value);
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
        handleFilterDistrict,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
