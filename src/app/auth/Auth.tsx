import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./login/LoginPage";
import { RegisterPage } from "./register/RegisterPage";
const Stack = createNativeStackNavigator();

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="register" component={RegisterPage} />
    </Stack.Navigator>
  );
};
