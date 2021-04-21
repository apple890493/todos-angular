import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return of('ttt').pipe(
      tap(console.log),
      switchMap(() => this.http.get<Todo[]>(this.REST_API_SERVER)),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
    //observabl subject
  }
}
