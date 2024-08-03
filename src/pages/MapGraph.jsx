import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { fetchGraphData } from "../redux/apiCall";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MapGraph = () => {
  const [chartData, setChartData] = useState({});

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["fetchGraphData"],
    queryFn: fetchGraphData,
  });

  useEffect(() => {
    if (data && data.cases) {
      const newChartData = {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: "Cases",
            data: Object.values(data.cases),
            fill: false,
            borderColor: "#3B82F6",
            tension: 0.2,
          },
        ],
      };
      setChartData(newChartData);
    }
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-[20px] w-[90%] my-4 mx-auto h-auto">
      <h1 className="text-[30px] font-bold mb-4 text-[#3B82F6]">
        Corona Cases Chart
      </h1>
      <div className="border-2 border-[#3B82F6] w-11/12 m-auto">
        {isLoading ? (
          <h1 className="text-[#3B82F6] mb-4 font-bold text-2xl">Loading...</h1>
        ) : isError ? (
          <h1 className="text-red-600 mb-4 font-bold text-2xl">
            Error: {error.message}
          </h1>
        ) : chartData.datasets ? (
          <Line data={chartData} />
        ) : (
          <h1 className="text-[#3B82F6] mb-4 font-bold text-2xl">
            No data available
          </h1>
        )}
      </div>
    </div>
  );
};

export default MapGraph;
