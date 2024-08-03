import React, { useState, useEffect } from "react";
import WorldMap from "../components/WorldMap";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryData, fetchWorldData } from "../redux/apiCall";
import { MapContainer, TileLayer } from "react-leaflet";

const Maps = () => {
  const [countriesData, setCountriesData] = useState([]);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["fetchCountryData"],
    queryFn: fetchCountryData,
  });
  const worldData = useQuery({
    queryKey: ["fetchWorldData"],
    queryFn: fetchWorldData,
  });

  console.log("fetchWorldData", worldData);

  useEffect(() => {
    if (data) {
      setCountriesData(data);
    }
  }, [data]);

  return (
    <>
      <div className="bg-white p-4 rounded-[20px] w-[90%] my-4 mx-auto h-auto">
        <h1 className="text-[30px] font-bold mb-4 text-[#3B82F6]">
          Corona Cases World Map
        </h1>
        <div className="flex flex-col my-3 ">
          <p className="text-[18px] font-bold">
            Total Cases: {worldData.data.cases}
          </p>
          <p className="text-[18px] font-bold">
            Total Active Cases: {worldData.data.active}
          </p>
          <p className="text-[18px] font-bold">
            Total Recovered: {worldData.data.recovered}
          </p>
        </div>
        <div className="border-2 border-blue-500 w-11/12 m-auto p-5">
          <MapContainer
            className="m-auto w-full h-96 border-blue-700"
            bounds={[
              [-60, -180],
              [85, 180],
            ]}
            zoom={2}
            center={[20, 40]}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            <WorldMap countriesData={countriesData} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Maps;
