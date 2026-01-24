import { createStackNavigator } from '@react-navigation/stack';
import FinIntroScreen from '../FinRockSoulViews/FinIntroScreen';
import RockHomeScreen from '../FinRockSoulViews/RockHomeScreen';

const Stack = createStackNavigator();

const RockSoulStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FinIntroScreen" component={FinIntroScreen} />
      <Stack.Screen name="RockHomeScreen" component={RockHomeScreen} />
    </Stack.Navigator>
  );
};

export default RockSoulStack;
