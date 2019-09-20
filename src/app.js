// 할 일을 추가하면 기존 할 일은 그대로 두고 추가되는 것만 그리는 방식
import {TodoManagerWithStorage} from './TodoManagerWithStorage.js'

class TodoApp {
  constructor(todos) {
    this.todoManager = new TodoManagerWithStorage();
    this.todoContainerEl = document.querySelector(".todo-container");
    this.titleEl = document.querySelector(".title h2");
    this.plusBtnEl = document.querySelector(".add-todo button");
    this.renderTodos(); // 할 일 데이터를 화면에 그림
    this.bindEvents(); // 이벤트에 반응하는 리스너 함수를 등록하는 메소드 (메소드와 사용자입력에 따른)
  }

  renderTodos() {  // 할 일 데이터를 화면에 그림
    const todoCount = document.getElementsByClassName('todo').length;
    this.todoManager.getList().slice(todoCount).forEach((todo, i) => {  
      const addIndex = todoCount + i;
      const todoEl = this.createTodoEl(todo, addIndex); 
      this.todoContainerEl.appendChild(todoEl); 
      this.todoManager.getList()[addIndex].id = addIndex; // 고유키 할당
    });
    this.renderTitle(); 
  }

  createTodoEl(todo, id) {  // '+'버튼을 눌렀을 때 생성 될 div 영역.    
    const todoEl = document.createElement("div");
    todoEl.dataset.todoId = id;
    todoEl.classList.add("todo");
    todoEl.innerHTML = 
      `<input type="checkbox" ${todo.done ? "checked" : ""}> 
        <label>${todo.contents}</label>
        <span class="close">&times;</span>`;
    todoEl.addEventListener('click', evt => {
      if(evt.target.type == 'checkbox') {
        const index = todoEl.dataset.todoId;
        this.todoManager.getList()[index].toggle();
        this.renderTitle();
      }
      if(evt.target.className == 'close') {
        const index = todoEl.dataset.todoId;
        todoEl.remove();
        this.todoManager.delTodo(index);
        this.renderTitle();
      }
    })
    return todoEl;
  }

  renderTitle() { // 현재날짜와 남은 할 일 갱신 
    const now = new Date(); 
    const month = now.getMonth() + 1; 
    const date = now.getDate();
    if (this.titleEl) {
      this.titleEl.innerHTML = 
        `${month}월 ${date}일 <span class="left-count"> 
          (${this.todoManager.leftTodoCount}개)</span>`;  
    }
  }

  bindEvents() { // 이벤트에 반응하는 리스너 함수를 등록하는 메소드
    this.plusBtnEl.addEventListener('click', evt => { 
      const textEl = document.querySelector('.add-todo input[type="text"]'); 
      this.todoManager.addTodo(textEl.value); 
      textEl.value = ''; 
      this.renderTodos();  
    });
  }
}

export {TodoApp};