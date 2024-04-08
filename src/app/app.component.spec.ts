import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TodolistComponent } from './todolist/todolist.component';
import { AppState } from '../store/store';


const initialState: AppState = {todo: {todos:[], loading: false, error: ''}};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TodolistComponent],
      providers: [provideMockStore({initialState})]
    }).compileComponents();
  });

  test('create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`have the 'testsite' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('testsite');
  });

  test.skip('render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, testsite');
  });

  test('render correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
   
    expect(fixture).toMatchSnapshot();
  });
});
