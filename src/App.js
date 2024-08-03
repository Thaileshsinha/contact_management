// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Routes, Route } from "react-router-dom";
// import Contact from "./pages/Contact";
// import MapGraph from "./pages/MapGraph";

// const App = () => {
//   return (
//     <div className="bg-[#F6F7F8] w-[full] relative h-[full] ">
//       <Navbar />
//       <div className="flex justify-between">
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={<Contact />} />
//           <Route path="/maps" element={<MapGraph />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Contact from "./pages/Contact";
import MapGraph from "./pages/MapGraph";
import Maps from "./pages/Maps";

const App = () => {
  return (
    <div className="bg-[#F6F7F8] w-full min-h-screen relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4  pt-[80px] md:ml-[220px] ">
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/map" element={<Maps />} />
            <Route path="/graph" element={<MapGraph />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
