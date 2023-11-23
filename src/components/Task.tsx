import React from 'react';
import { iTask, taskHandlers } from '../type';
import { formatDistanceToNow, intervalToDuration } from 'date-fns';

type props = {
  data: iTask;
  taskHandlers: taskHandlers;
};
function getTimeMseconds(endTime: number) {
  return endTime - Date.now();
}
function getTimeDuration(time: number) {
  const interval = intervalToDuration({ start: 0, end: time });
  return `${interval.hours ? interval.hours + ':' : ''}${interval.minutes}:${interval.seconds}`;
}
const defaultTaskHandlers = {
  addTask: () => {},
  changeTaskText: () => {},
  deleteTask: () => {},
  switchStateTask: () => {},
};
export default class Task extends React.Component<
  props,
  {
    canInput: boolean;
    editValue: string;
    intervalId?: NodeJS.Timer;
    time: number;
    isPause: boolean;
    currentTime: number;
  }
> {
  static defaultProps = {
    taskHandlers: defaultTaskHandlers,
  };

  constructor(props: props) {
    super(props);
    this.switchStateInput = this.switchStateInput.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.state = {
      canInput: false,
      editValue: this.props.data.value,
      intervalId: undefined,
      time: getTimeMseconds(props.data.timer),
      isPause: false,
      currentTime: Date.now(),
    };
  }
  componentWillUnmount(): void {
    clearInterval(this.state.intervalId);
  }
  updateTime = () => {
    if (this.state.isPause) return;
    let time = this.state.time - (Date.now() - this.state.currentTime);
    if (time < 0) {
      clearInterval(this.state.intervalId);
      time = 0;
    }
    this.setState(() => ({ time, currentTime: Date.now() }));
  };
  componentDidMount(): void {
    const id = setInterval(this.updateTime, 1000);
    this.setState(() => ({
      intervalId: id,
    }));
  }
  play = () => {
    if (!this.state.isPause) return;
    this.setState(() => ({ isPause: false, currentTime: Date.now() }));
  };
  pause = () => {
    this.setState(() => ({ isPause: true }));
  };
  switchStateInput() {
    this.setState(() => {
      return {
        canInput: !this.state.canInput,
      };
    });
  }
  editHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const { changeTaskText } = this.props.taskHandlers;
    if (e.key == 'Enter') {
      changeTaskText(this.props.data, this.state.editValue);
      this.switchStateInput();
      return;
    }
  }
  onChangeEdit(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState(() => {
      return {
        editValue: e.target.value,
      };
    });
  }
  render() {
    const { taskHandlers, data } = this.props;
    const { switchStateTask, deleteTask } = taskHandlers;
    const getClassState = () => {
      if (this.state.canInput) return 'editing';
      if (data.completed) return 'completed';
      return '';
    };
    return (
      <li className={getClassState()}>
        <div className="view">
          <input
            className="toggle"
            onChange={() => switchStateTask(this.props.data)}
            checked={data.completed}
            type="checkbox"
          />
          <label>
            <span className="title">{data.value}</span>
            <span className="description timer-control">
              <button className="icon icon-play" onClick={this.play}></button>
              <button className="icon icon-pause" onClick={this.pause}></button>
              <span className="timer">{getTimeDuration(this.state.time)}</span>
            </span>
            <span className="description">
              {formatDistanceToNow(new Date(data.created), { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button onClick={this.switchStateInput} className="icon icon-edit"></button>
          <button onClick={() => deleteTask(data)} className="icon icon-destroy"></button>
        </div>
        <input
          onKeyDown={(e) => this.editHandler(e)}
          onChange={(e) => this.onChangeEdit(e)}
          type="text"
          className="edit"
          value={this.state.editValue}
        ></input>
      </li>
    );
  }
}
