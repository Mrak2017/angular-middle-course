import { BaseJournalActions, BaseJournalActionTypes } from 'src/app/store/journal.actions';
import { JournalState } from 'src/app/store/journal.state';
import { Reducer } from 'src/app/store/store.service';

export function getBaseReducer(): Reducer {
  return (state: JournalState, action: BaseJournalActions) => baseReducer(action, state);
}

function baseReducer(action: BaseJournalActions, state: JournalState): JournalState {
  switch (action.type) {

    case BaseJournalActionTypes.SetFilters:
      return { ...state, page: 1, filters: action.payload };

    case BaseJournalActionTypes.SetPage:
      return { ...state, page: action.payload };

    case BaseJournalActionTypes.SetSearch:
      return { ...state, page: 1, search: action.payload };

    case BaseJournalActionTypes.SetPageSize:
      return { ...state, page: 1, pageSize: action.payload };

    case BaseJournalActionTypes.SetJournalInfo:
      return { ...state, journalInfo: action.payload };

    case BaseJournalActionTypes.SetResult:
      return { ...state, result: action.payload, forceReload: false };

    case BaseJournalActionTypes.SetForceReload:
      return { ...state, forceReload: true };

    default:
      return state;
  }
}
