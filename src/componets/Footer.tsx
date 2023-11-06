import React from 'react'


export default class Footer extends React.Component<{
  children: React.ReactNode
  itemsLeft: number
  clearCompleted: () => void
},object> {
  render(): React.ReactNode {
  const {children,clearCompleted,itemsLeft} = this.props;    
  return (
    <footer className="footer">
       <span className="todo-count">{itemsLeft} items left</span>
      {children}
      <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
    </footer>
  )
  }
}

