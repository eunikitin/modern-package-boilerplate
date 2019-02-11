// Dependencies
import * as merge from 'deepmerge';


export interface CodeParameters {
  code: string;
}

const codeDefaults = {};

export const code = (params: CodeParameters) => {
  const { code } = merge(codeDefaults, params || {});

  return code ? `   Code: ${ code }` : '';
};

export default code;
