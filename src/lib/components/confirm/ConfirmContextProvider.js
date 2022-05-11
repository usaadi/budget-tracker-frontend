import React, { createContext, useState } from "react";

export const ConfirmContext = createContext();

const ConfirmContextProvider = ({ children }) => {
  const [confirm, setConfirm] = useState({
    title: "",
    message: "",
    yesText: "",
    noText: "",
    isOpen: false,
    proceed: null,
    cancel: null,
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContextProvider;
