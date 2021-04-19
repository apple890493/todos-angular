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
  todos: Todo[];
  activeTodo: number;
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

  checkToggle(id: number): void {
    console.log('checkToggle', id);
  }

  deleteTodo(): void {
    console.log('delete');
  }
}
