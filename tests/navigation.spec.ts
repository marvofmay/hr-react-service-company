import { test, expect } from '@playwright/test';
import { APP_NAME } from '../../hr-app/app/utility/constans';
import { capitalizeFirstLetter } from '@/app/utils/stringMethod';

const baseUrl = 'http://localhost:3000';

const manage = 'zarządzanie';
const settings = 'ustawienia';
const roles = 'role';
const employees = 'pracownicy';
const industries = 'branże';
const positons = 'stanowiska';
const companies = 'firmy';
const home = 'strona główna';
const information = 'informacje';
const companiesList = 'lista firm';
const employeesList = 'lista pracowników';
const rolesList = 'lista ról';
const positionsList = 'lista stanowisk';

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
    const buttonNames = [home, information];

    for (const buttonName of buttonNames) {
        await expect(header.locator(`button:has-text("${buttonName.toUpperCase()}")`)).toBeVisible();
    }
});

test('should show correct breadcrumb text after clicking on links', async ({ page }) => {
    const breadcrumbLinks = [
        { href: '/home', expectedText: capitalizeFirstLetter(home) },
        { href: '/info', expectedText: capitalizeFirstLetter(information) },
    ];

    for (const { href, expectedText } of breadcrumbLinks) {
        await page.locator(`a[href="${href}"]`).click();

        const lastBreadcrumbItem = page.locator('ol li:last-child');
        await expect(lastBreadcrumbItem).toHaveText(expectedText);
    }
});

test('dropdown displays after clicking the Manage button', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${companies}`)).toBeVisible();
    await expect(page.locator(`text=${roles}`)).toBeVisible();
    await expect(page.locator(`text=${employees}`)).toBeVisible();
});

test('dropdown displays after clicking the Settings button', async ({ page }) => {
    await page.click(`button:has-text("${settings.toUpperCase()}")`);
    await expect(page.locator(`text=${companies}`)).toBeVisible();
    await expect(page.locator(`text=${roles}`)).toBeVisible();
    await expect(page.locator(`text=${employees}`)).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Companies', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${companies}`)).toBeVisible();
    await page.click(`a:text("${companies}")`);
    await expect(page.locator(`text="${capitalizeFirstLetter(companiesList)}"`)).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Employess', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${employees}`)).toBeVisible();
    await page.click(`a:text("${employees}")`);
    await expect(page.locator(`text="${capitalizeFirstLetter(employeesList)}"`)).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Roles', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${roles}`)).toBeVisible();
    await page.click(`a:text("${roles}")`);
    await expect(page.locator(`text="${capitalizeFirstLetter(rolesList)}"`)).toBeVisible();
});

test('dropdown displays after clicking the Settings button and click Companies', async ({ page }) => {
    await page.click(`button:has-text("${settings.toUpperCase()}")`);
    await expect(page.locator(`text=${companies}`)).toBeVisible();
    await page.click(`a:text("${companies}")`);
    await expect(page.locator('text="Ustawienia firm"')).toBeVisible();
});