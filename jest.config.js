module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    collectCoverageFrom: ['**/*.(t|j)s'],
    coveragePathIgnorePatterns: ['node_modules', '/__tests__/'],
    coverageDirectory: '<rootDir>/../coverage',
    transform: {
        '.+\\.(t|j)s$': '@swc/jest', // '.+\\.(t|j)s$': 'ts-jest',
    },
    setupFiles: ['dotenv/config'],
};
