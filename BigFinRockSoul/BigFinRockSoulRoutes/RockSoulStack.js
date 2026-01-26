import { createStackNavigator } from '@react-navigation/stack';
import FinIntroScreen from '../FinRockSoulViews/FinIntroScreen';
import RockHomeScreen from '../FinRockSoulViews/RockHomeScreen';
import LevelsScreen from '../FinRockSoulViews/LevelsScreen';
import { CriticTestScreen } from '../FinRockSoulViews/CriticTestScreen';
import { FinTapGameScreen } from '../FinRockSoulViews/FinTapGameScreen';
import FinStoriesScreen from '../FinRockSoulViews/FinStoriesScreen';
import PartyZoneScreen from '../FinRockSoulViews/PartyZoneScreen';
import LoaderScreen from '../FinRockSoulViews/LoaderScreen';

const Stack = createStackNavigator();

const RockSoulStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
      <Stack.Screen name="FinIntroScreen" component={FinIntroScreen} />
      <Stack.Screen name="RockHomeScreen" component={RockHomeScreen} />
      <Stack.Screen name="LevelsScreen" component={LevelsScreen} />
      <Stack.Screen name="CriticTestScreen" component={CriticTestScreen} />
      <Stack.Screen name="FinTapGameScreen" component={FinTapGameScreen} />
      <Stack.Screen name="FinStoriesScreen" component={FinStoriesScreen} />
      <Stack.Screen name="PartyZoneScreen" component={PartyZoneScreen} />
    </Stack.Navigator>
  );
};

export default RockSoulStack;
