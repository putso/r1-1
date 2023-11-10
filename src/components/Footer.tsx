import React from 'react';

export default function Footer({
  children,
  clearCompleted,
  itemsLeft,
}: {
  children: React.ReactNode;
  itemsLeft: number;
  clearCompleted: () => void;
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      {children}
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
