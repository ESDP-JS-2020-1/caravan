#language:ru

Функционал: Добавление пользователей в группу

  @addUserForGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123 |
      | password | 12345 |
    И я нахожусь на корневой странице
    И я нажму на иконку юзера "menu"
    И нажимаю на кнопку "Группы"
    То я попадаю на страницу групп
    И нажимаю на кнопку "Просмотреть группу"
    И нажимаю на кнопку "Добавить в группу"
    То я попадаю на страницу групп