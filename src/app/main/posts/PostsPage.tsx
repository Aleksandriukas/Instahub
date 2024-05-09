import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { supabase } from "../../../supabase/supabase";
import { Logo, Post, Stack } from "../../../components";
import { SEPARATOR_COLOR_STYLE } from "../Main";
import { PostBean } from "../../../beans/PostBean";
import { useCallback, useEffect, useState } from "react";

export function PostsPage() {
  const [posts, setPosts] = useState<PostBean[]>([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      let { data, error } = await supabase.from("Post").select("*");

      setPosts(data?.reverse() as PostBean[]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadData().finally(() => setIsRefreshing(false));
  };

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
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
        data={posts}
        renderItem={({ item }) => <Post value={item} />}
      />
    </Stack>
  );
}
