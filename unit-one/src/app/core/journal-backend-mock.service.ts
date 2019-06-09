import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JournalEntity } from 'src/app/model/core/journal-entity.model';
import { FILTER_CODE_QUESTION_ANSWERS_COUNT, JournalFilterItem } from 'src/app/model/core/journal-filter-item';
import { JournalItem } from 'src/app/model/core/journal-item.model';
import { JournalRequest } from 'src/app/model/core/journal-request.model';
import { JournalResult } from 'src/app/model/core/journal-result.model';
import { QuestionJournalItem } from 'src/app/model/question-journal-item.model';

export const QUESTIONS_JOURNAL_ID = 'questions';

const QUESTIONS: QuestionJournalItem[] = [
  { id: '1', name: 'Сколько было назгулов?', answersCount: 4 },
  { id: '2', name: 'Какой ответ на вопрос жизни вселенной и всего остального?', answersCount: 4 },
  { id: '3', name: 'Кто написал картину "Мона Лиза"?', answersCount: 4 },
  { id: '4', name: 'Какое первое правило бойцовского клуба?', answersCount: 2 },
  { id: '5', name: 'Как звали наставника главного героя в фильме "Матрица"?', answersCount: 2 },
  { id: '6', name: 'Что пытался вернуть герой фильма "Большой Лебовски"?', answersCount: 3 },
  { id: '7', name: 'Какова температура горения бумаги? Такое же название носит роман Рэя Бредбери', answersCount: 4 },
  { id: '8', name: 'С каким русским царем Иван Васильевич поменялся профессией?', answersCount: 3 },
  { id: '9', name: 'Как звали главного злодея в оригинальной трилогии "Звездные войны"?', answersCount: 2 },
  { id: '10', name: 'Как назывался парк, в котором поселили клонированных динозавров?', answersCount: 2 },
];

const JOURNALS = [
  { id: QUESTIONS_JOURNAL_ID, name: 'Вопросы', defaultPageSize: 15 },
];

@Injectable()
export class JournalBackendMockService {

  constructor() {
  }

  getJournalInfo(id: string): Observable<JournalEntity> {
    return of(JOURNALS.filter(j => j.id === id)[0]);
  }

  getResult(request: JournalRequest): Observable<JournalResult> {
    const searchString = !!request.search ? request.search.toLocaleLowerCase() : '';

    let entityArray = [];
    switch (request.journalId) {

      case QUESTIONS_JOURNAL_ID:
        const searchedQuestion = this.applySearch(QUESTIONS, searchString, 'name');
        entityArray = this.applyQuestionFilters(searchedQuestion as QuestionJournalItem[], request.filters);
        break;

      default:
        throw new Error('Unknown journal id ' + request.journalId);
    }

    const beginIndex = (request.page - 1) * request.pageSize;
    const endIndex = request.page * request.pageSize;
    const resultArray = entityArray.slice(beginIndex, endIndex);

    return of({ total: entityArray.length, items: resultArray });
  }

  private applySearch(arr: JournalItem[], searchString: string, fieldName: string): JournalItem[] {
    return !!searchString ? arr.filter(e =>  e[fieldName].toLocaleLowerCase().indexOf(searchString) > -1)
                          : arr;
  }

  private applyQuestionFilters(arr: QuestionJournalItem[], filters: JournalFilterItem[]): JournalItem[] {
    let result = arr.slice();

    const taskFilter: JournalFilterItem = filters.filter(item => item.code === FILTER_CODE_QUESTION_ANSWERS_COUNT)[0];
    if (taskFilter !== undefined && taskFilter.value !== undefined) {
      result = result.filter(entity => entity.answersCount === parseInt(taskFilter.value, 10));
    }

    return result;
  }

}
