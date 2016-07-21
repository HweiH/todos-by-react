/**
 * Created by hasee on 2016/7/21.
 */
import React from 'react';
import TodoItem from './TodoItem';

export default class TodoMain extends React.Component {

  // 渲染 => 遍历显示任务，转发props
  render() {
    return (
      <ul className="todo-list">
        { this.props.todos.map((todo, index) => {
          return <TodoItem
            key={ index }
            { ...todo }
            index={ index }
            { ...this.props }
          />;
        })}
      </ul>
    );
  }
}
