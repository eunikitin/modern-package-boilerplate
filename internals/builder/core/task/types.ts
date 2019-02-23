// Dependencies
import * as Undertaker from 'undertaker';


export type BranchCallback = string;

export type LeafCallback<T = any> = (resolve: () => T, reject: () => void) => Promise<T>;

export type TaskCallback<T = any> = LeafCallback<T> | BranchCallback;

export interface DeferredTask {
  name:     string;
  callback: BranchCallback;
}

export interface Task<T = any> {
  name:     string;
  callback: LeafCallback<T>;
}

export interface TaskComposition {
  type: 'series' | 'parallel';
  tasks: (Undertaker.Task | string)[];
}

export interface TaskCompositions {
  [key: string]: TaskComposition;
}
