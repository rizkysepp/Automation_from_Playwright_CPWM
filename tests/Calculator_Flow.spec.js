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

    //SIP Calculator
    await page.locator('//button[text()="SIP Calculator"]').click();
    await expect(page.locator('//button[text()="SIP Calculator"]')).toHaveText('SIP Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('1000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('1000000');
    await page.locator('(//input[contains(@class,"py-2")])[7]').fill('50');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[7]')
    ).toHaveValue('50');
    await page.locator('(//input[contains(@class,"py-2")])[8]').fill('20');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[8]')
    ).toHaveValue('20');

    //lump Sum Calculator
    await page.locator('//button[text()="Lump Sum Calculator"]').click();
    await expect(page.locator('//button[text()="Lump Sum Calculator"]')).toHaveText('Lump Sum Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('12000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('12000000');


    //Retirement Calculator
    await page.locator('//button[text()="Retirement Calculator"]').click();
    await expect(page.locator('//div//button[text()="Retirement Calculator"]')).toHaveText('Retirement Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('30');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('30');
    await page.locator('(//input[contains(@class,"py-2")])[7]').fill('75');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[7]')
    ).toHaveValue('75');
    await page.locator('(//input[contains(@class,"py-2")])[8]').fill('10000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[8]')
    ).toHaveValue('10000000');
    await page.locator('(//input[contains(@class,"py-2")])[9]').fill('10');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[9]')
    ).toHaveValue('10');
    await page.locator('(//input[contains(@class,"py-2")])[10]').fill('15');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[10]')
    ).toHaveValue('15');  

    //Compound Interest Calculator
    await page.locator('//button[text()="Compound Interest Calculator"]').click();
    await expect(page.locator('//div//button[text()="Compound Interest Calculator"]')).toHaveText('Compound Interest Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('28');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('28');
    await page.locator('(//input[contains(@class,"py-2")])[7]').fill('75');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[7]')
    ).toHaveValue('75');
    await page.locator('(//input[contains(@class,"py-2")])[8]').fill('5000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[8]')
    ).toHaveValue('5000000');
    await page.locator('(//select[contains(@class,"px-3")])[2]').click();
    await page.locator('(//select[contains(@class,"px-3")])[2]').selectOption('Quarterly');

    //Goal Investment Calculator
    await page.locator('//button[text()="Goal Investment Calculator"]').click();
    await expect(page.locator('//div//button[text()="Goal Investment Calculator"]')).toHaveText('Goal Investment Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('10000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('10000000');
    await page.locator('(//input[contains(@class,"py-2")])[7]').fill('10');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[7]')       
    ).toHaveValue('10');
    await page.locator('(//input[contains(@class,"py-2")])[8]').fill('15');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[8]') 
    ).toHaveValue('15');
    await page.locator('(//input[contains(@class,"py-2")])[9]').fill('20');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[9]') 
    ).toHaveValue('20');

    //Education Planning Calculator
    await page.locator('//button[text()="Education Planning Calculator"]').click();
    await expect(page.locator('//div//button[text()="Education Planning Calculator"]')).toHaveText('Education Planning Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('350000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('350000000');
    await page.locator('(//input[contains(@class,"py-2")])[7]').fill('12');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[7]')
    ).toHaveValue('12');
    await page.locator('(//input[contains(@class,"py-2")])[8]').fill('15');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[8]')
    ).toHaveValue('15');  
    await page.locator('(//input[contains(@class,"py-2")])[9]').fill('20');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[9]')
    ).toHaveValue('20');

    //Loan Calculator
    await page.locator('//button[text()="Loan Calculator"]').click();
    await expect(page.locator('//div//button[text()="Loan Calculator"]')).toHaveText('Loan Calculator');
    await page.locator('(//input[contains(@class,"py-2")])[6]').fill('10000000');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[6]')
    ).toHaveValue('10000000');
    await page.locator('(//input[contains(@class,"py-2")])[7]').fill('10');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[7]')
    ).toHaveValue('10');
    await page.locator('(//input[contains(@class,"py-2")])[8]').fill('5');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[8]')
    ).toHaveValue('5');
    await page.locator('(//input[contains(@class,"py-2")])[9]').fill('10');
    await expect(
      page.locator('(//input[contains(@class,"py-2")])[9]')
    ).toHaveValue('10');

    await page.pause();

})
