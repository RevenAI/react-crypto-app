import { createContext } from "react";
import PropTypes from "prop-types";

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  return (
    <DashboardContext.Provider value={{
        
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default DashboardContext;
