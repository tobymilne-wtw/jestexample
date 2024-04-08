import { TodoActions } from './action';
import { todoReducer,initialState } from './reducer';

describe('store/reducer', () => {
    test('Load action sets loading state', () => {

       const start = initialState 
       const action = TodoActions.loadTodos();

       const state = todoReducer(start, action);

       expect(state.loading).toBe(true);
        
    });

    test('LoadFailure action resets loading state', () => {

       const start = initialState
       const action = TodoActions.loadTodosFailure({ error: 'error' });

       const state = todoReducer(start, action);

       expect(state.loading).toBe(false);
        
    });
   

    test('LoadFailure action sets error message', () => {

        const start = initialState
        const action = TodoActions.loadTodosFailure({ error: 'error' });
 
        const state = todoReducer(start, action);
 
        expect(state.error).toBe('error');
         
     });
});