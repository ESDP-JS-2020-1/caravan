#language:ru

Функционал: Добавление заявки администратором

  @removeGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123 |
      | password | 12345 |
    И я нахожусь на корневой странице
    И я нажму на иконку юзера "menu"
    И нажимаю на кнопку "Группы"
    То я попадаю на страницу со списком групп
    И нажимаю на кнопку "#name1"
    И я нажму на кнопку "Удалить группу"
    И я нажму на кнопку "Да"
