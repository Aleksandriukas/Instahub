import { Appbar, Button, Text } from "react-native-paper";
import { Stack } from "../../../components";
import { SEPARATOR_COLOR_STYLE } from "../Main";
import { View } from "react-native";
import { supabase } from "../../../supabase/supabase";
import { useLinkTo } from "@react-navigation/native";

export const SettingsPage = () => {
  const linkTo = useLinkTo();

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      linkTo("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack style={{ flex: 1 }} useSurfaceColor>
      <Appbar.Header
        style={{
          justifyContent: "center",
          ...SEPARATOR_COLOR_STYLE("bottom"),
        }}
      >
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button onPress={signOut} style={{ alignSelf: "center", margin: 24 }}>
          Sign out
        </Button>
      </View>
    </Stack>
  );
};
