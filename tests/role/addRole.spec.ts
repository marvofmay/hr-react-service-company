import { test, expect } from '@playwright/test';
import { capitalizeFirstLetter } from '@/app/utils/stringMethod';

const baseUrl = 'http://localhost:3000';
const rolesList = 'lista ról';

test('Open add role dialog', async ({ page }) => {
    await page.goto(`${baseUrl}/manage/roles/list`);

    await expect(
        page.getByText(capitalizeFirstLetter(rolesList))
    ).toBeVisible();

    const addRoleButton = page.getByRole('button', { name: 'Dodaj rolę' });
    await expect(addRoleButton).toBeVisible();

    await addRoleButton.click();

    await expect(page.getByRole('dialog')).toBeVisible();
});

test('Fill name and description and verify values', async ({ page }) => {
    const roleName = 'QA Manager';
    const roleDescription = 'Rola odpowiedzialna za testy i jakość';

    await page.goto(`${baseUrl}/manage/roles/list`);
    await page.getByRole('button', { name: 'Dodaj rolę' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const nameInput = dialog.locator('input[name="name"]');
    const descriptionTextarea = dialog.locator('textarea[name="description"]');

    await nameInput.fill(roleName);
    await descriptionTextarea.fill(roleDescription);

    await expect(nameInput).toHaveValue(roleName);
    await expect(descriptionTextarea).toHaveValue(roleDescription);
});
