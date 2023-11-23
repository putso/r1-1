import React from 'react';
import Task from '../Task';
import { iTask, taskHandlers } from '../../type';
export default function TaskList({ taskHandlers, tasks }: { taskHandlers: taskHandlers; tasks: iTask[] }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.created} data={task} taskHandlers={taskHandlers} />
      ))}
    </ul>
  );
}
