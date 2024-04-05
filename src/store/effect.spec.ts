import {cold, hot, time} from 'jest-marbles';
import { TodoEffects } from './effect';
import { Actions } from '@ngrx/effects';
import { ToDoService } from './service';
import { TodoActions } from './action';
import { of } from 'rxjs';

describe('store/effect', () => {
    it('should emit load success if service returns ok', () => {

        const todos = [ { id: 1, description: 'test', completed: false }]

        const service =  new ToDoService();

        service.getAll = jest.fn(() => cold('-s|', { s: todos }));
        
        const actions = hot('-a', { a:  TodoActions.loadTodos });

        const expected = cold('--b', { b: TodoActions.loadTodosSuccess({ todos: todos })});

        const addTodo = new TodoEffects(new Actions(actions),service);

        expect(addTodo.loadTodos$).toBeObservable(expected);
        
    });

    it('should emit load success twice if actioned twice', () => {

        const todos = [ { id: 1, description: 'test', completed: false }]

        const service =  new ToDoService();

        service.getAll = jest.fn(() => cold('-s|', { s: todos }));
        
        const actions = hot('-a-a', { a:  TodoActions.loadTodos });

        const expected = cold('--b-b', { b: TodoActions.loadTodosSuccess({ todos: todos })});

        const addTodo = new TodoEffects(new Actions(actions),service);

        expect(addTodo.loadTodos$).toBeObservable(expected);
        
    });

    it('should emit load success twice if actioned twice grouped', () => {

        const todos = [ { id: 1, description: 'test', completed: false }]

        const service =  new ToDoService();

        service.getAll = jest.fn(() => cold('-s|', { s: todos }));
        
        const actions = hot('-(aa)', { a:  TodoActions.loadTodos });

        const expected = cold('--(bb)', { b: TodoActions.loadTodosSuccess({ todos: todos })});

        const addTodo = new TodoEffects(new Actions(actions),service);

        expect(addTodo.loadTodos$).toBeObservable(expected);
        
    });

    it('should emit load failed if service returns error', () => {

        const service =  new ToDoService();

        const error = 'error';

        service.getAll = jest.fn(() => cold('-#|', { },{message: error}));
        
        const actions = hot('-a', { a:  TodoActions.loadTodos });

        const expected = cold('--b', { b: TodoActions.loadTodosFailure({ error: error })});

        const addTodo = new TodoEffects(new Actions(actions),service);

        expect(addTodo.loadTodos$).toBeObservable(expected);
        
    });
});