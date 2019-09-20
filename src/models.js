class Todo {
  constructor(contents, done) {
    this.contents = contents;
    this.done = done;
  }
  toggle() {
    this.done = !this.done;
  }
}

class TodoManager {
  constructor(todos = []) {
    this._todos = [];
    todos.forEach(todo => {
      this.addTodo(todo.contents, todo.done);
    });
  }

  addTodo(contents, done = false) {
    const newTodo = new Todo(contents, done);
    this._todos.push(newTodo);
    return newTodo;
  }

  delTodo(index) {
    this._todos = this._todos.filter(function(obj) {  // 삭제되는 것을 제외한 아이템만 남김
      console.log('objid, index :', obj.id, index);
      return obj.id != index;
    });
    console.log(this._todos);
  }

  getList() {
    return this._todos;
  }

  get leftTodoCount() {
    return this._todos.reduce((p, c) => {
      if (c.done === false) {
        return ++p;
      } else {
        return p;
      }
    }, 0);
  }
}

export {Todo, TodoManager};