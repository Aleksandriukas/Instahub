import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from "react-native";
import { IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { PostBean } from "../../beans/PostBean";
import { supabase } from "../../supabase/supabase";
import { useSafeContext } from "@sirse-dev/safe-context";
import { RootContext } from "../../app/RootContext";
import { CommentBean } from "../../beans/CommentBean";
import { SEPARATOR_COLOR_STYLE } from "../../app/main/Main";

type PostProps = {
  value: PostBean;
};

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const Post = ({ value }: PostProps) => {
  const [hasLike, setHasLike] = useState(false);

  const [visible, setVisible] = useState(false);

  const [likesQnt, setLikesQnt] = useState<number>(0);

  const { email } = useSafeContext(RootContext);

  const onLike = async () => {
    if (hasLike) {
      setHasLike(false);
      setLikesQnt((old) => old - 1);
      try {
        let { error } = await supabase
          .from("Like")
          .delete()
          .eq("postId", value.id)
          .eq("userEmail", email);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      let { error } = await supabase.from("Like").insert([
        {
          postId: value.id,
          userEmail: email,
        },
      ]);

      if (error) {
        throw error;
      }

      setHasLike(true);
      setLikesQnt((old) => old + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLikes = async () => {
    try {
      let { data, error } = await supabase
        .from("Like")
        .select("*")
        .eq("postId", value.id);

      if (error) {
        throw error;
      }

      setLikesQnt(data?.length ?? 0);

      if (data?.find((like) => like.userEmail === email)) {
        setHasLike(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLikes();
  }, []);

  return (
    <View>
      <Image
        resizeMode="contain"
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.6,
          backgroundColor: "#ffffff09",
        }}
        source={{
          uri: value.photoUrl,
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <IconButton
          style={{ marginHorizontal: 0 }}
          icon={hasLike ? "heart" : "heart-outline"}
          iconColor={hasLike ? "red" : undefined}
          onPress={onLike}
        />
        <IconButton
          onPress={() => {
            setVisible(true);
          }}
          style={{ marginHorizontal: 0 }}
          icon="chat-outline"
        />
      </View>
      <View style={{ paddingHorizontal: 6 }}>
        <Text style={{ fontWeight: "bold" }}>{`Likes: ${likesQnt} `}</Text>
        <Text>{value.description}</Text>
      </View>
      <CommentsModal
        email={email}
        value={value}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
      />
    </View>
  );
};

type CommentsModalProps = {
  visible: boolean;
  onDismiss: () => void;
  value: PostBean;
  email: string;
};
const CommentsModal = ({
  onDismiss,
  visible,
  value,
  email,
}: CommentsModalProps) => {
  const [comments, setComments] = useState<CommentBean[]>([]);

  const [message, setMessage] = useState("");

  const loadComments = async () => {
    try {
      let { data, error } = await supabase
        .from("Comment")
        .select("*")
        .eq("postId", value.id);

      setComments(data as CommentBean[]);

      if (error) {
        throw error;
      }

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async () => {
    try {
      let { error } = await supabase.from("Comment").insert([
        {
          postId: value.id,
          userEmail: email,
          message,
        },
      ]);

      if (error) {
        throw error;
      }

      setMessage("");
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setComments((old) => [
        ...old,
        {
          id: Math.random(),
          created_at: new Date(),
          postId: value.id,
          userEmail: email,
          message,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadComments().finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 12,
          width: "90%",
          height: "80%",
          alignSelf: "center",
        }}
      >
        <View
          style={{ paddingVertical: 8, ...SEPARATOR_COLOR_STYLE("bottom") }}
        >
          <Text style={{ textAlign: "center" }} variant="titleLarge">
            Comments
          </Text>
        </View>
        <FlatList
          snapToEnd
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={() => (
            <Text style={{ color: "#ffffffa0" }}>No comments</Text>
          )}
          contentContainerStyle={{
            flex: 1,
          }}
          style={{
            flex: 1,
            width: "100%",
          }}
          data={comments}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 4 }}>
              <Text style={{ fontWeight: "bold" }}>{item.userEmail}:</Text>
              <Text>{item.message}</Text>
            </View>
          )}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ flex: 1 }}
            value={message}
            onChangeText={setMessage}
            label="Comment"
            mode="outlined"
          />
          <IconButton
            disabled={!message}
            style={{ alignSelf: "center" }}
            icon="send"
            onPress={sendComment}
          />
        </View>
      </Modal>
    </Portal>
  );
};
