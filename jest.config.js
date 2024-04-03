module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleNameMapper: {
        '/src/(.*)': '<rootDir>/src/$1',
    },
};
