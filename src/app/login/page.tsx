import { View } from "react-native";
import { DismissKeyboardView, Logo, Stack } from "../../components";
import { Text, TextInput, useTheme } from "react-native-paper";
import { TextField } from "../../components/TextField/TextField";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginPage() {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

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
            position: "absolute",
            width: "100%",
            alignItems: "center",
            top: insets.top + 96,
          }}
        >
          <Logo />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            height: "100%",
            padding: 16,
          }}
        >
          <TextField label="Username" mode="outlined" />
          <TextField label="Password" mode="outlined" />
        </View>
      </Stack>
    </DismissKeyboardView>
  );
}
