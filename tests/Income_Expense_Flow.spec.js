import {test, expect} from '@playwright/test';

test('Income & Expense flow', async ({page}) => {
    await page.goto('https://initial-inquiry-pjs4.bolt.host/login');
    await expect(page.locator('h2')).toHaveText('CPWM');

    await page.locator('#email').fill(process.env.EMAIL_OR_USERNAME);
    await page.locator('#password').fill(process.env.PASSWORD);
     const captchaText = await page.locator('label').filter({
  hasText: 'Captcha'
}).textContent();

const match = captchaText.match(/(\d+)\s*([+\-*/])\s*(\d+)/);

if (match) {
  const num1 = parseInt(match[1]);
  const operator = match[2];
  const num2 = parseInt(match[3]);

  let result;

  switch(operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
        throw new Error('invalid captcha. Please Try again');
  }

  await page.locator('input[placeholder="Answer"]').fill(
    result.toString()
  );
}
    await page.getByText('Login').click();
    await expect(page).toHaveURL(/dashboard/);

    await page.locator('(//span[text()="Income & Expense"])[2]').click();
    await expect(page).toHaveURL(/income-expense/);

    // Add Income
    await page.getByText('Add Income').click();
    await page.locator('//input[@placeholder="0"]').fill('1000');
    await page.locator('select').selectOption('Bonus');
    await expect(
      page.locator('select')
    ).toHaveValue('Bonus');
    await page.locator('(//input[contains(@class,"px-3")])[2]').fill('Bonus from KPI')
    await expect(
      page.locator('(//input[contains(@class,"px-3")])[2]')
    ).toHaveValue('Bonus from KPI');
    await page.locator('(//input[contains(@class,"px-3")])[3]').fill('2026-01-30');
    await page.locator('//button[text()="Add"]').click();

    // Add Expense
    await page.getByText('Add Expense').click();
    await page.locator('//input[@placeholder="0"]').fill('5000');
    await page.locator('select').selectOption('Transport');
    await expect(
      page.locator('select')
    ).toHaveValue('Transport');
    await page.locator('//input[@placeholder="Optional note"]').fill('Transportation cost for client meeting');
    await expect(
      page.locator('//input[@placeholder="Optional note"]')
    ).toHaveValue('Transportation cost for client meeting');
    await page.locator('(//input[contains(@class,"px-3")])[3]').fill('2026-03-29');
    await page.locator('//button[text()="Add"]').click();

    // Manage Categories Income
    await page.getByText('Manage Categories').click();
    await page.locator('//input[@placeholder="Enter name"]').fill('Side Job');
    await expect(
      page.locator('//input[@placeholder="Enter name"]')
    ).toHaveValue('Side Job');
    await page.locator('//button[text()="Income"]').click();
    await page.locator('//button[text()="Add Category"]').click();

    // Manage Categories Expense
    await page.getByText('Manage Categories').click();
    await page.locator('//input[@placeholder="Enter name"]').fill('Netflix Subscription');
    await expect(
      page.locator('//input[@placeholder="Enter name"]')
    ).toHaveValue('Netflix Subscription');
    await page.locator('//button[text()="Expense"]').click();
    await page.locator('//button[text()="Add Category"]').click();




    await page.pause();
});