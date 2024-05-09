import {
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { MD3DarkTheme as DefaultTheme } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLinkTo } from "@react-navigation/native";

import { Auth } from "./auth/Auth";
import { Main } from "./main/Main";
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "../supabase/supabase";
import { RootContext } from "./RootContext";
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryContainer: "#ffb149",
    primary: "#d58900",
    onPrimary: "#000",
    onSurface: "#fff",
    onSurfaceVariant: "#fff",
    surface: "#000",
    background: "#000",
    secondaryContainer: "#ec9f30",
  },
} as ThemeProp;

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  const { colors } = useTheme();

  const [email, setEmail] = useState<string>("");

  return (
    <RootContext.Provider value={{ email, setEmail }}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.surface },
              ]}
            >
              <Stack.Navigator
                initialRouteName={"auth"}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="auth" component={Auth} />
                <Stack.Screen name="main" component={Main} />
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </PaperProvider>
      </NavigationContainer>
    </RootContext.Provider>
  );
}
