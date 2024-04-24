import { PropsWithChildren, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primaryContainer: '#e7b477',
        primary: '#d58900',
        onPrimary: '#000',
        onSurface: '#fff',
        surface: '#000',
        background: '#000',
        secondaryContainer: '#e7b477',
    },
};

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    const { colors } = useTheme();
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}>{children}</View>
            </SafeAreaProvider>
        </PaperProvider>
    );
}
