import { test, expect } from '@playwright/test';

test.describe('Tool - Jetbrains', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jetbrains');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Jetbrains - IT Tools');
  });

  test('', async ({ page }) => {

  });
});