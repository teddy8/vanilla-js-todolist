import {TodoManager} from './models.js';

class TodoManagerWithStorage extends TodoManager {
  static get STORAGE_KEY() {
    return "TODO-APP";
  }

  constructor() { // 로컬스토리지에 특정키에 저장되있는 할 일들을 모아놓은 json객체를 파싱해서 모델클래스에 전달해서 동기화시킴
    const todoJSON = localStorage.getItem(TodoManagerWithStorage.STORAGE_KEY);  // getItem
    const todos = (todoJSON) ? JSON.parse(todoJSON) : [];
    super(todos)
  }

  addTodo(contents, done = false) { // 오버라이드. (메소드 재정의). 이 메소드는 최초 1번만 실행 됨..
    const newTodo = super.addTodo(contents, done);  // 기존의 addTodo클래스를 이용해 리스트에 push한다
    const original = newTodo.toggle; // toggle 메소드를 변수에 할당
    newTodo.toggle = () => {  // toggle 메소드 재정의 (toggle 바뀔 때마다 호출)
      original.apply(newTodo);  // toggle 메소드 호출
      this.saveToLocalStorage();
    }
    this.saveToLocalStorage();
    return newTodo;
  }

  delTodo(index) {
    super.delTodo(index);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const todoJSON = JSON.stringify(this._todos); // 할 일 리스트를 json문자열로 바꿔서
    localStorage.setItem(TodoManagerWithStorage.STORAGE_KEY, todoJSON); // setItem에 전달
  }
}

export {TodoManagerWithStorage};