import { FlatList, View, Image, Dimensions } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import { supabase } from "../../../supabase/supabase";
import { Logo, Stack } from "../../../components";
import { useLinkTo } from "@react-navigation/native";
import { SEPARATOR_COLOR_STYLE } from "../Main";
import { PostBean } from "../../../beans/PostBean";
import { useCallback, useEffect, useState } from "react";
import background from "../../../../assets/image.png";
type PostProps = {
  value: PostBean;
};

const Post = ({ value }: PostProps) => {
  const [hasLike, setHasLike] = useState(false);

  return (
    <View>
      <Image
        resizeMode="contain"
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.6,
          backgroundColor: "#ffffff09",
        }}
        // blurRadius={110}
        source={{
          uri: value.photoUrl,
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <IconButton
          style={{ marginHorizontal: 0 }}
          icon={hasLike ? "heart" : "heart-outline"}
          iconColor={hasLike ? "red" : undefined}
          onPress={() => {
            setHasLike((old) => !old);
          }}
        />
        <IconButton style={{ marginHorizontal: 0 }} icon="chat-outline" />
      </View>
      <Text>{value.description}</Text>
    </View>
  );
};

export function PostsPage() {
  const linkTo = useLinkTo();

  const [posts, setPosts] = useState<PostBean[]>([]);

  const createPost = async () => {
    try {
      let { data, error } = await supabase.schema("public").rpc("create_post");

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = useCallback(async () => {
    try {
      let { data, error } = await supabase.from("Post").select("*");

      console.log(data);
      setPosts(data as PostBean[]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Stack style={{ flex: 1 }} useSurfaceColor>
      <Appbar.Header
        style={{
          justifyContent: "center",
          ...SEPARATOR_COLOR_STYLE("bottom"),
        }}
      >
        <Logo size="sm"></Logo>
      </Appbar.Header>
      <FlatList data={posts} renderItem={({ item }) => <Post value={item} />} />
    </Stack>
  );
}
