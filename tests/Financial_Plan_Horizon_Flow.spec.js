import {test, expect} from '@playwright/test';

test('Transaction History flow', async ({page}) => {
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

    await page.locator('(//span[text()="Financial Plan Horizon"])[2]').click();
    await expect(page).toHaveURL(/financial-plan/);
    await page.getByText('New Plan').click();

    //Goal Name
    await page.locator('//input[@placeholder="e.g. My Retirement Fund"]').fill('Dream House');
    //Priority
    await page.locator('select').selectOption('High Priority');
    await expect(
      page.locator('select')
    ).toHaveValue('high');
    //Target Amount
    await page.locator('(//input[contains(@class,"rounded-lg")])[3]').fill('345000000000');
    await expect(
      page.locator('(//input[contains(@class,"rounded-lg")])[3]')
    ).toHaveValue('345000000000');
    //Current Savings
    await page.locator('(//input[contains(@class,"rounded-lg")])[4]').fill('300000000');
    await expect(
      page.locator('(//input[contains(@class,"rounded-lg")])[4]')
    ).toHaveValue('300000000');
    //Monthly Contribution(IDR)
    await page.locator('(//input[contains(@class,"rounded-lg")])[5]').fill('20000000');
    await expect(
      page.locator('(//input[contains(@class,"rounded-lg")])[5]')
    ).toHaveValue('20000000');
    //Expected Annual Return (%)
    await page.locator('(//input[contains(@class,"rounded-lg")])[6]').fill('100');
    await expect(
      page.locator('(//input[contains(@class,"rounded-lg")])[6]')
    ).toHaveValue('100');
    //Target Date
    await page.locator('(//input[contains(@class,"rounded-lg")])[7]').fill('2030-01-25');
    //Notes
    await page.locator('//textarea[@placeholder="Any additional notes about this goal..."]').fill('Dream House');
    await expect(
      page.locator('//textarea[@placeholder="Any additional notes about this goal..."]')
    ).toHaveValue('Dream House')
    await page.getByText('Create Plan').click();
    await page.getByText('Dream House').click();

    // EDIT
    await page.locator('(//button[contains(@class,"p-1.5")])[7]').click();
    await page.locator('//input[@placeholder="e.g. My Retirement Fund"]').clear();
    await page.getByPlaceholder('e.g. My Retirement Fund').fill('Dream Car');
    await expect(
      page.locator('//input[@placeholder="e.g. My Retirement Fund"]')
    ).toHaveValue('Dream Car');
    await page.getByPlaceholder('e.g. 500000000').clear();
    await page.getByPlaceholder('e.g. 500000000').fill('200000000');
    await expect(
      page.locator('//input[@placeholder="e.g. 500000000"]')
    ).toHaveValue('200000000');
    await page.locator('select').selectOption('Medium Priority');
    await expect(
      page.locator('select')
    ).toHaveValue('medium');
    await page.getByPlaceholder('e.g. 10000000').clear();
    await page.getByPlaceholder('e.g. 10000000').fill('15000000');
    await expect(
      page.locator('//input[@placeholder="e.g. 10000000"]')
    ).toHaveValue('15000000');
    await page.getByPlaceholder('e.g. 2000000').clear();
    await page.getByPlaceholder('e.g. 2000000').fill('10000000');
    await expect(
      page.locator('//input[@placeholder="e.g. 2000000"]')
    ).toHaveValue('10000000');
    await page.getByPlaceholder('e.g. 8').clear();
    await page.getByPlaceholder('e.g. 8').fill('50');
    await expect(
      page.locator('//input[@placeholder="e.g. 8"]')
    ).toHaveValue('50');
    await page.locator('//textarea[@placeholder="Any additional notes about this goal..."]').clear();
    await page.locator('//textarea[@placeholder="Any additional notes about this goal..."]').fill('Dream Car');
    await expect(
      page.locator('//textarea[@placeholder="Any additional notes about this goal..."]')
    ).toHaveValue('Dream Car')
    await page.getByText('Update Plan').click();

    //DELETE
    await page.locator('(//button[contains(@class,"p-1.5")])[10]').click();
    await page.getByText('Delete').click();

    await page.pause();


})