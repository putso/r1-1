import { addMinutes, addSeconds } from 'date-fns';
import React, { useState } from 'react';
type props = {
  addTask: (value: string, tiemr: number) => void;
};

function minmax(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}
export default function NewTaskForm({ addTask }: props) {
  const [taskText, setTaskText] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  function newTaskHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || taskText.trim() == '' || (minutes.trim() == '' && seconds.trim() == '')) return;
    let date = new Date(Date.now());
    date = addMinutes(date, Number(minutes));
    date = addSeconds(date, Number(seconds));
    addTask(taskText, date.getTime());
    setTaskText('');
    setMinutes('');
    setSeconds('');
  }
  const updateSeconds = (value: number) => {
    setSeconds(String(minmax(0, 60, value)));
  };
  const updasteMinutes = (value: number) => {
    setMinutes(String(minmax(0, 999, value)));
  };
  return (
    <div className="new-todo-form" onKeyDown={newTaskHandler}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => {
          setTaskText(e.target.value);
        }}
        value={taskText}
      />
      <input
        className="new-todo-form__timer"
        max={2}
        type="number"
        onChange={(e) => updasteMinutes(Number(e.target.value))}
        value={minutes}
        placeholder="Min"
      />
      <input
        className="new-todo-form__timer"
        max={2}
        type="number"
        onChange={(e) => updateSeconds(Number(e.target.value))}
        value={seconds}
        placeholder="Sec"
      />
    </div>
  );
}
