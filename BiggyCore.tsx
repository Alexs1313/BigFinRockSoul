import { NavigationContainer } from '@react-navigation/native';

import { SettingsCpntext } from './[scr]/biggysoulstrg/bigFinCntxt';
import Router from './[scr]/biggysoulnavigator/Router';

const BiggyCore = () => {
  return (
    <NavigationContainer>
      <SettingsCpntext>
        <Router />
      </SettingsCpntext>
    </NavigationContainer>
  );
};

export default BiggyCore;
