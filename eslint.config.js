// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
        },
        rules: {
            // Add TypeScript specific rules here
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            react,
        },
        rules: {
            // Add JavaScript/React specific rules here
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            js,
        },
        rules: {
            // Add common rules here
        },
    },
];
