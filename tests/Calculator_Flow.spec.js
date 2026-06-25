import {test, expect} from '@playwright/test';

test('Calculator flow', async ({page}) => {
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

    await page.locator('(//span[text()="Calculator"])[2]').click();
    await expect(page).toHaveURL(/calculator/);
    await page.locator('select').selectOption('BPE - BNP Paribas Ekuitas');
    await page.locator('(//input[contains(@class,"px-3")])[1]').fill('20000000');
    await expect(
      page.locator('(//input[contains(@class,"px-3")])[1]')
    ).toHaveValue('20000000');
    await page.locator('(//input[contains(@class,"px-3")])[2]').fill('6');
    await expect(
      page.locator('(//input[contains(@class,"px-3")])[2]')
    ).toHaveValue('6');
    await page.locator('//button[text()="Months"]').click();
    await page.locator('(//input[contains(@class,"px-3")])[3]').fill('2026-09-25');
    await page.locator('(//input[contains(@class,"px-3")])[4]').fill('10');
    await expect(
      page.locator('(//input[contains(@class,"px-3")])[4]')
    ).toHaveValue('10');
    await page.locator('//button[contains(@class,"inline-flex")]').click();
    await expect(page.locator('//p[text()="Total Return"]')).toHaveText('Total Return');
    
    await page.pause();


})
