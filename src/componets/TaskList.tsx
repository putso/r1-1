import React from "react";
import Task from "./Task";
import { iTask, taskHandlers } from "../type";
export default  class TaskList extends React.Component<{  taskHandlers: taskHandlers,tasks:iTask[]},object> {
  state: Readonly<{
    tasks: iTask[]
  }> = {
    tasks: []
  };
  render() {
    const {taskHandlers,tasks} = this.props;
  return (
    <ul className="todo-list">
      {tasks.map((task, i) => (
        <Task key={task.created} data={task} index={i} taskHandlers = {taskHandlers}/>
      ))}
    </ul>
  );
  }
}
// export default function TaskList() {
//   return (
//     <ul className="todo-list">
//       {/* {tasks.map((task, i) => (
//         <Task key={task.created} data={task} index={i} taskHandlers = {taskHandlers}/>
//       ))} */}
//     </ul>
//   );
// }
