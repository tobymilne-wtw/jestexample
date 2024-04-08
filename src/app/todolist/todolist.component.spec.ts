import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TodolistComponent } from './todolist.component';
import { AppState } from '../../store/store';
import { TodoActions } from '../../store/action';


const initialState: AppState = {todo: {todos:[
    { id: 1, description: 'description 1', completed: false },
], loading: false, error: 'Some error'}};

describe('TodoListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodolistComponent],
      providers: [provideMockStore({initialState})]
    }).compileComponents();
  });

  test('create the component', () => {
    const fixture = TestBed.createComponent(TodolistComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('render correctly', () => {
    const fixture = TestBed.createComponent(TodolistComponent);
    fixture.detectChanges();
   
    expect(fixture).toMatchSnapshot();
  });

  test('dispatch load action on init', () => {

    const action = TodoActions.loadTodos();

    const fixture = TestBed.createComponent(TodolistComponent);

    const dispatchSpy = jest.spyOn(fixture.componentInstance.store, 'dispatch');

    fixture.detectChanges();
   
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  test('dispatch add action on add', () => {

    const action = TodoActions.addTodo({ todo: { id: 1, description: 'description 1', completed: false } });

    const fixture = TestBed.createComponent(TodolistComponent);

    const dispatchSpy = jest.spyOn(fixture.componentInstance.store, 'dispatch');

    fixture.detectChanges();
    fixture.componentInstance.addTodo(1);
   
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});