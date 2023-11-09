import React from "react";
type props = {
  addTask:(value:string) => void

}
export default class NewTaskForm extends React.Component<props,object>{
  state = {
    taskText: ''
  }
  constructor(props:props) {
    super(props);
    this.newTaskHandler = this.newTaskHandler.bind(this);
  }
  newTaskHandler(e:React.KeyboardEvent<HTMLInputElement>) {
    if(e.key !== 'Enter') return;

    this.props.addTask(this.state.taskText);
    this.setState( () => ({
      taskText: ''
    }));
  }
  render(): React.ReactNode {
    return (
      <div>
        <input onKeyDown={this.newTaskHandler}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => {
            this.setState(() => {
              return {
                taskText: e.target.value
              }
            })

          }}
          value={this.state.taskText}
        />
      </div>
    );
  }
}
