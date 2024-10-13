module.exports = {
    extends: [
        'standard-with-typescript',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:security/recommended-legacy',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
    rules: {
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'sibling',
                    'parent',
                    'index',
                    'object',
                    'type',
                ],
            },
        ],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
