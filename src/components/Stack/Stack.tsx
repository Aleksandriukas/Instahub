import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

export const Stack = ({ usePrimaryColor = false, style, ...props }: ViewProps & { usePrimaryColor?: boolean }) => {
    const { colors } = useTheme();

    return <View {...props} style={[{ backgroundColor: usePrimaryColor ? colors.primary : '' }, style]} />;
};
