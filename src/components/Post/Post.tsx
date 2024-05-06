import { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { PostBean } from "../../beans/PostBean";
import { supabase } from "../../supabase/supabase";
import { useSafeContext } from "@sirse-dev/safe-context";
import { RootContext } from "../../app/RootContext";

type PostProps = {
  value: PostBean;
};

export const Post = ({ value }: PostProps) => {
  const [hasLike, setHasLike] = useState(false);

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
        <IconButton style={{ marginHorizontal: 0 }} icon="chat-outline" />
      </View>
      <View style={{ paddingHorizontal: 6 }}>
        <Text style={{ fontWeight: "bold" }}>{`Likes: ${likesQnt} `}</Text>
        <Text>{value.description}</Text>
      </View>
    </View>
  );
};
