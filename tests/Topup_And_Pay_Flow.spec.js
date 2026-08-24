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

    await page.getByRole('link', { name: 'Top Up & Pay' }).click();
    await expect(page).toHaveURL(/topup-pay/);

    //Topup method GoPay
    await page.locator('(//p[text()="GoPay"])[1]').click();
    await page.locator('//input[@placeholder="Enter amount"]').fill('150000');
    await page.locator('//input[@placeholder="e.g. 081234567890"]').fill('1234567890');
    await page.getByText('Top Up Now').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.locator('#mpin-0').click();
    await page.keyboard.type('123456');
    await page.getByText('Verify').click();
    await expect(page.locator('//h3[text()="Transaction Successful!"]')).toBeVisible();
    await page.getByRole('button', { name: 'Done' }).click();

    //Topup method Credit/Debit Card
    await page.locator('(//p[text()="Credit/Debit Card"])[1]').click();
    await page.locator('//input[@placeholder="Enter amount"]').fill('25000000');
    await page.locator('//input[@placeholder="1234 5678 9012 3456"]').fill('4111111111111111');
    await page.locator('(//input[contains(@class,"px-3")])[3]').fill('John Doe');
    await page.locator('//input[@placeholder="MM/YY"]').fill('12/25');
    await page.locator('(//input[contains(@class,"px-3")])[5]').fill('123'); 
    await page.getByText('Top Up Now').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.locator('#mpin-0').click();
    await page.keyboard.type('123456');
    await page.getByText('Verify').click();
    await expect(page.locator('//h3[text()="Transaction Successful!"]')).toBeVisible();
    await page.getByRole('button', { name: 'Done' }).click();

    //Pay Bills method
    await page.locator('(//button[contains(@class,"rounded-md")])[2]').click();
    await page.locator('//span[text()="Electricity (PLN)"]').click();
    await page.locator('//input[@placeholder="e.g. 12345678901"]').fill('12345678901');
    await page.locator('//input[@placeholder="Enter amount"]').fill('5000000');
    await page.getByText('Pay Now').click();
    await expect(page.locator('//h3[text()="Confirm Transaction"]')).toBeVisible();
    await page.getByRole('button', { name: 'Confirm' }).click();
     await page.locator('#mpin-0').click();
    await page.keyboard.type('123456');
    await page.getByText('Verify').click();
    await expect(page.locator('//h3[text()="Transaction Successful!"]')).toBeVisible();
    await page.getByRole('button', { name: 'Done' }).click();

    await page.pause();
   

})