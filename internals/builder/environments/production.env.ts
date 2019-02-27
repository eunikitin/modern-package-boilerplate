import { PresetSchema } from 'root/default.env';


export const preset: PresetSchema = {
  environment: {
    execEnv:  'production',
    buildEnv: 'production',
  },
  rollup: {
    log: true,
  },
};

export default preset;
