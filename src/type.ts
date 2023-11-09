export type filter = 'all' | 'active' | 'completed';
export interface iTask {
  completed: boolean;
  value: string;
  created: number;
}
export interface taskHandlers {
  changeTaskText: (id: number, value: string) => void;
  switchStateTask: (index: number) => void;
  deleteTask: (index: number) => void;
  addTask: (value: string) => void;
}
const t = 0;
console.log(t);
