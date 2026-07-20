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

    await page.locator('(//span[text()="Financial Check-Up"])[2]').click();
    await expect(page).toHaveURL(/financial-checkup/);

    await page.locator('(//button[contains(@class, "items-center")])[5]').click();  

    // Monthly Income
    await page.locator('(//input[contains(@class, "px-3")])[1]').fill('10000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[1]')
    ).toHaveValue('10000000');

    // Monthly Expense
    await page.locator('(//input[contains(@class, "px-3")])[2]').fill('5000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[2]')
    ).toHaveValue('5000000');

    // Total Assets (IDR)
    await page.locator('(//input[contains(@class, "px-3")])[3]').fill('150000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[3]')
    ).toHaveValue('150000000');

    // Total Liabilities (IDR)
    await page.locator('(//input[contains(@class, "px-3")])[4]').fill('50000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[4]')
    ).toHaveValue('50000000');

    // Monthly Investment (IDR)
    await page.locator('(//input[contains(@class, "px-3")])[5]').fill('2000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[5]')
    ).toHaveValue('2000000');

    // Emergency Fund (IDR)
    await page.locator('(//input[contains(@class, "px-3")])[6]').fill('10000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[6]')
    ).toHaveValue('10000000');

    // Monthly Debt Payment (IDR)
    await page.locator('(//input[contains(@class, "px-3")])[7]').fill('3000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[7]')
    ).toHaveValue('3000000');


    await page.pause();

})
