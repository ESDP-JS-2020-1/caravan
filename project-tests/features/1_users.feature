#language:ru

Функционал: Монипуляции пользователями
  Как администратор
  Я хлчу иметь возможность удалять, редактировать и добавлять пользователей

  @login
  Сценарий:
    Допустим я нахожусь на странице логина
    Если я заполняю поля формы:
      | username | 123   |
      | password | 12345 |
    И нажимаю на кнопку "#btn2"
    То я вижу текст "Вы успешно вошли, как Some market"

  @addUser
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И нахожусь на странице добавления пользователя
    То я заполняю поля формы добавления:
      | #username    | someUsername  |
      | #password    | 12345         |
      | #displayName | Some username |
      | #phone       | +99612412412  |
    И выбираю роль пользователя "market"
    И я заполняю поля формы для названия компании и адреса :
      | #companyName | Some company |
      | #address     | 3121213213   |
    И я нажму на кнопку "Добавить в группы"
    И я нажму на кнопку "Select country"
    И я нажму на кнопку "Добавить"
    То я вижу текст после добавления "Пользователь успешно добавлен"


  @addUserCourier
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И нахожусь на странице добавления пользователя
    То я заполняю поля формы добавления:
      | #username    | someUsername2 |
      | #password    | 12345         |
      | #displayName | Some username |
      | #phone       | +99612412412  |
    И выбираю роль пользователя "courier"
    И я заполняю поля формы для названия компании и адреса :
      | #carName   | Some company |
      | #carVolume | 3121213213   |
    И я нажму на кнопку "Наличие холодильника"
    И я нажму на кнопку "Добавить в группы"
    И я нажму на кнопку "Select country"
    И я нажму на кнопку "Добавить"
    То я вижу текст после добавления "Пользователь успешно добавлен"


  @editUser
  Сценарий:
    Допустим я зарегестрирован как администратор
      | username | 123   |
      | password | 12345 |
    И я нахожусь на главной странице
    И я нажму на кнопку "menu"
    И я нажму на кнопку "Пользователи"
    И я попадаю на страницу со списком пользователей
    И я нажму на кнопку "add to favorites"
    И заполняю поля формы:
      | #password    | 12345 |
      | #displayName | Admin |
    И нажимаю на кнопку "Редактировать"
    И я попадаю на страницу со списком пользователей


  @removeUser
  Сценарий:
    Допустим я зарегестрирован как администратор
      | username | 123   |
      | password | 12345 |
    И я нахожусь на главной странице
    И я нажму на кнопку "menu"
    И я нажму на кнопку "Пользователи"
    И я попадаю на страницу со списком пользователей
    И нажимаю на кнопку "#edit"
    Если я нажму на кнопку "#deleteUser"

    И я нажму на кнопку "#yes"
    То я вижу текст после удаления "Пользователь успешно удален"