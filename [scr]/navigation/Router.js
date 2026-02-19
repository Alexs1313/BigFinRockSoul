import { createStackNavigator } from '@react-navigation/stack';
import { BigFinCriticTestScreen } from '../svreens/BigFinCriticTestScreen';
import { BigFinTapGame } from '../svreens/BigFinTapGame';

import BigFinLoaderScreen from '../svreens/BigFinLoaderScreen';
import BigFinHomeScreen from '../svreens/BigFinHomeScreen';
import BigFinPartyZoneScreen from '../svreens/BigFinPartyZoneScreen';
import BigFinCriticLevelsScreen from '../svreens/BigFinCriticLevelsScreen';
import BigFinStoriesScreen from '../svreens/BigFinStoriesScreen';
import IntroduceScreen from '../svreens/IntroduceScreen';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BigFinLoaderScreen" component={BigFinLoaderScreen} />
      <Stack.Screen name="IntroduceScreen" component={IntroduceScreen} />
      <Stack.Screen name="BigFinHomeScreen" component={BigFinHomeScreen} />
      <Stack.Screen
        name="BigFinCriticLevelsScreen"
        component={BigFinCriticLevelsScreen}
      />
      <Stack.Screen
        name="BigFinCriticTestScreen"
        component={BigFinCriticTestScreen}
      />
      <Stack.Screen name="BigFinTapGame" component={BigFinTapGame} />
      <Stack.Screen
        name="BigFinStoriesScreen"
        component={BigFinStoriesScreen}
      />
      <Stack.Screen
        name="BigFinPartyZoneScreen"
        component={BigFinPartyZoneScreen}
      />
    </Stack.Navigator>
  );
};

export default Router;
