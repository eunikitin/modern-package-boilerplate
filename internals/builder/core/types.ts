// Dependencies
import * as yargs from 'yargs';

// Core
import TaskRunner from 'builder/core/task/TaskRunner';


export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type Optional<T, K extends keyof T = keyof T> = { [P in K]?: T[P] };

export interface EnvironmentData {
  runner:      TaskRunner;
  state:       any;
  cli:         yargs.Argv;
  environment: object;
}


export interface TaskCallback {
  (data: EnvironmentData): any;
}

export interface CliCallback {
  (data: EnvironmentData): any;
}


export interface Task {
  name:     string;
  callback: TaskCallback;
  cli:      CliCallback;
}

export interface State {
  environment?: any;
}
