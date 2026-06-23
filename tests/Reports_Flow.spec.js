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

    await page.locator('(//a[@href="/reports"])[2]').click();
    await expect(page).toHaveURL(/reports/);
    await page.locator('(//input[contains(@class,"px-3")])[1]').fill('2026-03-29');
    await expect(
      page.locator('(//input[contains(@class,"px-3")])[1]')
    ).toHaveValue('2026-03-29');
    await page.locator('(//input[contains(@class,"px-3")])[2]').fill('2026-06-22');
    await expect(
      page.locator('(//input[contains(@class,"px-3")])[2]')
    ).toHaveValue('2026-06-22');
    await page.getByText('Generate Report').click();

    

    await page.pause();

})