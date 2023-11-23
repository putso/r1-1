import { addMinutes, addSeconds } from 'date-fns';
import React from 'react';
type props = {
  addTask: (value: string, tiemr: number) => void;
};
type state = {
  taskText: string;
  minutes: string;
  seconds: string;
};

function minmax(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}
export default class NewTaskForm extends React.Component<props, state> {
  state = {
    taskText: '',
    minutes: '',
    seconds: '',
  };
  constructor(props: props) {
    super(props);
    this.newTaskHandler = this.newTaskHandler.bind(this);
  }
  newTaskHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (
      e.key !== 'Enter' ||
      this.state.taskText.trim() == '' ||
      (this.state.minutes.trim() == '' && this.state.seconds.trim() == '')
    )
      return;
    let date = new Date(Date.now());
    date = addMinutes(date, Number(this.state.minutes));
    date = addSeconds(date, Number(this.state.seconds));
    this.props.addTask(this.state.taskText, date.getTime());
    this.setState(() => ({
      taskText: '',
      minutes: '',
      seconds: '',
    }));
  }
  setSeconds = (value: number) => {
    console.log(value);
    this.setState(() => ({ seconds: String(minmax(0, 60, value)) }));
  };
  setMinutes = (value: number) => {
    this.setState(() => ({ minutes: String(minmax(0, 999, value)) }));
  };
  render(): React.ReactNode {
    return (
      <div className="new-todo-form" onKeyDown={this.newTaskHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => {
            this.setState(() => {
              return {
                taskText: e.target.value,
              };
            });
          }}
          value={this.state.taskText}
        />
        <input
          className="new-todo-form__timer"
          max={2}
          type="number"
          onChange={(e) => this.setMinutes(Number(e.target.value))}
          value={this.state.minutes}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          max={2}
          type="number"
          onChange={(e) => this.setSeconds(Number(e.target.value))}
          value={this.state.seconds}
          placeholder="Sec"
        />
      </div>
    );
  }
}
