// Local
import * as components from '../components';


export const stack = (
  stack: components.StackParameters | components.StackParameters['stack'],
) => {
  const normalizedStack: components.StackParameters = {
    stack: typeof stack === 'object' ? stack.stack : stack,
  };

  return normalizedStack;
};

export default stack;
