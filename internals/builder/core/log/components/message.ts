// Dependencies
import * as merge      from 'deepmerge';

// Local
import * as components from './';


export interface MessageOptions {
  checkMultiline?: boolean;
}

export interface MessageParameters {
  message:  string;
  options?: MessageOptions;
}

export const messageDefaults = {
  options: {
    checkMultiline: true,
  },
};

export const message = (params: MessageParameters) => {
  const { message, options } = merge(messageDefaults, params || {});

  return message ? components.multiline(message, options.checkMultiline) : '';
};

export default message;
