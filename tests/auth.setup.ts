import { chromium, FullConfig } from '@playwright/test';

const baseUrl = 'http://localhost:3000';
const backendUrl = 'http://service-company:80';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route('**/api/login', async route => {
        const request = route.request();
        route.continue({
            url: `${backendUrl}/api/login`,
            method: request.method(),
            headers: request.headers(),
            postData: request.postData(),
        });
    });

    await page.goto(`${baseUrl}/login`);

    await page.fill('input[name="email"]', 'admin.hrapp@gmail.com');
    await page.fill('input[name="password"]', 'Admin123!');
    await page.click('button[type="submit"]');

    await page.waitForURL(`${baseUrl}/`);

    await context.storageState({ path: 'storage/auth.json' });

    await browser.close();
}

export default globalSetup;
