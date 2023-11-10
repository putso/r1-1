import React from 'react';
import { iTask, taskHandlers } from '../type';
import { formatDistanceToNow } from 'date-fns';

type props = {
  data: iTask;
  taskHandlers: taskHandlers;
};

const defaultTaskHandlers = {
  addTask: () => {},
  changeTaskText: () => {},
  deleteTask: () => {},
  switchStateTask: () => {},
};
export default class Task extends React.Component<props, object> {
  static defaultProps = {
    taskHandlers: defaultTaskHandlers,
  };
  state = {
    canInput: false,
    editValue: this.props.data.value,
  };
  constructor(props: props) {
    super(props);
    this.switchStateInput = this.switchStateInput.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
  }
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
            <span className="description">{data.value}</span>
            <span className="created">
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
