// Dependencies
import * as colors from 'colors';
import * as dayjs  from 'dayjs';


export const state = (state: string)           => `${state}`;
export const task  = (task: string)            => `'${colors.cyan(task)}'`;
export const time  = (time: dayjs.DayjsObject) => `after ${colors.magenta(`${time} ms`)}`;

export default {
  state,
  task,
  time,
};
