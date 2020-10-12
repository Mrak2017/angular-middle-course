import { Observable } from 'rxjs';
import { JournalEntity } from 'src/app/model/core/journal-entity.model';
import { JournalFilterItem } from 'src/app/model/core/journal-filter-item';
import { JournalResult } from 'src/app/model/core/journal-result.model';

export interface JournalService {
  initJournal(journalId: string);
  getResult(): Observable<JournalResult>;
  getJournalInfo(): Observable<JournalEntity>;
  getPageSize(): Observable<number>;
  setSearch(value: string);
  setPage(value: number);
  setPageSize(value: number);
  setFilters(value: JournalFilterItem[]);
  refreshJournal();
}
