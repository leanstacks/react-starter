import { afterEach, beforeEach, describe, it, expect } from 'vitest';

import { getConfig } from './config';

describe('config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      // Required fields; seed defaults so all tests pass unless overridden
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getConfig', () => {
    it('should return a valid config object when all required environment variables are set', () => {
      // ARRANGE
      process.env.CDK_APP_NAME = 'my-app';
      process.env.CDK_ENV = 'dev';
      process.env.CDK_OU = 'my-ou';
      process.env.CDK_OWNER = 'my-owner';

      // ACT
      const config = getConfig();

      // ASSERT
      expect(config.CDK_APP_NAME).toBe('my-app');
      expect(config.CDK_ENV).toBe('dev');
      expect(config.CDK_OU).toBe('my-ou');
      expect(config.CDK_OWNER).toBe('my-owner');
    });
  });
});
