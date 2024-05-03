import { View, ViewProps } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { match } from "ts-pattern";

export type LogoProps = { size?: "sm" | "md" | "lg" } & ViewProps;

export const Logo = ({ size = "md", ...other }: LogoProps) => {
  const { colors } = useTheme();

  return (
    <View {...other} style={{ flexDirection: "row" }}>
      <Text
        variant={match(size)
          .with("sm", () => "titleLarge")
          .with("md", () => "displaySmall")
          .with("lg", () => "displayMedium")
          .otherwise(() => "displayMedium")}
      >
        Insta
      </Text>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 4,
          padding: size === "sm" ? 1 : 2,
          alignContent: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Text
          variant={match(size)
            .with("sm", () => "titleLarge")
            .with("md", () => "displaySmall")
            .with("lg", () => "displayMedium")
            .otherwise(() => "displayMedium")}
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
