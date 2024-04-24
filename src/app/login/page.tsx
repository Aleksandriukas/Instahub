import { View } from 'react-native';
import { Stack } from '../../components';
import { Text, useTheme } from 'react-native-paper';

export default function LoginPage() {
    const { colors } = useTheme();

    return (
        <Stack style={{ flex: 1 }} usePrimaryColor>
            <Text>
                <Text>Insta</Text>
                <Text style={{ backgroundColor: colors.primary, color: colors.onPrimary, borderRadius: 8 }}>hub</Text>
            </Text>
        </Stack>
    );
}
