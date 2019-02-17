// Local
import * as types       from '../types';
import * as normalizers from '../normalizers';


export const warn = (
  data: types.WithDynamicParams<types.FormatterData & types.TraceData>,
): types.NormalizedErrorData => {
  const normalizedData: types.NormalizedErrorData = normalizers.base(data);

  if (data.code)  normalizedData.code  = normalizers.code(data.code);
  if (data.stack) normalizedData.stack = normalizers.stack(data.stack);

  return normalizedData;
};
