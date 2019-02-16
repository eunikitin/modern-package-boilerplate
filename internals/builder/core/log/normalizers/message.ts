// Local
import * as components from '../components';


export const message = (
  message: components.MessageParameters | components.MessageParameters['message'],
) => {
  const normalizedMessage: components.MessageParameters = {
    message: typeof message === 'object' ? message.message || '' : message || '',
  };

  return normalizedMessage;
};

export default message;
