#language:ru

Функционал: Редактирование заявки администратором

  @editRequest
  Сценарий:
    Допустим я зарегистрирован как администратор:
      | username | 123 |
      | password | 12345 |
    И нахожусь на странице списка заявок
    И нажимаю на кнопку "edit"
    И нажимаю на кнопку "check"
    И нажимаю на кнопку "Clear"
    И заполняю поля формы:
      | #free-solo-demo0 | Прод |
    И нажимаю на кнопку "#free-solo-demo0-option-2"
    И заполняю поля формы:
      | #amount0 | 5 |
    И нажимаю на кнопку "#Edit"
    Тогда я вижу текст "Заявка успешно отредактирована"
