import { NavigationContainer } from '@react-navigation/native';

import { SettingsCpntext } from './[scr]/storage/bigFinCntxt';
import Router from './[scr]/navigation/Router';

const App = () => {
  return (
    <NavigationContainer>
      <SettingsCpntext>
        <Router />
      </SettingsCpntext>
    </NavigationContainer>
  );
};

export default App;
