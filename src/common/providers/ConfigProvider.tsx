import { PropsWithChildren, useEffect, useState } from 'react';
import { z, ZodError } from 'zod';

import { Config, ConfigContext } from './ConfigContext';

/**
 * The configuration validation schema.
 */
const configSchema = z.object({
  VITE_BASE_URL_API: z.string().url(),
  VITE_BUILD_DATE: z.string().default('1970-01-01'),
  VITE_BUILD_TIME: z.string().default('00:00:00'),
  VITE_BUILD_TS: z.string().default('1970-01-01T00:00:00+0000'),
  VITE_BUILD_COMMIT_SHA: z.string().default('local'),
  VITE_BUILD_ENV_CODE: z.string().default('local'),
  VITE_BUILD_WORKFLOW_NAME: z.string().default('local'),
  VITE_BUILD_WORKFLOW_RUN_NUMBER: z.coerce.number().default(1),
  VITE_BUILD_WORKFLOW_RUN_ATTEMPT: z.coerce.number().default(1),
  VITE_TOAST_AUTO_DISMISS_MILLIS: z.coerce.number().default(5000),
});

/**
 * The `ConfigContextProvider` React component creates, maintains, and provides
 * access to the `ConfigContext` value.
 * Validates the React application configuration values from `import.meta.env`.
 * Throws an `Error` when the configuration is invalid, preventing application
 * startup.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const ConfigContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    try {
      const validatedConfig = configSchema.parse(import.meta.env);
      setConfig(validatedConfig);
      setIsReady(true);
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map((issue) => `${issue.path.join('.')} - ${issue.message}`);
        throw new Error(`Configuration error: ${issues.join(', ')}`);
      }
      if (err instanceof Error) throw new Error(`Configuration error: ${err.message}`);
      throw err;
    }
  }, []);

  return <ConfigContext.Provider value={config}>{isReady && <>{children}</>}</ConfigContext.Provider>;
};

export default ConfigContextProvider;
