

export default {
  environment: {
    exec: () => ({
      'exec-env': {
        choices: ['production', 'development'],
        default: 'production',
        describe: 'Execution environment',
      },
    }),
    build: () => ({
      'build-env': {
        choices: ['production', 'development'],
        default: 'production',
        describe: 'Build environment',
      },
    }),
  },
  webpack: {
    log: {
      verbose: () => ({
        'webpack-verbose': {
          type: 'boolean',
          default: false,
          describe: 'Verbose logging',
        },
      }),
    },
    analyzeBundle: () => ({
      'analyze-bundle': {
        type: 'boolean',
        default: false,
        describe: 'Enable bundle analysis',
      },
    }),
  },
};
