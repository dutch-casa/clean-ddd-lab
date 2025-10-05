import { test, expect } from '@playwright/test';

test.describe('Clean Architecture Lab', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Clean Architecture')).toBeVisible();
    await expect(page.getByText('Build software that lasts')).toBeVisible();
  });

  test('should navigate to sections', async ({ page }) => {
    await page.goto('/');

    // Click on a nav link
    await page.getByText('Value Objects', { exact: false }).first().click();
    await expect(page).toHaveURL(/#value-objects/);
  });

  test('should display animations', async ({ page }) => {
    await page.goto('/#value-objects');
    await expect(page.getByText('Value Object: Immutability')).toBeVisible();
  });

  test('should show exercise playground', async ({ page }) => {
    await page.goto('/#exercises');
    await expect(page.getByText('Interactive Exercises')).toBeVisible();
    await expect(page.getByText('Run Tests')).toBeVisible();
  });

  test('should display generated code', async ({ page }) => {
    await page.goto('/#generated-code');
    await expect(page.getByText('Generated C# Code')).toBeVisible();
  });
});
