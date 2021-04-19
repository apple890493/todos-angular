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
      { id: 2, title: 'Angular Cli', isDone: true },
      { id: 3, title: 'Init project', isDone: false },
      { id: 4, title: 'Use database', isDone: true },
      { id: 5, title: 'Add pagination', isDone: false },
    ];
    return { todos };
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? todos.length + 1 : 1;
  }

  constructor() {}
}
