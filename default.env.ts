

export type Env = 'production' | 'development';

export type Target = 'node' | 'web';

export interface PresetSchema {
  target?: Target;

  environment?: {
    execEnv?:  Env;
    buildEnv?: Env;
  };

  rollup?: {
    watch?:         boolean;
    analyzeBundle?: boolean;
    log?:           boolean;
  };

  jest?: {
    collectCoverage?: boolean;
  };
}

export const preset: PresetSchema = {
  target: 'node',

  environment: {
    execEnv:  'production',
    buildEnv: 'production',
  },
  rollup: {
    watch:         false,
    analyzeBundle: false,
    log:           true,
  },

  jest: {
    collectCoverage: true,
  },
};

export default preset;
