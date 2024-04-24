import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const Stack = ({
  useSurfaceColor = false,
  useSafeArea = false,
  style,
  ...props
}: ViewProps & { useSurfaceColor?: boolean; useSafeArea?: boolean }) => {
  const { colors } = useTheme();

  if (useSafeArea) {
    return (
      <SafeAreaView
        {...props}
        style={[
          { backgroundColor: useSurfaceColor ? colors.surface : "" },
          style,
        ]}
      />
    );
  }

  return (
    <View
      {...props}
      style={[
        { backgroundColor: useSurfaceColor ? colors.surface : "" },
        style,
      ]}
    />
  );
};
