#language:ru

Функционал: Добавление пользователя администратором

  @addUser
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123 |
      | password | 12345 |
    Допустим я нахожусь на корневой странице
    И я нажму на иконку юзера "menu"
    И я нажму на кнопку "Пользователи"
    То я попадаю на страницу со списком пользователей
    И я нажму на кнопку "Добавить пользователя"
    То я попаду на страницу добавления нового пользователя
    То я заполняю поля формы добавления:
      | #username | someUsername |
      | #password | 12345 |
      | #displayName | Some username |
      | #phone | +99612412412 |
      | #comment | I dont know |
    И выбираю роль пользователя "market"
    И я заполняю поля формы для названия компании и адреса :
      | #companyName | Some company |
      | #address | 3121213213 |
    И я нажму на кнопку "Добавить"
    То я вижу текст после добавления "Пользователь успешно добавлен"
