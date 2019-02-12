// Dependencies
import * as merge from 'deepmerge';


export interface StackParameters {
  stack: string;
}

const stackDefaults = {};

export const stack = (params: StackParameters) => {
  const { stack } = merge(stackDefaults, params || {});

  return stack ? `${stack.substr(stack.indexOf('\n'))}` : '';
};

export default stack;
