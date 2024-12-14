import { test, expect } from '@playwright/test';
import { APP_NAME } from '../../hr-app/app/utility/constans';

const baseUrl = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
});

test('has text', async ({ page }) => {
    const headerHRApp = page.getByRole('banner').getByRole('link', { name: APP_NAME });
    await expect(headerHRApp).toBeVisible();

    const breadcrumbHRApp = page.getByLabel('breadcrumb').getByRole('link', { name: APP_NAME });
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


test('dropdown displays after clicking the Manage button', async ({ page }) => {
    await page.click('button:has-text("Manage")');
    await expect(page.locator('text=Companies')).toBeVisible();
    await expect(page.locator('text=Roles')).toBeVisible();
    await expect(page.locator('text=Employees')).toBeVisible();
});

test('dropdown displays after clicking the Settings button', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    await expect(page.locator('text=Companies')).toBeVisible();
    await expect(page.locator('text=Roles')).toBeVisible();
    await expect(page.locator('text=Employees')).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Companies', async ({ page }) => {
    await page.click('button:has-text("Manage")');
    await expect(page.locator('text=Companies')).toBeVisible();
    await page.click('a:text("Companies")');
    await expect(page.locator('text="Companies list"')).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Employess', async ({ page }) => {
    await page.click('button:has-text("Manage")');
    await expect(page.locator('text=Employees')).toBeVisible();
    await page.click('a:text("Employees")');
    await expect(page.locator('text="Employees list"')).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Roles', async ({ page }) => {
    await page.click('button:has-text("Manage")');
    await expect(page.locator('text=Roles')).toBeVisible();
    await page.click('a:text("Roles")');
    await expect(page.locator('text="Roles list"')).toBeVisible();
});

test('dropdown displays after clicking the Settings button and click Companies', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    await expect(page.locator('text=Companies')).toBeVisible();
    await page.click('a:text("Companies")');
    await expect(page.locator('text="Companies settings"')).toBeVisible();
});