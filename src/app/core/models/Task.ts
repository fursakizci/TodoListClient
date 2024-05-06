import { FormControl } from "@angular/forms";

export interface Task {
  id?: string;
  title: string;
  description?: string;
  createdDate?: Date;
  status: TaskStatus;
}

export enum TaskStatus {
  Open = 'Open',
  InProgress = 'InProgress',
  Done = 'Done'
}

export enum TabName {
  All = 'All',
  Open = 'Open',
  Progress = 'InProgress',
  Done = 'Done'
}

export interface TaskFormModel {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
}