const {I} = inject();

Given('я нахожусь на странице логина', () => {
  I.amOnPage('/login');
});

When('я заполняю поля формы:', table => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  })
});

When('я вижу текст {string}', text => {
  I.waitForText(text);
});

When('я попадаю на страницу со списком пользователей', () => {
  I.amOnPage('/users');
});

When('я попадаю на страницу со списком группы', () => {
  I.amOnPage('/groups');
});

When('я попаду на страницу добавления нового пользователя', () => {
  I.amOnPage('/users/new');
});

When('я заполняю поля формы добавления:', table => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });
});

When('выбираю роль пользователя {string}', role => {
  I.click("#role");
  I.click(`#${role}Option`);
});

When('я заполняю поля формы для названия компании и адреса :', table => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });
});

When('я вижу текст после добавления {string}', text => {
  I.waitForText(text);
});

When('я нажму на иконку юзера {string}', btnName => {
  I.click(btnName);
});

When('я попадаю на страницу добавления продукта', () => {
  I.amOnPage('/product/add');
});

When('я заполняю поля формы добавления', table => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });
});

Then('я попадаю на страницу показа продуктов', () => {
  I.amOnPage('/products')
});


Given('я зарегестрирован как администратор', table => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click("#btn2");

  I.waitForText('Вы успешно вошли, как Some market');
  I.wait(1)
});

When('я нахожусь на главной странице', () => {
  I.amOnPage('/');
});

When('я вижу текст после удаления {string}', text => {
  I.waitForText(text);
});


Given('я залогинен как администратор:', table => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click("#btn2");

  I.waitForText('Вы успешно вошли, как Some market');
});

Then('я попадаю на страницу списка продуктов', () => {
  I.amOnPage('/products');
});

Given('я залогинен как магазин:', (table) => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click("Sign in", '#btn');

  I.waitForText('Вы успешно вошли, как Игнат');
});

When('я нахожусь на корневой странице', () => {
  I.amOnPage('/');
});

When('я попадаю на страницу создания заявки', () => {
  I.amOnPage('/requests/new');
});

When('я кликаю на кнопку {string}', (btnName) => {
  I.click(btnName, '#panel0bh-header');
});

When('я заполняю поля формы добавления', table => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });
});

When('я нажму на кнопку {string}', btnName => {
  I.click(btnName);
});

Then('я вижу сообщение {string}', () => {
  I.waitForText('Заявка создана успешно');
});


Given('я вошел как администратор:', table => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click('#btn2');
  I.waitForText('Вы успешно вошли, как Some market');
});

When('я нахожусь на странице списка продуктов',() => {
  I.amOnPage('/products');
});

When('я нахожусь на странице списка заявок',() => {
  I.amOnPage('/requests');
});

When('я кнопку нажимаю на редактирования продукта {string}', btnName => {
  I.click(btnName);
});

When('я заполняю  поля формы:', (table) => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });
});

When('нажимаю на кнопку {string}',(btnName) => {
  I.click(btnName);
});

Then('я вижу текст после изминений {string}', (text) => {
  I.waitForText(text);
});

Given('я зарегистрирован как администратор:', table => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click("#btn2");
  I.waitForText('Вы успешно вошли, как Some market');

});

When('нахожусь на странице списка заявок', () => {
  I.amOnPage('/requests');
});

When('заполняю поля формы:', (table) => {
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });
});
