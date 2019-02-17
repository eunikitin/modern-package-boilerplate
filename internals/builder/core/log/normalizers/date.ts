// Local
import * as components from '../components';


export const date = (
  date: components.DateParameters | components.DateParameters['date'],
  timestamp: Date,
) => {
  const normalizedDate: components.DateParameters = {
    date: date instanceof Date
      ? date
      : date ? date.date : timestamp,
  };

  if (date && !(date instanceof Date) && date.options) {
    normalizedDate.options = date.options;
  }

  return normalizedDate;
};

export default date;
