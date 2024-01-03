import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';
import API from '../utils/ApiUtils';
 /*
setup('do login', async ({ page }) => {
    let token :string ;

    await page.goto('/');
  await page.getByLabel('User Name').fill('user');
  await page.getByLabel('Password').fill('password');
  await page.getByText('Sign in').click();

  // Wait until the page actually signs in.
  await expect(page.getByText('Hello, user!')).toBeVisible();


const res=   await API.postReq('/api/authaccount/login', {
    "email":"alok.s@gmail.com",
    "password":123456
})
token = (await res.json()).data.Token;
  await page.context().storageState({ path: STORAGE_STATE });

});

*/

//globalSetup.js
import { FullConfig } from '@playwright/test';
import  dotenv from 'dotenv';

async function globalSetup(config: FullConfig) {

  if(process.env.test_env) {
    dotenv.config({
      path: `.env.${process.env.test_env}`,
      override: true
    });
  }

  }
  
  module.exports = globalSetup;