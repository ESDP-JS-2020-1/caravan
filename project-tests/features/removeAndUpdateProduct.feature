#language:ru

Функционал: Редактирование и удаление продукта администратором

  @editAndRemoveProduct
  Сценарий:
    Допустим я вошел как администратор:
      | username | 123   |
      | password | 12345 |
    И я нахожусь на странице списка продуктов
    И я кнопку нажимаю на редактирования продукта "edit"
    Если я заполняю  поля формы:
      | name   | 123   |
      | amount | 12345 |
      | price  | 123   |
    И нажимаю на кнопку "Edit"
    И нажимаю на кнопку "#yes"
    То я вижу текст после изминений "Продукт успешно изменён"

    И я нахожусь на странице списка продуктов
    И я кнопку нажимаю на редактирования продукта "edit"
    И нажимаю на кнопку "delete"
    И нажимаю на кнопку "#yes"
    То я вижу текст после изминений "Продукт успешно удален"