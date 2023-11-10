import React from 'react';
import './App.scss';
import NewTaskForm from '@/components/NewTaskForm';
import TaskList from '@/components/TaskList';
import Footer from '@/components/Footer';
import { filter, iTask, taskHandlers } from '@/type';
import TasksFilter from '@/components/TasksFilter';

type state = {
  tasks: iTask[];
  filter: filter;
};
class App extends React.Component {
  state: state = {
    tasks: [],
    filter: 'all',
  };
  constructor(props: object) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.switchStateTask = this.switchStateTask.bind(this);
    this.changeTaskText = this.changeTaskText.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.getFilteredTask = this.getFilteredTask.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.countActiveTask = this.countActiveTask.bind(this);
  }
  addTask(value: string) {
    const newTask: iTask = {
      value,
      completed: false,
      created: Date.now(),
    };
    this.setState(() => {
      return {
        tasks: [...this.state.tasks, newTask],
      };
    });
  }
  changeFilter(value: filter) {
    this.setState(() => {
      return {
        filter: value,
      };
    });
  }
  switchStateTask(task: iTask) {
    this.setState(() => {
      return {
        tasks: this.state.tasks.map((el) => {
          if (task == el) {
            el = { ...el };
            el.completed = !el.completed;
          }
          return el;
        }),
      };
    });
  }
  changeTaskText(task: iTask, value: string) {
    this.setState(() => {
      return {
        tasks: this.state.tasks.map((el) => {
          if (el === task) {
            el = { ...el };
            el.value = value;
          }
          return el;
        }),
      };
    });
  }
  deleteTask(task: iTask) {
    this.setState(() => {
      return {
        tasks: this.state.tasks.filter((el) => el != task),
      };
    });
  }
  setFilter(filter: filter) {
    this.setState(() => ({
      filter,
    }));
  }
  getFilteredTask(filter: filter) {
    return this.state.tasks.filter((task) => {
      if (filter === 'all') return true;
      const isCompleted = filter == 'completed';
      return isCompleted === task.completed;
    });
  }
  clearCompleted() {
    this.setState(() => {
      const unCompetedTasks = this.getFilteredTask('active');
      return {
        tasks: unCompetedTasks,
      };
    });
  }
  countActiveTask() {
    return this.state.tasks.reduce((acc, item) => (!item.completed ? acc + 1 : acc), 0);
  }
  render() {
    const taskHandlers: taskHandlers = {
      deleteTask: this.deleteTask,
      changeTaskText: this.changeTaskText,
      switchStateTask: this.switchStateTask,
      addTask: this.addTask,
    };
    const filteredTask = this.state.tasks.filter((task) => {
      const filter = this.state.filter;
      if (filter === 'all') return true;
      const isCompleted = filter == 'completed';
      return isCompleted === task.completed;
    });
    const itemsLeft = this.countActiveTask();
    return (
      <main className="todoapp">
        <header>
          <h1>todos</h1>
        </header>
        <section className="main">
          <NewTaskForm addTask={this.addTask} />
          <TaskList tasks={filteredTask} taskHandlers={taskHandlers} />
          <Footer clearCompleted={this.clearCompleted} itemsLeft={itemsLeft}>
            <TasksFilter setFilter={this.setFilter} filter={this.state.filter} />
          </Footer>
        </section>
      </main>
    );
  }
}

export default App;
