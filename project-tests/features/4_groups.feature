#language:ru

Функционал: Монипуляции группами
  Как администратор
  Я хочу иметь возможность удалять, редактировать и добавлять группы
  И добавлять и удалять пользователей из групп

  @addGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И я нахожусь на странице групп
    И я нажму на кнопку "Добавить группу"
    И я попадаю на страницу добовление новой группы
    И заполняю поля формы:
      | #groupName | qweqwe |
    И я нажму на кнопку "addUser"
    И я нажму на кнопку "Добавить"
    Тогда я вижу текст "Группа успешно добавлена!"

  @addUserForGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И я нахожусь на странице групп
    И нажимаю на кнопку "Просмотреть группу"
    И нажимаю на кнопку "Добавить в группу"
    То я попадаю на страницу групп

  @deleteUserFromGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И я нахожусь на странице групп
    И нажимаю на кнопку "Просмотреть группу"
    И нажимаю на кнопку "Добавить в группу"
    И нажимаю на кнопку "Добавить в группу"
    И нажимаю на кнопку "#deleteUser1"
    То я попадаю на страницу групп

  @editGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И я нахожусь на странице групп
    И нажимаю на кнопку "Просмотреть группу"
    И я нажму на кнопку "Редактировать"
    То я заполняю поля формы добавления:
      | #groupName | something |
    И я нажму на кнопку "primary checkbox"
    И я нажму на кнопку "Редактировать"

  @removeGroup
  Сценарий:
    Допустим я залогинен как администратор:
      | username | 123   |
      | password | 12345 |
    И я нахожусь на странице групп
    И нажимаю на кнопку "#name1"
    И я нажму на кнопку "Удалить группу"
    И я нажму на кнопку "Да"

