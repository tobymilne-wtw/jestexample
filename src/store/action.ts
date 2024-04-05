import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

const loadTodos = createAction('[Todo] Load Todos');
const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[]; }>());
const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string; }>());
const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo; }>());
const updateTodo = createAction('[Todo] Update Todo', props<{ todo: Todo; }>());
const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string; }>());

export const TodoActions = {    
    loadTodos,
    loadTodosSuccess,
    loadTodosFailure,
    addTodo,
    updateTodo,
    deleteTodo
};
