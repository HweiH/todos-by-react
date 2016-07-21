/**
 * Created by hasee on 2016/7/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';

export default class TodoItem extends React.Component {

  // 处理任务是否完成状态
  handleChange() {
    let isDone = !this.props.isDone;
    this.props.changeTodoState(this.props.index, isDone);
  }

  // 鼠标移入
  handleMouseOver() {
    ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = 'inline';
  }

  // 鼠标移出
  handleMouseOut() {
    ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = 'none';
  }

  // 删除当前任务
  handleDelete() {
    this.props.deleteTodo(this.props.index);
  }

  // 渲染
  render() {
    let doneStyle = this.props.isDone ? { textDecoration: 'line-through' } : { textDecoration: 'none' };

    return (
      <li
        onMouseOver={ this.handleMouseOver.bind(this) }
        onMouseOut={ this.handleMouseOut.bind(this) }
      >
        <input
          type="checkbox"
          checked={ this.props.isDone }
          onChange={ this.handleChange.bind(this) }
        />
        <span style={ doneStyle }>
          { this.props.text }
        </span>
        <button
          className="fr"
          style={{ 'display': 'none' }}
          ref="deleteBtn"
          onClick={ this.handleDelete.bind(this) }
        >
          删除
        </button>
      </li>
    );
  }

}
