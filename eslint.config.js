import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        ignores: [
            'dist',
            'build',
            'node_modules',
            'pnpm-lock.yaml',
            'package-lock.json',
            'prisma/generated',
            '.env',
            '.env.*',
            'apps/frontend/app-env.d.ts',
            'apps/frontend/components/ui/**/*',
        ],
    },
]);
