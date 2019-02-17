// Local
import * as components from '../components';


export const code = (
  code: components.CodeParameters | components.CodeParameters['code'],
) => {
  const normalizedCode: components.CodeParameters = {
    code: typeof code === 'object' ? code.code : code,
  };

  return normalizedCode;
};

export default code;
