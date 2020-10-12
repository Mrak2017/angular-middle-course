import { JournalEntity } from 'src/app/model/core/journal-entity.model';
import { JournalFilterItem } from 'src/app/model/core/journal-filter-item';
import { JournalResult } from 'src/app/model/core/journal-result.model';

export interface JournalState {
  result: JournalResult;
  journalInfo: JournalEntity;
  search: string;
  page: number;
  pageSize: number;
  filters: JournalFilterItem[];
  forceReload: boolean;
}

export const DefaultJournalState: JournalState = {
  filters: [],
  journalInfo: undefined,
  page: 1,
  pageSize: 10,
  search: '',
  result: undefined,
  forceReload: false,
};
