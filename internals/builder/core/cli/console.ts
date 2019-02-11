// Dependencies
import * as util from 'util';


export const substitute = (message: string, ...args: any[]) => {
  if (args.length === 0) return message;

  let founds = 0;

  const cb = () => {
    founds += 1;
    return args[founds - 1];
  };

  const msg = message.split(/(%o|%O|%s|%i|%d|%f)/)
    .map((substr) => {
      switch(substr) {
        case '%o':
        case '%O': {
          return util.inspect(cb(), { colors: true });
        }
        case '%s':
        case '%i':
        case '%d':
        case '%f': {
          return cb();
        }
        default: {
          return substr;
        }
      }
    }).join('');

  if (founds === args.length - 1) {
    return msg;
  }
  return msg.concat(' ', args.slice(founds).join(' '));
};

export default {
  substitute,
};
