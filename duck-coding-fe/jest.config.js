// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts|js)'],
    setupFilesAfterEnv: ['<rootDir>/src/test.ts', 'jest-extended'],
    collectCoverage: true,
    coverageReporters: ['html', 'lcov'],
    coverageDirectory: 'coverage/hedone',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: '<rootDir>/',
    }),
};
