/**
 * Created by hasee on 2016/7/21.
 */
import React from 'react';

export default class TodoFooter extends React.Component {

  // 处理全选与不全选的状态
  handleAllState(event) {
    this.props.changeTodoState(null, event.target.checked, true);
  }

  // 绑定点击事件，清除已完成
  handleClick() {
    this.props.clearDone();
  }

  // 渲染
  render() {
    return (
      <div className="clearfix todo-footer">
        <input
          className="fl"
          type="checkbox"
          checked={ this.props.isAllChecked }
          onChange={ this.handleAllState.bind(this) }
        />
        <span className="fl">
          { this.props.todoDoneCount }已完成 / { this.props.todoCount }总数
        </span>
        <button
          className="fr"
          onClick={ this.handleClick.bind(this) }
        >
          清除已完成
        </button>
      </div>
    );
  }

}
