import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    timeout: 30000, // 30 seconds per test
    expect: {
        toHaveScreenshot: {
            maxDiffPixels: 100, // Allow up to 100 pixels to be different
        },
    },
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        actionTimeout: 10000, // 10 seconds for each action
        viewport: { width: 1280, height: 720 }, // Consistent viewport for visual tests
        // Disable animations for consistent screenshots
        launchOptions: {
            slowMo: 0,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120000, // 2 minutes to start the server
    },
});
