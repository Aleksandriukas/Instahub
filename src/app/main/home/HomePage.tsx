import { Appbar } from "react-native-paper";
import { Stack } from "../../../components";
import { SEPARATOR_COLOR_STYLE } from "../Main";
import { supabase } from "../../../supabase/supabase";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { PostBean } from "../../../beans/PostBean";
import { HomeContext } from "./HomeContext";
import { useSafeContext } from "@sirse-dev/safe-context";
import { useLinkTo } from "@react-navigation/native";
import { RootContext } from "../../RootContext";

export const HomePage = () => {
  const { email } = useSafeContext(RootContext);
  const [posts, setPosts] = useState<PostBean[]>([]);

  const fetchAllUserPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("userEmail", email);

      if (error) {
        throw error;
      }

      console.log(data.length);
      setPosts(data ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUserPosts();
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <Stack style={{ flex: 1 }} useSurfaceColor>
      <Appbar.Header
        mode="small"
        style={{
          justifyContent: "center",
          ...SEPARATOR_COLOR_STYLE("bottom"),
        }}
      >
        <Appbar.Content title={email} />
      </Appbar.Header>
      <FlatList
        numColumns={3}
        refreshing={isRefreshing}
        onRefresh={fetchAllUserPosts}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MinifiedPost value={item} />}
      />
    </Stack>
  );
};

type PostProps = {
  value: PostBean;
};

const WIDTH = Dimensions.get("window").width * 0.333;
const HEIGHT = WIDTH * 1.2;

const MinifiedPost = ({ value }: PostProps) => {
  const { setSelectedPost } = useSafeContext(HomeContext);
  const linkTo = useLinkTo();

  return (
    <View style={{ height: HEIGHT, width: WIDTH }}>
      <TouchableOpacity
        onPress={() => {
          console.log("Selected post");
          setSelectedPost(value);
          linkTo("/PostInfo");
        }}
        activeOpacity={0.7}
      >
        <Image height={HEIGHT} width={WIDTH} source={{ uri: value.photoUrl }} />
      </TouchableOpacity>
    </View>
  );
};
