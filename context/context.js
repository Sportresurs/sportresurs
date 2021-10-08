import { createContext, useState, useEffect } from "react";
import axios from "axios";

const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);
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
      url: `${process.env.NEXT_PUBLIC_API_URL}/areas/filter-fields`,
    }).then(({ data }) => setFilterFields(data));
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/areas`,
    }).then(({ data }) => setAreas(data.areas));
  }, []);

  const handleCoordinates = (value) => {
    setCoordinates(value);
  };
  const handleFilterDistrict = (e) => {
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
        coordinates,
        filterData,
        filterFields,
        areas,
        setAreas,
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
