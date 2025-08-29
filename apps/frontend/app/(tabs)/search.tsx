import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function SearchScreen() {
    return (
        <Box className="flex-1 items-center justify-center bg-slate-900">
            <Text className="mb-2 text-3xl font-bold text-white">Buscar Shows</Text>
            <Text className="mb-8 text-base text-slate-400">
                Encuentra tu serie o película favorita
            </Text>

            <Button className="mb-4 bg-violet-600 hover:bg-violet-700">
                <ButtonText className="font-semibold text-white">Buscar Contenido</ButtonText>
            </Button>

            <Button variant="outline" className="border-violet-500 hover:bg-violet-50">
                <ButtonText className="text-violet-400">Explorar Categorías</ButtonText>
            </Button>
        </Box>
    );
}
