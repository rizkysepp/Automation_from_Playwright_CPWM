import {test, expect} from '@playwright/test';

test('Create New Portfolio and Add Product', async ({page}) => {
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
    
    await page.locator('(//span[text()="Portfolio"])[2]').click();
    await expect(page).toHaveURL(/portfolio/);
    await page.getByText('New Portfolio').click();
    await page.locator('//input[@placeholder="e.g., Retirement Fund"]').fill('Finacial Freedom Fund');
    await expect(
        page.locator('//input[@placeholder="e.g., Retirement Fund"]')
        ).toHaveValue('Finacial Freedom Fund');
    await page.locator('//button[text()="Create"]').click();
    await page.locator('//button[contains(.,"Add Product")]').click();


    await expect(page).toHaveURL(/products/);
    await page.locator('(//button[text()="View Details"])[4]').click();
    await page.getByText('Subscribe').click();
    await expect(page.locator('h2')).toHaveText('Transaction Details');
    await page.locator('//input[@type="number"]').fill('5000000')
    await page.locator('select').selectOption({
    value: 'Bank Mandiri'
});
    await page. locator('//input[@placeholder="e.g. INVEST10"]').fill('PROMO20');
    await page.getByText('Apply').click();
    await expect(page.locator('text=discount applied')).toBeVisible();
    await page.locator('(//input[@type="checkbox"])[1]').check();
    await page.locator('select').nth(1).selectOption('Weekly');
    await page.locator('(//input[@type="checkbox"])[2]').check();
    await page.getByText('Proceed to Payment').click();
    const text = await page.locator('body').textContent();

const otp = text.match(/\d{6}/)[0];

for (let i = 0; i < otp.length; i++) {
  await page.locator(`#otp-${i}`).fill(otp[i]);
}

    await page.getByText('Verify').click();
    await expect(page.locator('h2')).toHaveText('Transaction Successful!');
    await page.locator('select').selectOption({
      label: 'Retirement Goals'
    });
    await page.getByText('Download').click();
    await page.getByText('View Portfolio').click();
    await expect(page.locator('h1')).toHaveText('Portfolio');

   // await page.pause();

});