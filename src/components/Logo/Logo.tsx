import { View, ViewProps } from "react-native";
import { Text, useTheme } from "react-native-paper";

export type LogoProps = {} & ViewProps;

export const Logo = (props: LogoProps) => {
  const { colors } = useTheme();

  return (
    <View {...props} style={{ flexDirection: "row" }}>
      <Text variant="displayMedium">Insta</Text>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 4,
          padding: 2,
          alignContent: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Text
          variant="displayMedium"
          style={{
            backgroundColor: colors.primary,
            color: colors.onPrimary,
          }}
        >
          hub
        </Text>
      </View>
    </View>
  );
};
