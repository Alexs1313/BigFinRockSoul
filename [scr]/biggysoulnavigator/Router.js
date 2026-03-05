import { createStackNavigator } from '@react-navigation/stack';
import { BigFinCriticTestScreen } from '../biggysoulscrrns/BigFinCriticTestScreen';
import { BigFinTapGame } from '../biggysoulscrrns/BigFinTapGame';

import BigFinLoaderScreen from '../biggysoulscrrns/BigFinLoaderScreen';
import BigFinHomeScreen from '../biggysoulscrrns/BigFinHomeScreen';
import BigFinPartyZoneScreen from '../biggysoulscrrns/BigFinPartyZoneScreen';
import BigFinCriticLevelsScreen from '../biggysoulscrrns/BigFinCriticLevelsScreen';
import BigFinStoriesScreen from '../biggysoulscrrns/BigFinStoriesScreen';
import IntroduceScreen from '../biggysoulscrrns/IntroduceScreen';
import BigFinMoodBubblesScreen from '../biggysoulscrrns/BigFinMoodBubblesScreen';

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

      <Stack.Screen
        name="BigFinMoodBubblesScreen"
        component={BigFinMoodBubblesScreen}
      />
    </Stack.Navigator>
  );
};

export default Router;
