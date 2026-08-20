import {test, expect} from '@playwright/test';

test('IPO flow', async ({page}) => {
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
    await page.locator('(//a[@href="/ipo"])[2]').click();
    await expect(page).toHaveURL(/ipo/);

    //Subs IPO
    await page.locator('(//button[text()="Details"])[1]').click();
    await page.locator('(//button[text()="Subscribe to IPO"])[1]').click();
    await expect(page.locator('h2')).toHaveText('IPO Subscription Successful!');
    await page.locator('//button[text()="Done"]').click();

    //Turn On Notification
    await page.locator('(//button[contains(@class,"inline-flex")])[3]').click();

    //Search
    await page.locator('//input[@placeholder="Search IPO by company, ticker, or sector..."]').fill('Green Energy');

    //View Details
    await page.getByText('View Details').click();
    


    await page.pause();

})
