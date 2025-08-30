import { Tabs } from 'expo-router';
import { Heart, Home, Search, User } from 'lucide-react-native';

const colors = {
    slate: {
        800: '#1e293b',
        900: '#0f172a',
    },
    violet: {
        500: '#8b5cf6',
    },
    gray: {
        400: '#9ca3af',
    },
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.slate[900],
                    borderTopColor: colors.slate[800],
                    borderTopWidth: 0.5,
                    height: 85,
                    paddingBottom: 25,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.violet[500],
                tabBarInactiveTintColor: colors.gray[400],
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Buscar',
                    tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="likes"
                options={{
                    title: 'Mi Lista',
                    tabBarIcon: ({ size, color }) => <Heart size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Más',
                    tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
