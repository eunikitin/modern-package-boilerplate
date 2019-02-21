// Dependencies
import * as winston    from 'winston';

// Local
import * as utils      from './utils';
import * as types      from './types';
import * as components from './components';
import * as formatters from './formatters';
import config          from './config';


const cliTransform = winston.format.printf((data: any) => {
  switch(data.level) {
  case 'fatal':
  case 'error':
    return formatters.errorFormatter(data);

  case 'warn':
    return formatters.warnFormatter(data);

  case 'info':
    return formatters.infoFormatter(data);

  case 'debug':
    return formatters.debugFormatter(data);

  case 'verbose':
  default:
    return formatters.baseFormatter(data);
  }
});

const cliFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.prettyPrint(),
  cliTransform,
);

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
);

const logger = winston.createLogger({
  level:  'debug',
  levels: config.levels,
  transports: [
    new (winston.transports.Console)({
      format: cliFormat,
    }),
    new (winston.transports.File)({
      format: jsonFormat,
      filename: 'somefile.json',
    }),
  ],
});

export const debug = (data: types.OmitDynamicData<formatters.DebugFormatterData>) => (
  logger.log(utils.normalize('debug', { ...data, message: data.message || '' }))
);
export const error = (data: string | types.OmitDynamicData<formatters.ErrorFormatterData>, err?: Error) => (
  logger.log(utils.normalizeError('error', data, err))
);
export const fatal = (data: string | types.OmitDynamicData<formatters.ErrorFormatterData>, err?: Error) => (
  logger.log(utils.normalizeError('fatal', data, err))
);
export const info = (data: string | types.OmitDynamicData<formatters.InfoFormatterData>) => (
  logger.log(utils.normalize('info', data))
);
export const log = (data: formatters.BaseFormatterData) => (
  logger.log(utils.normalize(data.level, data))
);
export const verbose = (data: string | types.OmitDynamicData<formatters.BaseFormatterData>) => (
  logger.log(utils.normalize('verbose', data))
);
export const warn = (data: types.OmitDynamicData<formatters.WarnFormatterData>) => (
  logger.log(utils.normalize('warn', data))
);

export default {
  debug,
  error,
  fatal,
  info,
  log,
  verbose,
  warn,
  components,
  formatters,
};
