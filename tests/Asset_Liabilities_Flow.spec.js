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

    await page.locator('(//span[text()="Assets & Liabilities"])[2]').click();
    await expect(
        page.locator('(//span[text()="Assets & Liabilities"])[2]')
    ).toHaveText('Assets & Liabilities')

    // Add Asset
    await page.getByText('Add Asset').click();
    await page.locator('select').selectOption('Vehicle');
    await page.locator('(//input[contains(@class, "px-3")])[1]').fill('Yaris GR');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[1]')
    ).toHaveValue('Yaris GR');
    await page.locator('(//input[contains(@class, "px-3")])[2]').fill('800000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[2]')
    ).toHaveValue('800000000');
    await page.locator('(//input[contains(@class, "px-3")])[3]').fill('Second Hand Car');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[3]')
    ).toHaveValue('Second Hand Car');
    await page.getByText('Save').click();

    // Add Liability
    await page.getByText('Add Liability').click();
    await page.locator('select').selectOption('Credit Card');
    await page.locator('(//input[contains(@class, "px-3")])[1]').fill('Visa MasterCard');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[1]')
    ).toHaveValue('Visa MasterCard');
    await page.locator('(//input[contains(@class, "px-3")])[2]').fill('50000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[2]')
    ).toHaveValue('50000');
    await page.getByText('Save').click();
    await expect(page).toHaveURL(/asset-liabilities/);

    //Edit Asset
    await page.locator('(//button[contains(@class, "rounded-lg")])[18]').click();
    await page.locator('(//input[contains(@class, "px-3")])[1]').fill('Nissan GTR');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[1]')
    ).toHaveValue('Nissan GTR');
    await page.locator('(//input[contains(@class, "px-3")])[2]').fill('1000000000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[2]')
    ).toHaveValue('1000000000');
    await page.locator('(//input[contains(@class, "px-3")])[3]').fill('Second Hand Car');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[3]')
    ).toHaveValue('Second Hand Car');
    await page.locator('//button[text()="Update"]').click();

    //Edit Liability
    await page.locator('(//button[contains(@class, "rounded-lg")])[16]').click();
    await page.locator('(//input[contains(@class, "px-3")])[1]').fill('Visa Platinum Card');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[1]')
    ).toHaveValue('Visa Platinum Card');
    await page.locator('(//input[contains(@class, "px-3")])[2]').fill('175000');
    await expect(
        page.locator('(//input[contains(@class, "px-3")])[2]')
    ).toHaveValue('175000');
    await page.locator('//button[text()="Update"]').click();

    //Delete Liability
    await page.locator('(//button[contains(@class, "rounded-lg")])[17]').click();

    //Delete Asset
    await page.locator('(//button[contains(@class, "rounded-lg")])[19]').click();



    await page.pause();


})