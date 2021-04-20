import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id: 1, title: 'Learn Angular', isDone: false },
      { id: 2, title: 'Angular Cli', isDone: false },
      { id: 3, title: 'Init project', isDone: false },
      { id: 4, title: 'Use database', isDone: false },
      { id: 5, title: 'Add pagination', isDone: false },
      { id: 6, title: 'test 1', isDone: false },
      { id: 7, title: 'test 2', isDone: false },
      { id: 8, title: 'test 3', isDone: false },
    ];
    return { todos };
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  }

  constructor() {}
}
