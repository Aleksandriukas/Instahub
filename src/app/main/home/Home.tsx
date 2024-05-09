import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./HomePage";
import { PostInfoPage } from "./postInfo/PostInfoPage";
import { HomeContext } from "./HomeContext";
import { useState } from "react";
import { PostBean } from "../../../beans/PostBean";
import { NewPost } from "./newPost/NewPost";

const Stack = createNativeStackNavigator();

export const Home = () => {
  const [selectedPost, setSelectedPost] = useState<PostBean | null>(null);

  return (
    <HomeContext.Provider
      value={{ selectedPost: selectedPost, setSelectedPost }}
    >
      <Stack.Navigator
        initialRouteName="homePage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="homePage" component={HomePage} />
        <Stack.Screen name="PostInfo" component={PostInfoPage} />
        <Stack.Screen name="newPost" component={NewPost} />
      </Stack.Navigator>
    </HomeContext.Provider>
  );
};
