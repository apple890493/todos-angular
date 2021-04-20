//CRUD methods
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    // this.test();
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

  getTodos(): Observable<Todo[]> {
    // if (query === 'completed') {
    //   console.log('yes');
    //   return datalist.pipe((response: any) => response.json()).
    // }
    return this.http.get<Todo[]>(this.todosUrl);;
    //observabl subject
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  editTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const id = todo.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  checkTodoToggle(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }
}
