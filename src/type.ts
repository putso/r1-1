export type filter = 'all' | 'active' | 'completed';
export interface iTask {
  completed: boolean;
  value: string;
  created: number;
}
export interface taskHandlers {
  changeTaskText: (task: iTask, value: string) => void;
  switchStateTask: (task: iTask) => void;
  deleteTask: (task: iTask) => void;
  addTask: (value: string) => void;
}
const t = 0;
console.log(t);
