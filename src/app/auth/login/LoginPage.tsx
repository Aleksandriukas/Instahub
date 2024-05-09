import { TouchableOpacity, View } from "react-native";
import { DismissKeyboardView, Logo, Stack } from "../../../components";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { TextField } from "../../../components/TextField/TextField";
import { PasswordField } from "../../../components/PasswordField/PasswordField";
import { supabase } from "../../../supabase/supabase";
import { useState } from "react";
import { useLinkTo } from "@react-navigation/native";
import { useSafeContext } from "@sirse-dev/safe-context";
import { RootContext } from "../../RootContext";

export function LoginPage() {
  const { colors } = useTheme();

  const { setEmail: setRootEmail } = useSafeContext(RootContext);

  const linkTo = useLinkTo();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string>("");

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
      setRootEmail(email);
      linkTo("/main/home");
    } catch (error) {
      console.log(error);
      error instanceof Error && setError(error.message);
    }
  };

  return (
    <DismissKeyboardView>
      <Stack
        useSafeArea
        style={{
          flex: 1,
        }}
        useSurfaceColor
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flex: 1,
            padding: 16,
          }}
        >
          <View
            style={{
              width: "100%",
              paddingVertical: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </View>
          <TextField
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            label="Username"
            mode="outlined"
          />
          <PasswordField
            value={password}
            onChangeText={setPassword}
            label="Password"
            mode="outlined"
          />
          <Button
            style={{ zIndex: 10000 }}
            onPress={() => {
              login();
            }}
            mode="contained"
          >
            Sign in
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            paddingBottom: 8,
          }}
        >
          <Text>Do not have an account?</Text>
          <TouchableOpacity
            onPress={() => linkTo("/auth/register")}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.primary }}>Register!</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          style={{ backgroundColor: colors.inverseOnSurface }}
          visible={Boolean(error)}
          onDismiss={() => setError("")}
          duration={2000}
        >
          <Text>{error}</Text>
        </Snackbar>
      </Stack>
    </DismissKeyboardView>
  );
}
