import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import { Stack } from "../../../components";
import { SEPARATOR_COLOR_STYLE } from "../Main";
import { supabase } from "../../../supabase/supabase";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { PostBean } from "../../../beans/PostBean";
import { HomeContext } from "./HomeContext";
import { useSafeContext } from "@sirse-dev/safe-context";
import { useLinkTo } from "@react-navigation/native";
import { RootContext } from "../../RootContext";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const HomePage = () => {
  const { email } = useSafeContext(RootContext);
  const [posts, setPosts] = useState<PostBean[]>([]);
  const linkTo = useLinkTo();

  const onDelete = useCallback(async (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setPosts((old) => old.filter((post) => post.id !== id));

    try {
      const { error } = await supabase.from("Post").delete().eq("id", id);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchAllUserPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("userEmail", email);

      if (error) {
        throw error;
      }

      setPosts(data.reverse() ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAllUserPosts().finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    fetchAllUserPosts();
  }, []);

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
        <Appbar.Action
          onPress={() => {
            linkTo("/newPost");
          }}
          icon="plus"
        />
      </Appbar.Header>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MinifiedPost onDelete={onDelete} value={item} />
        )}
      />
    </Stack>
  );
};

type PostProps = {
  value: PostBean;
  onDelete: (id: number) => void;
};

const WIDTH = Dimensions.get("window").width * 0.333;
const HEIGHT = WIDTH * 1.2;

const MinifiedPost = ({ value, onDelete }: PostProps) => {
  const { setSelectedPost } = useSafeContext(HomeContext);
  const linkTo = useLinkTo();

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <View style={{ height: HEIGHT, width: WIDTH }}>
      <TouchableOpacity
        onLongPress={() => setVisible(true)}
        onPress={() => {
          setSelectedPost(value);
          linkTo("/PostInfo");
        }}
        style={{ alignContent: "center", justifyContent: "center" }}
        activeOpacity={0.7}
      >
        {loading && (
          <View
            style={{
              height: HEIGHT,
              width: WIDTH,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        )}
        <Image
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          height={HEIGHT}
          width={WIDTH}
          source={{ uri: value.photoUrl }}
        />
      </TouchableOpacity>
      <Portal>
        <Dialog
          style={{ backgroundColor: "#000" }}
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <Dialog.Title>Delete post</Dialog.Title>
          <Dialog.Content>
            <Text>Are you that you want to delete your post?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                onDelete(value.id);
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
