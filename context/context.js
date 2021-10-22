import { createContext, useState, useEffect } from "react";
import axios from "axios";
import districtCentrCoords from "../utils/districtCentrCoords";
import districtInfo from "../utils/districtCentrCoords";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [districtCenter, setDistrictCenter] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [filterData, setFilterData] = useState({
    purposeOfAreas: [],
    districts: [],
    rating: { value: 0 },
  });
  const [filterFields, setFilterFields] = useState({
    purposes: [],
    districts: [],
  });
  const [areas, setAreas] = useState([]);
  const [currentDisctrict, setCurrentDisctrict] = useState([]);
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

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_HOST}api/areas/filter-fields`,
    }).then(({ data }) => setFilterFields(data));
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_HOST}api/areas`,
    }).then(({ data }) => setAreas(data.areas));
  }, []);

  const handleCoordinates = (value) => {
    setCoordinates(value);
    setIsSearchPinShow(true);
    setCenter(null);
  };
  const handleFilterDistrict = (e) => {
    setZoom(districtCentrCoords[e.target.textContent].zoom);
    setDistrictCenter(districtCentrCoords[e.target.textContent].coords);
    setFilterData({
      purposeOfAreas: [],
      districts: [{ label: e.target.textContent, value: e.target.textContent }],
    });
  };
  const handleFilterPurpose = (e) => {
    setFilterData({
      districts: [],
      purposeOfAreas: [
        { label: e.target.textContent, value: e.target.textContent },
      ],
    });
  };

  return (
    <Context.Provider
      value={{
        setCoordinates,
        isSearchPinShow,
        setIsSearchPinShow,
        center,
        setCenter,
        currentDisctrict,
        setCurrentDisctrict,
        zoom,
        setZoom,
        districtCenter,
        setDistrictCenter,
        coordinates,
        filterData,
        filterFields,
        areas,
        setAreas,
        setFilterData,
        handleCoordinates,
        handleFilterDistrict,
        handleFilterPurpose,
        showFilteredDistrict,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
