import React, { useState } from 'react';
import { iTask, taskHandlers } from '@/type';
import { formatDistanceToNow, intervalToDuration } from 'date-fns';

type props = {
  task: iTask;
  taskHandlers: taskHandlers;
};
function getTimeDuration(time: number) {
  const interval = intervalToDuration({ start: 0, end: time });
  const arr = [interval.hours, interval.minutes, interval.seconds].map((el) => (el || '').toString().padStart(2, '0'));
  const [hours, minutes, seconds] = arr;
  return `${hours}:${minutes}:${seconds}`;
}
export default function Task({ task, taskHandlers }: props) {
  {
    const [canInput, setCanIput] = useState(false);
    const [editValue, setEditValue] = useState(task.value);
    const { changeTaskText, play, pause } = taskHandlers;
    const switchStateInput = () => {
      setCanIput((value) => !value);
    };
    const editHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key == 'Enter') {
        changeTaskText(task, editValue);
        switchStateInput();
        return;
      }
    };
    const onChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value);
    };
    const { switchStateTask, deleteTask } = taskHandlers;
    const getClassState = () => {
      if (canInput) return 'editing';
      if (task.completed) return 'completed';
      return '';
    };
    return (
      <li className={getClassState()}>
        <div className="view">
          <input className="toggle" onChange={() => switchStateTask(task)} checked={task.completed} type="checkbox" />
          <label>
            <span className="title">{task.value}</span>
            <span className="description timer-control">
              <button className="icon icon-play" onClick={() => play(task)}></button>
              <button className="icon icon-pause" onClick={() => pause(task)}></button>
              <span className="timer">{getTimeDuration(task.timer.time)}</span>
            </span>
            <span className="description">
              {formatDistanceToNow(new Date(task.created), { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button onClick={switchStateInput} className="icon icon-edit"></button>
          <button onClick={() => deleteTask(task)} className="icon icon-destroy"></button>
        </div>
        <input
          onKeyDown={(e) => editHandler(e)}
          onChange={(e) => onChangeEdit(e)}
          type="text"
          className="edit"
          value={editValue}
        ></input>
      </li>
    );
  }
}
