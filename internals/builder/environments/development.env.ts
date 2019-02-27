import { PresetSchema } from 'root/default.env';


export const preset: PresetSchema = {
  environment: {
    execEnv:  'development',
    buildEnv: 'development',
  },
  rollup: {
    watch: true,
    log:   true,
  },
};

export default preset;
