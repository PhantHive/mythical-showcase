module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // New feature
                'fix', // Bug fix
                'docs', // Documentation
                'style', // Styling
                'refactor', // Code refactoring
                'perf', // Performance improvements
                'test', // Testing
                'chore', // Maintenance
                'ci', // CI/CD
                'revert', // Revert changes
            ],
        ],
        'type-case': [2, 'always', 'lower-case'],
        'subject-case': [2, 'always', 'sentence-case'],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'],
    },
};
