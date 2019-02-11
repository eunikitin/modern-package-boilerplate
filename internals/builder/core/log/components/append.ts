// Dependencies
import * as merge from 'deepmerge';


export interface AppendOptions {
  prefix?:  boolean;
  postfix?: boolean;
}

export interface AppendParameters {
  text:     string;
  options?: AppendOptions;
}

export const appendDefaults = {
  options: {
    prefix:  false,
    postfix: true,
  },
};

export const append = (params: AppendParameters) => {
  const { text, options } = merge(appendDefaults, params || {});

  return text !== '' ? `${options.prefix ? ' ' : ''}${text}${options.postfix ? ' ' : ''}` : '';
};

export default append;
