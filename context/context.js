import { createContext, useState, useEffect } from "react";
import axios from "axios";
import districtCentrCoords from "../utils/districtCentrCoords";

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
        zoom,
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
