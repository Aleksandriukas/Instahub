import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CommonActions } from "@react-navigation/native";
import { PostsPage } from "./posts/PostsPage";
import { BottomNavigation, Icon, useTheme } from "react-native-paper";
import { ViewStyle } from "react-native";
import { SettingsPage } from "./settings/SettingsPage";
import { Home } from "./home/Home";

const Tab = createBottomTabNavigator();

export const SEPARATOR_COLOR_STYLE = (variant: "top" | "bottom"): ViewStyle => {
  if (variant === "top") {
    return {
      borderTopWidth: 0.2,
      borderTopColor: "#ffffff44",
    };
  } else if (variant === "bottom") {
    return {
      borderBottomWidth: 0.2,
      borderBottomColor: "#ffffff44",
    };
  }
  return {};
};

export const Main = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          activeColor="#000"
          // activeIndicatorStyle={{ backgroundColor: colors.primary }}
          labeled={false}
          style={{
            backgroundColor: "#000",
            borderTopWidth: 0.2,
            marginBottom: 0,

            ...SEPARATOR_COLOR_STYLE("top"),
          }}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="posts"
        component={PostsPage}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon source="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon source="account" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon source="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
