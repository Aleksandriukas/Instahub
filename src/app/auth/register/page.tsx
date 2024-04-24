import { View } from "react-native";
import { DismissKeyboardView, Stack } from "../../../components";
import { TextField } from "../../../components/TextField/TextField";
import { Appbar, Button, Snackbar, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { PasswordField } from "../../../components/PasswordField/PasswordField";
import { supabase } from "../../../supabase/supabase";
import { useState } from "react";

export default function RegisterPage() {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const { goBack } = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [repeatErrorMessage, setRepeatErrorMessage] = useState<string>("");

  const passwordValidator = () => {
    if (!repeatPassword) {
      return "";
    }

    if (password !== repeatPassword) {
      return "Passwords do not match";
    }
    setRepeatErrorMessage("");
    setErrorMessage("");
    return "";
  };

  const register = async () => {
    console.log(username, password);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: username,
        password: password,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (error) {
      console.log(error);
      error instanceof Error && setError(error.message);
    }
  };

  return (
    <DismissKeyboardView>
      <Stack
        style={{
          flex: 1,
        }}
        useSurfaceColor
      >
        <Appbar.Header>
          <Appbar.BackAction onPress={() => goBack()} />
          <Appbar.Content title="Registration" />
        </Appbar.Header>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flex: 1,
            padding: 16,
          }}
        >
          <TextField
            value={username}
            onChangeText={setUsername}
            label="Username"
            mode="outlined"
          />
          <PasswordField
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            label="Password"
            mode="outlined"
            validator={passwordValidator}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <PasswordField
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
            label="Repeat password"
            mode="outlined"
            validator={passwordValidator}
            errorMessage={repeatErrorMessage}
            setErrorMessage={setRepeatErrorMessage}
          />
          <Button onPress={() => register()} mode="contained">
            Register
          </Button>
        </View>
        <Snackbar
          style={{ backgroundColor: colors.inverseOnSurface }}
          visible={success}
          onDismiss={() => setSuccess(false)}
          duration={2000}
        >
          <Text>Success</Text>
        </Snackbar>
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
