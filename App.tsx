import { NavigationContainer } from '@react-navigation/native';

import RockSoulStack from './BigFinRockSoul/BigFinRockSoulRoutes/RockSoulStack';
import { ContextProvider } from './BigFinRockSoul/SoulRockStore/finContxt';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <RockSoulStack />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
