#language:ru

Функционал: Удаление пользователя администратором

  @removeUser
  Сценарий:
    Допустим я зарегестрирован как администратор
      | username | 123 |
      | password | 12345 |
    И я нахожусь на главной странице
    И я нажму на кнопку "menu"
    И я нажму на кнопку "Пользователи"
    И я попадаю на страницу со списком пользователей
    И я нажму на кнопку "#edit"
    Если я нажму на кнопку "#deleteUser"

    И я нажму на кнопку "#yes"
    То я вижу текст после удаления "Пользователь успешно удален"