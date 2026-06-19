import {test, expect} from '@playwright/test';

test('Compare Products flow', async ({page}) => {
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

    await page.locator('(//span[@class="transition-all duration-300 whitespace-nowrap flex-1 text-left opacity-100"])[2]').click();
    await page.getByText('Compare Products').click();
    await expect(page.locator('h1')).toHaveText('Compare Products');
    await page.locator('//div[contains(@class,"border-emerald-400")]').click();
    await page.locator('//input[@placeholder="Search products..."]').fill('BNP Paribas');
    await page.locator('//p[text()="BNP Paribas Ekuitas"]').click();
    await page.locator('//div[contains(@class,"bg-blue-50")]').click();
    await page.locator('//input[@placeholder="Search products..."]').fill('Schroder Dana Mantap Plus II');
    await page.locator('//p[text()="Schroder Dana Mantap Plus II"]').click();
    await page.locator('//div[@class="rounded-xl border-t-4 border-violet-400 overflow-visible"]').click();
    await page.locator('//input[@placeholder="Search products..."]').fill('Eastspring Investments Stable Income');
    await page.locator('//p[text()="Eastspring Investments Stable Income"]').click();

    await page.pause();


})