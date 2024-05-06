import { FlatList, View, Image, Dimensions } from "react-native";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import { supabase } from "../../../supabase/supabase";
import { Logo, Post, Stack } from "../../../components";
import { useLinkTo } from "@react-navigation/native";
import { SEPARATOR_COLOR_STYLE } from "../Main";
import { PostBean } from "../../../beans/PostBean";
import { useCallback, useEffect, useState } from "react";

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
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        data={posts}
        renderItem={({ item }) => <Post value={item} />}
      />
    </Stack>
  );
}
