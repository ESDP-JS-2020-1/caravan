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

When('нажимаю на кнопку {string}', btnName => {
  I.click(btnName, '#btn');
});

When('я вижу текст {string}', text => {
  I.waitForText(text);
});

When('я залогинен как администратор:', table => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click("Login", '#btn');

  I.waitForText('Вы успешно вошли, как Some market');
});

When('я нахожусь на корневой странице', () => {
  I.amOnPage('/');
});

When('я нажму на иконку юзера {string}', btnName => {
  I.click(btnName);
});

When('я нажму на кнопку {string}', btnName => {
  I.click(btnName);
});

When('я попадаю на страницу со списком пользователей', () => {
  I.amOnPage('/users');
});

When('если я нажму на кнопку {string}', btnName => {
  I.click(btnName);
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

When('нажимаю на кнопку  {string}', btnName => {
  I.click(btnName);
});

When('я вижу текст после добавления {string}', text => {
  I.waitForText(text);
});


Given('я залогинен как администратор:', table => {
  I.amOnPage('/login');

  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1]);
  });

  I.click("Login", '#btn');

  I.waitForText('Вы успешно вошли, как Some market');
});

When('я нахожусь на корневой странице', () => {
  I.amOnPage('/');
});

When('я нажму на иконку юзера {string}', btnName => {
  I.click(btnName);
});

When('я нажму на кнопку {string}', btnName => {
  I.click(btnName);
});


When('я попадаю на страницу добавления продукта', () => {
  I.amOnPage('/product/add');
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

When('если я нажму на кнопку {string}', btnName => {
  I.click(btnName);
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

  I.click("Login", '#btn');

  I.waitForText('Вы успешно вошли, как Some market');
  I.wait(1)
});

When('я нахожусь на главной странице', () => {
  I.amOnPage('/');
  I.wait(1)
});

When('я нажму на кнопку {string}', btnName => {
  I.click(btnName);
  I.wait(3)
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

  I.click("Login", '#btn');

  I.waitForText('Вы успешно вошли, как Some market');
});

When('я нахожусь на корневой странице', () => {
  I.amOnPage('/');
});

When('я нажму на кнопку {string}', btnName => {
  I.click(btnName);
});

Then('я попадаю на страницу списка продуктов', () => {
  I.amOnPage('/products');
});
















