import React from 'react';
import Task from '@/components/Task';
import { iTask, taskHandlers } from '@/type';
export default function TaskList({ taskHandlers, tasks }: { taskHandlers: taskHandlers; tasks: iTask[] }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.created} task={task} taskHandlers={taskHandlers} />
      ))}
    </ul>
  );
}
