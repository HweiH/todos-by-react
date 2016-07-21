/**
 * Created by hasee on 2016/7/21.
 */
import React from 'react';

class TodoHeader extends React.Component {

  // 绑定键盘回车事件，添加新任务
  handleKeyUp(event) {
    // 13 => 回车
    if(13 === event.keyCode) {
      let value = event.target.value;

      if(!value) {
        return false;
      }

      let newTodoItem = {
        text: value,
        isDone: false
      };
      event.target.value = '';
      this.props.addTodo(newTodoItem);
    }
  }

  // 渲染
  render() {
    return (
      <div className="panel-header">
        <input
          type="text"
          placeholder="what's you task?"
          onKeyUp={ this.handleKeyUp.bind(this) }
        />
      </div>
    );
  }
}

export default TodoHeader;
