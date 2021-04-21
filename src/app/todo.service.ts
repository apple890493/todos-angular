//CRUD methods
import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosUrl = 'http://localhost:3000/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    // this.test();
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
    //observabl subject
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  editTodo(todo: Todo): Observable<any> {
    const id = todo.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http.put(url, todo, this.httpOptions).pipe(
      tap((oo) => {
        console.log(oo);
      })
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const id = todo.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  checkTodoToggle(todo: Todo): Observable<any> {
    const id = todo.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http.put(url, todo, this.httpOptions);
  }
}

// private datalist: Todo[];

// private abc():Todo[]{
//  return this.datalist.filter(x=>x.isDone);
// }

// test() {
//   this.http.get<Todo[]>(this.todosUrl).subscribe((x) => {
//     this.datalist = x;
//   });
// }
