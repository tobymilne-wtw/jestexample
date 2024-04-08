import {cold, hot } from 'jest-marbles';
import { TodoEffects } from './effect';
import { Actions } from '@ngrx/effects';
import { ToDoService } from './service';
import { TodoActions } from './action';

describe('store/effect', () => {
    test('emit load success if service returns ok', () => {

        const todos = [ { id: 1, description: 'test', completed: false }]

        const service =  new ToDoService();

        service.getAll = jest.fn(() => cold('-s|', { s: todos }));
        
        const actionStream = hot('-a', { a:  TodoActions.loadTodos });

        const effectOutput = cold('--b', { b: TodoActions.loadTodosSuccess({ todos: todos })});

        const effects = new TodoEffects(new Actions(actionStream),service);

        expect(effects.loadTodos).toBeObservable(effectOutput);
        
    });

    test('emit load success twice if actioned twice', () => {

        const todos = [ { id: 1, description: 'test', completed: false }]

        const service =  new ToDoService();

        service.getAll = jest.fn(() => cold('-s|', { s: todos }));
        
        const actionStream = hot('-a-a', { a:  TodoActions.loadTodos });

        const effectOutput = cold('--b-b', { b: TodoActions.loadTodosSuccess({ todos: todos })});

        const effects = new TodoEffects(new Actions(actionStream),service);

        expect(effects.loadTodos).toBeObservable(effectOutput);
        
    });

    test('emit load success twice if actioned twice grouped', () => {

        const todos = [ { id: 1, description: 'test', completed: false }]

        const service =  new ToDoService();

        service.getAll = jest.fn(() => cold('-s|', { s: todos }));
        
        const actionStream = hot('-(aa)', { a:  TodoActions.loadTodos });

        const effectOutput = cold('--(bb)', { b: TodoActions.loadTodosSuccess({ todos: todos })});

        const effects = new TodoEffects(new Actions(actionStream),service);

        expect(effects.loadTodos).toBeObservable(effectOutput);
        
    });

    test('emit load failed if service returns error', () => {

        const service =  new ToDoService();

        const error = 'error';

        service.getAll = jest.fn(() => cold('-#|', { },{message: error}));
        
        const actionStream = hot('-a', { a:  TodoActions.loadTodos });

        const effectOutput = cold('--b', { b: TodoActions.loadTodosFailure({ error: error })});

        const effects = new TodoEffects(new Actions(actionStream),service);

        expect(effects.loadTodos).toBeObservable(effectOutput);
        
    });
});