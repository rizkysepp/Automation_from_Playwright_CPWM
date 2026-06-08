import {test, expect} from '@playwright/test';

test('Login flow', async ({page}) => {
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

    await page.locator('//span[text()="Products"]').click();
    await expect(page.locator('h1')).toHaveText('Investment Products');
    await page.locator('(//button[text()="View Details"])[1]').click();
    await expect(page).toHaveURL(/9/)
    await page.getByText('Fund Fact Sheet').click();
    await page.getByText('Prospectus').click();
    await page.getByText('Subscribe').click();
    
    await expect(page.locator('h2')).toHaveText('Transaction Details');
    await page.locator('//input[@type="number"]').fill('1000000')
    await page.locator('//input[@type="checkbox"]').check();
    await page.getByText('Proceed to Payment').click();
    const text = await page.locator('body').textContent();

const otp = text.match(/\d{6}/)[0];

for (let i = 0; i < otp.length; i++) {
  await page.locator(`#otp-${i}`).fill(otp[i]);
}

    await page.getByText('Verify').click();
    await expect(page.locator('h2')).toHaveText('Transaction Successful!');
    await page.getByText('Download').click();
    await page.getByText('View Portfolio').click();
    await expect(page.locator('h1')).toHaveText('Portfolio');


    await page.pause();

});

