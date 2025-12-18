import { test, expect } from '@playwright/test';
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

test('dropdown displays after clicking the Manage button', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${roles}`)).toBeVisible();
});

test('dropdown displays after clicking the Manage button and click Roles', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${roles}`)).toBeVisible();
    await page.click(`a:text("${roles}")`);
    await expect(page.locator(`text="${capitalizeFirstLetter(rolesList)}"`)).toBeVisible();
});

test('Add new role', async ({ page }) => {
    await page.click(`button:has-text("${manage.toUpperCase()}")`);
    await expect(page.locator(`text=${roles}`)).toBeVisible();
    await page.click(`a:text("${roles}")`);

    const addRoleButton = page.locator('button:has-text("Dodaj rolę")');
    await expect(addRoleButton).toHaveCount(1);
    page.on('dialog', dialog => dialog.accept());
    await addRoleButton.click();
});
