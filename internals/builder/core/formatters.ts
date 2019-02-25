// Dependencies
import * as colors from 'colors';
import * as moment from 'moment';


export const state = (state: string)            => `${state}`;
export const task  = (task: string)             => `'${colors.cyan(task)}'`;
export const time  = (time: moment.MomentInput) => `after ${colors.magenta(`${time} ms`)}`;

export default {
  state,
  task,
  time,
};
