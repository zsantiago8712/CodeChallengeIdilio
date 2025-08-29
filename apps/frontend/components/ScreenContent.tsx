import { Box, Text } from '@/components/ui';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
    title: string;
    path: string;
    children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
    return (
        <Box className="flex-1 items-center justify-center">
            <Text className="text-xl font-bold">{title}</Text>
            <Box className="my-7 h-[1px] w-4/5 bg-gray-200" />
            <EditScreenInfo path={path} />
            {children}
        </Box>
    );
};
