import axios from "axios";

//fetch latest data
export const fetchWorldData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/all");
  return data;
};

// fetch graph data
export const fetchGraphData = async () => {
  const { data } = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return data;
};

// fetch map data
export const fetchCountryData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  console.log(data);
  return data;
};
