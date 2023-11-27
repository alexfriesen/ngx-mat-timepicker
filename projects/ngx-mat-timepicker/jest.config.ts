import type { Config } from 'jest';
import baseConfig from '../../jest.config';

const config: Config = {
  ...baseConfig,
  displayName: 'ngx-mat-timepicker',
  coverageDirectory: '<rootDir>/../../coverage/ngx-mat-timepicker',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
};

export default config;
