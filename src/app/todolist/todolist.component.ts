import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, OnInit } from '@angular/core';
import { Todo } from '../../store/todo.model';
import { AppState } from '../../store/store';
import { Store } from '@ngrx/store';
import { TodoActions } from '../../store/action';
import { todoSelector } from '../../store/selector';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodolistComponent implements OnInit {
  todos$: Signal<Todo[] | undefined>;
  isLoading$: Signal<boolean | undefined>;

  constructor(public store: Store<AppState>) {
    this.todos$ = toSignal(this.store.select(todoSelector)); // observable converted to signal
    this.isLoading$ = toSignal(this.store.select((state) => state.todo.loading));
  }

  ngOnInit() {
   this.loadTodos();
  }

  loadTodos() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(index: number) {
    const todo: Todo = { id: index, description: `description ${index}`, completed: false };
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  complete(todo: Todo) {
    this.store.dispatch(
      TodoActions.updateTodo({ todo: { ...todo, completed: true } })
    );
  }
 }


