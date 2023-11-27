import type { Config } from 'jest';
import baseConfig from '../../jest.config';

const config: Config = {
  ...baseConfig,
  displayName: 'demo',
  roots: ['<rootDir>'],
  coverageDirectory: '<rootDir>/../../coverage/demo',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
};

export default config;
