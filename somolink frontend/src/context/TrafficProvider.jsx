import React, { createContext, useContext, useState,  } from "react";

const TrafficContext = createContext();

export const TrafficProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const[uplinkData,setUplinkData]=useState([]);
  const[downlinkData,setDownlinkData]=useState([]);

  return (
    <TrafficContext.Provider value={{ data, setData,uplinkData,setUplinkData,downlinkData,setDownlinkData }}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => useContext(TrafficContext);
