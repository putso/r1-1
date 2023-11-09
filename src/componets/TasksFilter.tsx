import React from 'react';
import { filter } from '../type';

export default class TasksFilter extends React.Component<
  {
    setFilter: (filter: filter) => void;
    filter: filter;
  },
  object
> {
  render() {
    const { filter, setFilter } = this.props;
    const filters: Capitalize<filter>[] = ['Active', 'All', 'Completed'];
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
}
