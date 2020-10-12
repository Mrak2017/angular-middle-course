import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { BaseJournalActionTypes, InitReducers } from 'src/app/store/journal.actions';
import { getBaseReducer } from 'src/app/store/journal.reducer';
import { DefaultJournalState, JournalState } from 'src/app/store/journal.state';

export interface Action {
  type: string;
}

export type Reducer = (state: JournalState, action: Action) => JournalState;

const initReducersAction: InitReducers = { type: BaseJournalActionTypes.InitReducers };

@Injectable()
export class StoreService {

  private readonly state$: Observable<JournalState>;
  private readonly actions$: Subject<Action> = new Subject();

  constructor() {
    this.state$ = this.actions$
                      .asObservable()
                      .pipe(
                        startWith(initReducersAction),
                        scan<Action, JournalState>(getBaseReducer(), DefaultJournalState),
                      );
  }

  getState(): Observable<JournalState> {
    return this.state$;
  }

  dispatch(action: Action): void {
    this.actions$.next(action);
  }
}
