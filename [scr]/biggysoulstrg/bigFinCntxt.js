import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useFinStore = () => {
  return useContext(StoreContext);
};

export const SettingsCpntext = ({ children }) => {
  const [finNotificationsEnabled, setFinNotificationsEnabled] = useState(false);
  const [finSoundEnabled, setFinSoundEnabled] = useState(false);

  const value = {
    finNotificationsEnabled,
    setFinNotificationsEnabled,
    finSoundEnabled,
    setFinSoundEnabled,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
