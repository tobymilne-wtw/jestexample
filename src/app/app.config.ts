import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects, appStore } from '../store/store';
import { ToDoService } from '../store/service';
import { TodolistComponent } from './todolist/todolist.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideStore(appStore),
    provideEffects(appEffects),
    ToDoService,
  TodolistComponent]
};
