module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/components': './components',
            '@/app': './app',
            '@/hooks': './hooks',
            '@/utils': './utils',
            '@/types': './types',
            '@/assets': './assets',
            '@/_trpc': './_trpc',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
