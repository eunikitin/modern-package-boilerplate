// Dependencies
import * as winston    from 'winston';

// Local
import * as types      from './types';
import * as formatters from './formatters';


export const formatterOptionsDefaults = {
  shouldNormalize: true,
};

function normalizeErrorObject(
  data: string | Error | types.OmitDynamicData<formatters.ErrorFormatterData>,
  err: Error,
) {
  if (data instanceof Error) return data;
  if (err instanceof Error)  return err;
  return null;
}

export function normalizeError(
  level: 'error' | 'fatal',
  data: string | Error | types.OmitDynamicData<formatters.ErrorFormatterData>,
  err?: Error,
): winston.LogEntry {
  if (typeof data === 'string' && !err) {
    return { level, message: data };
  }

  const normalizedErr   = normalizeErrorObject(data, err);
  let normalizedMessage = typeof data === 'string' ? data : data.message || '';
  const normalizedData  = typeof data === 'object' ? data : {};

  let logEntry = {
    level,
    message: '',
  };

  if (normalizedErr) {
    normalizedMessage = normalizedMessage === '' ? normalizedErr.message : normalizedMessage;

    logEntry = Object.assign({}, logEntry, {
      name:    normalizedErr.name,
      stack:   normalizedErr.stack,
    });
  }

  logEntry = Object.assign({}, logEntry, {
    ...normalizedData,
    message: normalizedMessage,
  });

  return logEntry;
}

export function normalize(
  level, data: string | types.OmitDynamicData<formatters.BaseFormatterData> & { err?: Error },
): winston.LogEntry {
  const normalizedMessage = typeof data === 'string'
    ? data || ''
    : typeof data.message === 'object'
      ? data.message.message || ''
      : data.message || '';

  if (typeof data === 'string') {
    return { level, message: normalizedMessage };
  }

  return { level, ...data, message: normalizedMessage };
}
