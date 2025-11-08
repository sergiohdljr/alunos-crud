import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: [
    '**/tests/**/*.test.ts', 
    '**/__tests__/**/*.test.ts',
    '**/*.unit.test.ts',
    '**/*.integration.test.ts'
  ],
  clearMocks: true,
  coverageDirectory: 'coverage',
};

export default config;
