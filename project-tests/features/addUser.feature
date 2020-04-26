#language:ru

Функционал: Добавление пользователя администратором


  Сценарий:
    Допустим я залогинен как администратор:
      | Username | 123 |
      | Password | 12345 |
    Допустим я нахожусь на корневой странице
    И я нажму на иконку юзера "#user"
    И я нажму на кнопку "Список пользователей"
    То я попадаю на страницу со списком пользователей
    И если я нажму на кнопку "Добавить пользователя"
    То я попаду на страницу добавления нового пользователя
    То я заполняю поля формы добавления:
      | #username | someUsername |
      | #password | 12345 |
      | #displayName | Some username |
      | #phone | +99612412412 |
    И выбираю роль пользователя "market"
    И я заполняю поля формы для названия компании и адреса :
      | #companyName | Some company |
      | #address | 3121213213 |
    И нажимаю на кнопку  "Добавить"
    То я вижу текст после добавления "Пользователь добавлен успешно"
