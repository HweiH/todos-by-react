require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import LocalDb from 'localdb';

import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoFooter from './TodoFooter';

//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  // 通过构造函数初始化
  constructor(props, context) {
    super(props, context);
    this.db = new LocalDb('React-Todos', 'Object');
    this.state = {
      todos: this.db.get('todos') || [],
      isAllChecked: false
    };
  }

  // 判断是否所有任务的状态都完成，同步底部的全选框
  allChecked() {
    let isAllChecked = false;
    if(this.state.todos.every((todo) => todo.isDone)) {
      isAllChecked = true;
    }
    this.setState({
      todos: this.state.todos,
      isAllChecked: isAllChecked
    });
  }

  // 添加任务，这是传递给Header组件的方法
  addTodo(todoItem) {
    this.state.todos.push(todoItem);
    this.allChecked();
    this.db.set('todos', this.state.todos);
  }

  // 改变任务状态，传递给TodoItem和Footer组件的方法
  changeTodoState(index, isDone, isChangeAll=false) {
    if(isChangeAll) {
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.isDone = isDone;
          return todo;
        }),
        isAllChecked: isDone
      });
    } else {
      this.state.todos[index].isDone = isDone;
      this.allChecked();
    }
    this.db.set('todos', this.state.todos);
  }

  // 清除已完成的任务，传递给Footer组件的方法
  clearDone() {
    let todos = this.state.todos.filter(todo => !todo.isDone);
    this.setState({
      todos: todos,
      isAllChecked: false
    });
    this.db.set('todos', todos);
  }

  // 删除当前的任务，传递给TodoItem的方法
  deleteTodo(index) {
    this.state.todos.splice(index, 1);
    this.setState({ todos: this.state.todos });
    this.db.set('todos', this.state.todos);
  }

  render() {
    var props = {
      todoCount: this.state.todos.length || 0,
      todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
    };
    return (
      <div className="panel">
        <TodoHeader
          addTodo={ this.addTodo.bind(this) }
        />
        <TodoMain
          deleteTodo={ this.deleteTodo.bind(this) }
          todos={ this.state.todos }
          changeTodoState={ this.changeTodoState.bind(this) }
        />
        <TodoFooter
          isAllChecked={ this.state.isAllChecked }
          clearDone={ this.clearDone.bind(this) }
          { ...props }
          changeTodoState={ this.changeTodoState.bind(this) }
        />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
