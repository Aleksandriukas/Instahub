import { TouchableOpacity, View } from "react-native";
import { DismissKeyboardView, Logo, Stack } from "../../../components";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { TextField } from "../../../components/TextField/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLinkTo } from "../../../../charon";
import { PasswordField } from "../../../components/PasswordField/PasswordField";

export default function LoginPage() {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const linkTo = useLinkTo();

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
          <TextField label="Username" mode="outlined" />
          <PasswordField label="Password" mode="outlined" />
          <Button mode="contained">Sign in</Button>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 2 }}
        >
          <Text>Do not have an account?</Text>
          <TouchableOpacity
            onPress={() => linkTo("/register")}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.primary }}>Register!</Text>
          </TouchableOpacity>
        </View>
      </Stack>
    </DismissKeyboardView>
  );
}
