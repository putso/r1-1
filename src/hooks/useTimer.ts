import { iTask } from '@/type';
import { useEffect } from 'react';

const useTimer = (setTasks: React.Dispatch<React.SetStateAction<iTask[]>>) => {
  const updateTime = (step: number) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.timer.isPause) return task;
        task = { ...task };
        const timer = task.timer;
        timer.time = timer.time - step;
        if (timer.time < 0) {
          timer.time = 0;
          timer.isPause = true;
        }
        return task;
      })
    );
  };
  useEffect(() => {
    let prevTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const step = Math.max(1000, (currentTime - prevTime) % 1000);
      prevTime = currentTime;
      updateTime(step);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const play = (task: iTask) => {
    if (!task.timer.isPause) return;
    setTasks((tasks) =>
      tasks.map((el) => {
        if (el != task) return el;
        el = { ...el };
        el.timer.isPause = false;
        return el;
      })
    );
  };
  const pause = (task: iTask) => {
    if (task.timer.isPause) return;
    setTasks((tasks) =>
      tasks.map((el) => {
        if (el != task) return el;
        el = { ...el };
        el.timer.isPause = true;
        return el;
      })
    );
  };
  return { play, pause };
};

export default useTimer;
