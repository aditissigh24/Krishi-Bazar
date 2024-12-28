import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtpScreen from '../OtpScreen';
import RootTabs from './RootTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="otpScreen" component={OtpScreen} />
      <Stack.Screen
        name="RootTabs"
        component={RootTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
