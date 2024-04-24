import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { supabase } from "../../../supabase/supabase";
import { useLinkTo } from "../../../../charon";

export default function MainPage() {
  const linkTo = useLinkTo();
  const logout = async () => {
    await supabase.auth.signOut();
    linkTo("/auth/login");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#add",
      }}
    >
      <Text>Page</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}
