import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';

import { TodoService } from './todo.service';
// import { AppRoutingModule } from './app-routing.module'; //bug
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: ':status', component: TodoComponent },
  { path: '**', redirectTo: '/all' },
];

@NgModule({
  declarations: [AppComponent, TodoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    // AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
