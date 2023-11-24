export type filter = 'all' | 'active' | 'completed';
export interface iTask {
  completed: boolean;
  value: string;
  created: number;
  timer: {
    time: number;
    isPause: boolean;
  };
}
export interface taskHandlers {
  changeTaskText: (task: iTask, value: string) => void;
  switchStateTask: (task: iTask) => void;
  deleteTask: (task: iTask) => void;
  addTask: (value: string, timer: number) => void;
  play: (task: iTask) => void;
  pause: (task: iTask) => void;
}
