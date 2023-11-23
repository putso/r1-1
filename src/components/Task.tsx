import React, { useEffect, useRef, useState } from 'react';
import { iTask, taskHandlers } from '../type';
import { formatDistanceToNow, intervalToDuration } from 'date-fns';

type props = {
  data: iTask;
  taskHandlers?: taskHandlers;
};
function getTimeMseconds(endTime: number) {
  return endTime - Date.now();
}
function getTimeDuration(time: number) {
  const interval = intervalToDuration({ start: 0, end: time });
  const arr = [interval.hours, interval.minutes, interval.seconds].map((el) => (el || '').toString().padStart(2, '0'));
  const [hours, minutes, seconds] = arr;
  return `${hours}:${minutes}:${seconds}`;
}
const defaultTaskHandlers = {
  addTask: () => {},
  changeTaskText: () => {},
  deleteTask: () => {},
  switchStateTask: () => {},
};
export default function Task({ data, taskHandlers = defaultTaskHandlers }: props) {
  {
    const [canInput, setCanIput] = useState(false);
    const [editValue, setEditValue] = useState(data.value);
    const intervalIdRef = useRef<NodeJS.Timer>();
    const [time, setTime] = useState(getTimeMseconds(data.timer));
    const [isPause, setIsPause] = useState(true);
    const [currentTime, setCurrentTime] = useState(Date.now());
    useEffect(() => {
      const id = setInterval(updateTime, 1000);
      intervalIdRef.current = id;
      return () => {
        clearInterval(intervalIdRef.current);
      };
    });
    const updateTime = () => {
      console.log(isPause);
      if (isPause) return;
      let newTime = time - (Date.now() - currentTime);
      if (newTime < 0) {
        clearInterval(intervalIdRef.current);
        newTime = 0;
      }
      setTime(newTime);
      setCurrentTime(Date.now());
    };
    const play = () => {
      if (!isPause) return;
      setIsPause(false);
      setCurrentTime(Date.now());
    };
    const pause = () => {
      setIsPause(true);
    };
    const switchStateInput = () => {
      setCanIput((value) => !value);
    };
    const editHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { changeTaskText } = taskHandlers;
      if (e.key == 'Enter') {
        changeTaskText(data, editValue);
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
      if (data.completed) return 'completed';
      return '';
    };
    useEffect(() => {
      if (data.completed) pause();
    }, [data.completed]);
    return (
      <li className={getClassState()}>
        <div className="view">
          <input className="toggle" onChange={() => switchStateTask(data)} checked={data.completed} type="checkbox" />
          <label>
            <span className="title">{data.value}</span>
            <span className="description timer-control">
              <button className="icon icon-play" onClick={play}></button>
              <button className="icon icon-pause" onClick={pause}></button>
              <span className="timer">{getTimeDuration(time)}</span>
            </span>
            <span className="description">
              {formatDistanceToNow(new Date(data.created), { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button onClick={switchStateInput} className="icon icon-edit"></button>
          <button onClick={() => deleteTask(data)} className="icon icon-destroy"></button>
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
