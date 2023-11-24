import React, { useState } from 'react';
import './App.scss';
import NewTaskForm from '@/components/NewTaskForm';
import TaskList from '@/components/TaskList';
import Footer from '@/components/Footer';
import { filter, iTask, taskHandlers } from '@/type';
import TasksFilter from '@/components/TasksFilter';
import useTimer from '@/hooks/useTimer';
const App = () => {
  const [tasks, setTasks] = useState<iTask[]>([]);
  const [filter, setFilter] = useState<filter>('all');
  const { play, pause } = useTimer(setTasks);
  function addTask(value: string, time: number) {
    const newTask: iTask = {
      value,
      completed: false,
      created: Date.now(),
      timer: {
        time,
        isPause: true,
      },
    };
    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  }

  function switchStateTask(task: iTask) {
    setTasks((tasks) => {
      return tasks.map((el) => {
        if (task == el) {
          el = { ...el };
          el.completed = !el.completed;
          el.timer.isPause = el.completed;
        }
        return el;
      });
    });
  }
  function changeTaskText(task: iTask, value: string) {
    setTasks((tasks) => {
      return tasks.map((el) => {
        if (el === task) {
          el = { ...el };
          el.value = value;
        }
        return el;
      });
    });
  }
  function deleteTask(task: iTask) {
    setTasks((tasks) => {
      return tasks.filter((el) => el != task);
    });
  }
  function updateFilter(filter: filter) {
    setFilter(() => filter);
  }
  function getFilteredTask(filter: filter) {
    return tasks.filter((task) => {
      if (filter === 'all') return true;
      const isCompleted = filter == 'completed';
      return isCompleted === task.completed;
    });
  }
  function clearCompleted() {
    setTasks(() => {
      const unCompetedTasks = getFilteredTask('active');
      return unCompetedTasks;
    });
  }
  function countActiveTask() {
    return tasks.reduce((acc, item) => (!item.completed ? acc + 1 : acc), 0);
  }
  const taskHandlers: taskHandlers = {
    deleteTask: deleteTask,
    changeTaskText: changeTaskText,
    switchStateTask: switchStateTask,
    addTask: addTask,
    play: play,
    pause: pause,
  };
  const filteredTask = tasks.filter((task) => {
    if (filter === 'all') return true;
    const isCompleted = filter == 'completed';
    return isCompleted === task.completed;
  });
  const itemsLeft = countActiveTask();
  return (
    <main className="todoapp">
      <header>
        <h1>todos</h1>
      </header>
      <section className="main">
        <NewTaskForm addTask={addTask} />
        <TaskList tasks={filteredTask} taskHandlers={taskHandlers} />
        <Footer clearCompleted={clearCompleted} itemsLeft={itemsLeft}>
          <TasksFilter setFilter={updateFilter} filter={filter} />
        </Footer>
      </section>
    </main>
  );
};

export default App;
