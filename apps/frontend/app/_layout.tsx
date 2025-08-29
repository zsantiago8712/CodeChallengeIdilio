import Provider from '@/_trpc/Provider';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="dark">
            <Provider>
                <SafeAreaProvider>
                    <StatusBar style="light" />
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="detail/[id]" options={{ headerShown: false }} />
                    </Stack>
                </SafeAreaProvider>
            </Provider>
        </GluestackUIProvider>
    );
}
