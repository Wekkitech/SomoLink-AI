import React, { createContext, useContext, useState } from "react";

const SchoolContext = createContext(null);

export const SchoolProvider = ({ children }) => {
  const [school, setSchool] = useState(null)

  return (
    <SchoolContext.Provider value={{ school, setSchool }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => useContext(SchoolContext);
