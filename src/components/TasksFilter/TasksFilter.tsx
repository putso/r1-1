import React from 'react';
import { filter } from '@/type';
const filters: Capitalize<filter>[] = ['Active', 'All', 'Completed'];
export default function TasksFilter({ filter, setFilter }: { setFilter: (filter: filter) => void; filter: filter }) {
  return (
    <ul className="filters">
      {filters.map((value, i) => (
        <li key={i}>
          <button
            className={value.toLocaleLowerCase() == filter ? 'selected' : ''}
            onClick={() => setFilter(value.toLocaleLowerCase() as filter)}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}
