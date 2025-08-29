module.exports = {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: true,
    bracketSameLine: true,
    trailingComma: 'es5',
    useTabs: false,
    semi: true,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',

    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    tailwindAttributes: ['className'],
};
