import { Box, Heading, Text } from '@/components/ui';
import { Download, LogOut, Settings, Star, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MenuItem {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
}

export default function ProfileScreen() {
    const menuItems: MenuItem[] = [
        { icon: Settings, title: 'Configuración', subtitle: 'Ajustes de la cuenta' },
        { icon: Star, title: 'Mis Favoritos', subtitle: 'Shows que te gustan' },
        { icon: Download, title: 'Gestionar Descargas', subtitle: 'Contenido descargado' },
        { icon: LogOut, title: 'Cerrar Sesión', subtitle: 'Salir de la aplicación' },
    ];

    const renderMenuItem = (item: MenuItem, index: number) => {
        const IconComponent = item.icon;
        return (
            <TouchableOpacity
                key={index}
                className="bg-white/3 py-4.5 mx-4 my-1 flex-row items-center rounded-2xl border border-white/5 px-4">
                <IconComponent size={24} color="#888888" />
                <Box className="ml-4 flex-1">
                    <Text className="text-base font-bold tracking-tight text-white">
                        {item.title}
                    </Text>
                    <Text className="mt-0.5 text-sm font-medium text-white/60">
                        {item.subtitle}
                    </Text>
                </Box>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <ScrollView>
                <Box className="border-b border-white/10 bg-slate-900/95 p-4">
                    <Heading className="text-2xl font-black tracking-tight text-white">
                        Perfil
                    </Heading>
                </Box>
                <Box className="items-center py-8">
                    <Box className="mb-4">
                        <Box className="border-3 h-20 w-20 items-center justify-center rounded-full border-white/20 bg-violet-500">
                            <User size={32} color="#FFFFFF" />
                        </Box>
                    </Box>
                    <Heading className="mb-1 text-xl font-black tracking-tight text-white">
                        Usuario Principal
                    </Heading>
                    <Text className="text-sm font-medium text-white/60">usuario@example.com</Text>
                </Box>

                <Box className="px-0">{menuItems.map(renderMenuItem)}</Box>

                <Box className="items-center py-8">
                    <Text className="text-xs font-medium text-white/40">StreamFlix v1.0.0</Text>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}
