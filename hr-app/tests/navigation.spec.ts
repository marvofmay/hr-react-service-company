import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('has text', async ({ page }) => {
  const headerHRApp = page.getByRole('banner').getByRole('link', { name: 'HR APP' });
  await expect(headerHRApp).toBeVisible();

  const breadcrumbHRApp = page.getByLabel('breadcrumb').getByRole('link', { name: 'HR APP' });
  await expect(breadcrumbHRApp).toBeVisible();  
});


test('should have buttons HOME, INFO, MANAGE, SETTINGS in the header', async ({ page }) => {
  const header = page.locator('header');
  const buttonNames = ['Home', 'Info', 'Manage', 'Settings'];

  for (const buttonName of buttonNames) {
    await expect(header.locator(`button:has-text("${buttonName}")`)).toBeVisible();
  }
});


test('should show correct breadcrumb text after clicking on links', async ({ page }) => {
  const breadcrumbLinks = [
    { href: '/home', expectedText: 'Home' },
    { href: '/info', expectedText: 'Info' },
  ];

  for (const { href, expectedText } of breadcrumbLinks) {
    await page.locator(`a[href="${href}"]`).click();

    const lastBreadcrumbItem = page.locator('ol li:last-child');
    await expect(lastBreadcrumbItem).toHaveText(expectedText);
  }
});
