import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLinkTo } from "@react-navigation/native";

import { LoginPage } from "./login/LoginPage";
import { RegisterPage } from "./register/RegisterPage";
import { useCallback, useLayoutEffect } from "react";
import { useSafeContext } from "@sirse-dev/safe-context";
import { RootContext } from "../RootContext";
import { supabase } from "../../supabase/supabase";
const Stack = createNativeStackNavigator();

export const Auth = () => {
  const { setEmail } = useSafeContext(RootContext);

  const linkTo = useLinkTo();

  const checkSession = useCallback(async () => {
    try {
      const jwt = (await supabase.auth.getSession()).data.session;

      if (!jwt) {
        return;
      }

      const email = jwt.user.user_metadata.email;

      console.log(email);

      if (Boolean(email)) {
        setEmail(email);
        linkTo("/main/posts");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    checkSession();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="register" component={RegisterPage} />
    </Stack.Navigator>
  );
};
