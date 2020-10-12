import { JournalEntity } from 'src/app/model/core/journal-entity.model';
import { JournalFilterItem } from 'src/app/model/core/journal-filter-item';
import { JournalResult } from 'src/app/model/core/journal-result.model';
import { Action } from 'src/app/store/store.service';

export const enum BaseJournalActionTypes {
  InitReducers = '[BaseJournalActionTypes] Init reducers and state',
  SetPageSize = '[BaseJournalActionTypes] Set page size for journal',
  SetJournalInfo = '[BaseJournalActionTypes] Set journal info',
  SetResult = '[BaseJournalActionTypes] Set result data for journal',
  SetFilters = '[BaseJournalActionTypes] Set filters for journal',
  SetPage = '[BaseJournalActionTypes] Set page for journal',
  SetSearch = '[BaseJournalActionTypes] Set search for journal',
  SetForceReload = '[BaseJournalActionTypes] Set flag to reload data for journal',
}

export interface InitReducers extends Action {
  readonly type: BaseJournalActionTypes.InitReducers;
}

export interface SetPageSizeAction extends Action {
  readonly type: BaseJournalActionTypes.SetPageSize;
  readonly payload: number;
}

export interface SetJournalInfoAction extends Action {
  readonly type: BaseJournalActionTypes.SetJournalInfo;
  readonly payload: JournalEntity;
}

export interface SetResultAction extends Action {
  readonly type: BaseJournalActionTypes.SetResult;
  readonly payload: JournalResult;
}

export interface SetFiltersAction extends Action {
  readonly type: BaseJournalActionTypes.SetFilters;
  readonly payload: JournalFilterItem[];
}

export interface SetPageAction extends Action {
  readonly type: BaseJournalActionTypes.SetPage;
  readonly payload: number;
}

export interface SetSearchAction extends Action {
  readonly type: BaseJournalActionTypes.SetSearch;
  readonly payload: string;
}

export interface SetForceReloadAction extends Action {
  readonly type: BaseJournalActionTypes.SetForceReload;
}

export type BaseJournalActions =
  | InitReducers
  | SetPageSizeAction
  | SetJournalInfoAction
  | SetResultAction
  | SetFiltersAction
  | SetPageAction
  | SetSearchAction
  | SetForceReloadAction
;
