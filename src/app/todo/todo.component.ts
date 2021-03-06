import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  //declared todos for template can use it
  todos: Todo[] = [];
  todoPerPage: Todo[];
  todoleft: Todo[];
  activeTodo = 0;
  newTodo = '';
  toggleCheck: boolean;
  footerTodo: boolean = true;
  path;
  totalPages = [];
  currentPage = 1;

  private calculateActiveItem() {
    this.activeTodo = this.todoleft.filter((todo) => !todo.isDone).length;
  }

  private toggleAllShow() {
    let checkItem = this.todoleft.filter((t) => t.isDone).length;
    this.toggleCheck = checkItem > 0 ? true : false;
  }

  private footerShow() {
    this.footerTodo = this.todoleft.length === 0 ? false : true;
  }

  private getTotalPages() {
    this.totalPages = [];
    const pageIndex = Math.ceil(this.todos.length / 5) || 0;
    for (let i = 1; i <= pageIndex; i++) {
      this.totalPages.push(i);
    }
  }

  private getPageData(page: number) {
    this.currentPage = page;
    let offset = (this.currentPage - 1) * 5;
    this.todoPerPage = this.todos.slice(offset, offset + 5);
  }

  //inject the TodoService thus can use it
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //call function after constructing this component
    this.route.params.subscribe((params) => {
      this.path = params['status'];
      this.getTodos(this.path);
      console.log('place', params['status']);
    });
  }

  getTodos(query: string): void {
    this.todoService
      .getTodos()
      .pipe(tap(console.log))
      .subscribe((todos) => {
        this.todoleft = todos;
        if (query === 'completed') {
          this.todos = todos.filter((data) => data.isDone);
        } else if (query === 'active') {
          this.todos = todos.filter((data) => !data.isDone);
        } else if (query === 'all') {
          this.todos = todos;
        }
        this.getTotalPages();
        this.getPageData(this.currentPage);
        this.calculateActiveItem();
        this.toggleAllShow();
        this.footerShow();
      });
  }

  addTodo(title: string) {
    title = title.trim();
    if (!title) {
      return;
    }
    this.todoService
      .addTodo({ title, isDone: false } as Todo)
      .subscribe((todo) => {
        this.todos.push(todo);
        console.log('here', this.todos);
        this.todoleft = this.todos;
        this.newTodo = '';
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['all']);
      });
  }

  editTodo(event: any, todo): void {
    const newValue = event.target.value;
    todo.title = newValue;
    todo.editing = false;
    this.todoService.editTodo(todo).subscribe();
    this.calculateActiveItem();
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((oldTodo) => oldTodo !== todo);
    this.todoleft = this.todos;
    this.todoService.deleteTodo(todo).subscribe();
    this.calculateActiveItem();
    this.footerShow();
    this.toggleAllShow();
    this.getTotalPages();
    this.getPageData(this.currentPage);
    this.router.navigate(['all']);
  }

  checkTodoToggle(todo: Todo): void {
    todo.isDone = !todo.isDone;
    let checkCount = this.todos.filter((data) => data.isDone !== true);
    if (checkCount.length === 0) {
    }
    this.calculateActiveItem();
    this.toggleAllShow();

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
    this.toggleAllShow();
  }

  deleteAllTodo(): void {
    let clearItem = this.todos.filter((data) => data.isDone === true);
    this.todos = this.todos.filter((data) => data.isDone !== true);
    this.todoleft = this.todos;
    clearItem.forEach((data) => {
      this.todoService.deleteTodo(data).subscribe();
    });
    this.footerShow();
    this.calculateActiveItem();
    this.toggleAllShow();
    this.getTotalPages();
    this.getPageData(1);
    this.router.navigate(['all']);
  }
}
