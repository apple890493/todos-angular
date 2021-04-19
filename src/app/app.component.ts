import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //declared todos for template can use it
  todos: Todo[] = [];
  activeTodo = 0;
  newTodo = '';

  private calculateActiveItem() {
    this.activeTodo = this.todos.filter((todo) => !todo.isDone).length;
  }

  //inject the TodoService thus can use it
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    //call function after constructing this component
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.calculateActiveItem();
    });
  }

  addTodo(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.todoService
      .addTodo({ title, isDone: false } as Todo)
      .subscribe((todo) => {
        this.todos.push(todo);
        this.calculateActiveItem();
      });
    this.newTodo = '';
  }

  editTodo(event: any, todo): void {
    const newValue = event.target.value;
    todo.title = newValue;
    this.todoService.editTodo(todo).subscribe();
    this.calculateActiveItem();
    todo.editing = false;
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((oldTodo) => oldTodo !== todo);
    this.calculateActiveItem();
    this.todoService.deleteTodo(todo).subscribe();
  }

  checkTodoToggle(todo: Todo): void {
    todo.isDone = !todo.isDone;
    this.calculateActiveItem();
    this.todoService.checkTodoToggle(todo).subscribe();
  }

  toggleAllTodo(): void {
    let unDone = this.todos.filter((data) => data.isDone !== true);

    if (unDone.length === 0) {
      this.todos.forEach((data) => {
        data.isDone = !data.isDone;
        this.todoService.checkTodoToggle(data).subscribe();
      });
    }

    unDone.forEach((data) => {
      data.isDone = !data.isDone;
      this.todoService.checkTodoToggle(data).subscribe();
    });
    this.calculateActiveItem();
  }

  deleteAllTodo(): void {
    let clearItem = this.todos.filter(data => data.isDone === true)
    this.todos = this.todos.filter((data) => data.isDone !== true);
    clearItem.forEach((data) => {
      this.todoService.deleteTodo(data).subscribe();
    });
  }
}
