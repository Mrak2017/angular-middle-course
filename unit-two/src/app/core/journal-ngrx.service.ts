import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, switchMap, take } from 'rxjs/operators';
import { JournalBackendMockService } from 'src/app/core/journal-backend-mock.service';
import { JournalService } from 'src/app/core/journal-service';
import { JournalEntity } from 'src/app/model/core/journal-entity.model';
import { JournalFilterItem } from 'src/app/model/core/journal-filter-item';
import { JournalResult } from 'src/app/model/core/journal-result.model';
import {
  BaseJournalActionTypes,
  SetFiltersAction,
  SetForceReloadAction,
  SetPageAction,
  SetPageSizeAction,
  SetSearchAction,
} from 'src/app/store/journal.actions';
import { StoreService } from 'src/app/store/store.service';

@Injectable()
export class JournalNgrxService implements JournalService {

  constructor(private storeService: StoreService, private backend: JournalBackendMockService) {
    this.storeService.getState().pipe(
      map(({ journalInfo, search, page, pageSize, filters, forceReload }) => ({
        journalInfo,
        search,
        page,
        pageSize,
        filters,
        forceReload,
      })),
      distinctUntilChanged((a, b) => !!b.forceReload || JSON.stringify(a) === JSON.stringify(b)),
      debounceTime(0),
      map(state => ({
        journalId: state.journalInfo.id,
        search: state.search,
        page: state.page,
        pageSize: state.pageSize,
        filters: state.filters,
      })),
      switchMap(request => this.backend.getResult(request)),
      map(value => ({ type: BaseJournalActionTypes.SetResult, payload: value })),
    ).subscribe(action => this.storeService.dispatch(action));
  }

  getJournalInfo(): Observable<JournalEntity> {
    return this.storeService.getState().pipe(pluck('journalInfo'));
  }

  getPageSize(): Observable<number> {
    return this.storeService.getState().pipe(pluck('pageSize'));
  }

  getResult(): Observable<JournalResult> {
    return this.storeService.getState().pipe(pluck('result'));
  }

  initJournal(journalId: string) {
    this.backend.getJournalInfo(journalId)
        .pipe(
          take(1),
          map(value => ({ type: BaseJournalActionTypes.SetJournalInfo, payload: value })),
        )
        .toPromise()
        .then(action => this.storeService.dispatch(action));
  }

  refreshJournal() {
    const action: SetForceReloadAction = { type: BaseJournalActionTypes.SetForceReload };
    this.storeService.dispatch(action);
  }

  setFilters(value: JournalFilterItem[]) {
    const action: SetFiltersAction = { type: BaseJournalActionTypes.SetFilters, payload: value };
    this.storeService.dispatch(action);
  }

  setPage(value: number) {
    const action: SetPageAction = { type: BaseJournalActionTypes.SetPage, payload: value };
    this.storeService.dispatch(action);
  }

  setPageSize(value: number) {
    const action: SetPageSizeAction = { type: BaseJournalActionTypes.SetPageSize, payload: value };
    this.storeService.dispatch(action);
  }

  setSearch(value: string) {
    const action: SetSearchAction = { type: BaseJournalActionTypes.SetSearch, payload: value };
    this.storeService.dispatch(action);
  }

}
