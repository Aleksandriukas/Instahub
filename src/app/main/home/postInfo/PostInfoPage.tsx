import { ScrollView, Text } from "react-native";
import { Post, Stack } from "../../../../components";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeContext } from "@sirse-dev/safe-context";
import { HomeContext } from "../HomeContext";
import { SEPARATOR_COLOR_STYLE } from "../../../main/Main";
export const PostInfoPage = () => {
  const { goBack } = useNavigation();

  const { selectedPost } = useSafeContext(HomeContext);

  return (
    <Stack style={{ flex: 1 }} useSurfaceColor>
      <Appbar.Header style={{ ...SEPARATOR_COLOR_STYLE("bottom") }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Your post" />
      </Appbar.Header>

      <ScrollView>
        <Post value={selectedPost!} />
      </ScrollView>
    </Stack>
  );
};
