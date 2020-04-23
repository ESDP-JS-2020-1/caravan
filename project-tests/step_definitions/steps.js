const { I } = inject();

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

Then('я вижу текст {string}', text => {
 I.waitForText(text);
});
