import { todoSelector } from './selector';
import { AppState } from './store';

describe('store/selector', () => {

  
    const initialState: AppState = {
        todo: 
        {
            todos:[
                { id: 1, description: 'description 1', completed: false },
            ], 
            loading: false, 
            error: 'Some error'
        }
        
      };
      
      
    test('Todo selector gets todos', () => {
        const result = todoSelector.projector(initialState.todo);
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(1);
        
    });

  
});