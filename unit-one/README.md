# Задание №1

Цель: Дописать приложение, которое будет уметь получать данные из JournalBackendMockService, согласно интерфейсов находящися в папке src/app/model/core/

В приложении должно быть:
 - представление данных в виде таблицы
 - возможность отфильтровать данные по одному из полей (например фильтр с выпадающим списком - поле filters в JournalRequest)
 - возможность поиска по одному или нескольким полям (строковое поле поиска - поле search в JournalRequest)
 - пейджинация (номер страницы - поле page в JournalRequest, количество записей на странице - поле pageSize в JournalRequest)
 - (* по желанию) сортировка
 
 Возвращаемые данные можно посмотреть в сервисе JournalBackendMockService
 
 Пример реализации в ветке - unit-one_example (https://github.com/Mrak2017/angular-middle-course/tree/unit-one_example/unit-one)
