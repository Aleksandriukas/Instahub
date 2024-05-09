import {
  Appbar,
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Stack } from "../../../../components";
import { SEPARATOR_COLOR_STYLE } from "../../Main";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Keyboard,
  LayoutAnimation,
  Platform,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import {
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";
import { useState } from "react";
import { supabase } from "../../../../supabase/supabase";
import { decode } from "base64-arraybuffer";
import RNFetchBlob from "rn-fetch-blob";
import { useSafeContext } from "@sirse-dev/safe-context";
import { RootContext } from "../../../RootContext";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const NewPost = () => {
  const { goBack } = useNavigation();

  const { colors } = useTheme();

  const { email } = useSafeContext(RootContext);
  const [response, setResponse] = useState<ImagePickerResponse | undefined>();

  const [visible, setVisible] = useState(false);

  const [description, setDescription] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const onDismissSnackBar = () => {
    setVisible(false);
    goBack();
  };

  const onCreate = async () => {
    setLoading(true);
    if (!response?.assets || !response.assets[0].uri) {
      return;
    }

    try {
      const base64 = await RNFetchBlob.fs.readFile(
        Platform.OS === "android"
          ? response.assets[0].uri
          : response.assets[0].uri.replace("file://", ""),
        "base64"
      );

      const fileName =
        new Date().getMilliseconds() + response.assets[0].fileName!;

      const { error } = await supabase.storage
        .from("photos")
        .upload(fileName, decode(base64), {
          contentType: response.assets[0].type,
        });

      if (error) {
        throw error;
      }

      const { error: insertError } = await supabase.from("Post").insert([
        {
          photoUrl: `https://jnfdzehjqzaahtmrpvgb.supabase.co/storage/v1/object/public/photos/${fileName}`,
          userEmail: email,
          description: description,
        },
      ]);

      if (insertError) {
        throw insertError;
      }
      setLoading(false);
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Stack style={{ flex: 1 }} useSurfaceColor>
        <Appbar.Header
          mode="small"
          style={{
            justifyContent: "center",
            ...SEPARATOR_COLOR_STYLE("bottom"),
          }}
        >
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="New post" />
        </Appbar.Header>
        <View style={{ marginHorizontal: 12, flex: 1, gap: 4 }}>
          {response?.assets && response.assets[0].uri && (
            <Image
              style={{ height: "50%", width: "100%", borderRadius: 8 }}
              source={{ uri: response.assets[0].uri }}
            />
          )}
          <TextInput
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={{ minHeight: 100 }}
            multiline
            placeholder="Description"
          />
          <Button
            onPress={() => {
              launchImageLibrary({ mediaType: "photo" }, (value) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setResponse(value);
              });
            }}
          >
            Add photo
          </Button>

          <View
            style={{
              flex: 1,
              alignSelf: "flex-end",
              flexDirection: "row",
            }}
          >
            <Button
              loading={loading}
              disabled={!response?.assets || !response.assets[0].uri}
              mode="contained"
              style={{ alignSelf: "flex-end", marginBottom: 12 }}
              onPress={onCreate}
            >
              Create post
            </Button>
          </View>
        </View>

        <Snackbar
          style={{ backgroundColor: "#1d1d1d" }}
          visible={visible}
          duration={1000}
          onDismiss={onDismissSnackBar}
        >
          <Text>Success</Text>
        </Snackbar>
      </Stack>
    </TouchableWithoutFeedback>
  );
};
