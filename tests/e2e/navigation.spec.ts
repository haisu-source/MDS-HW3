import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Welcome to your growth garden");
  });

  test("can navigate to all pages via nav", async ({ page }) => {
    await page.goto("/");

    // Navigate to Reflect
    await page.click('a[href="/reflect"]');
    await expect(page.locator("h1")).toContainText("Reflect");

    // Navigate to Books
    await page.click('a[href="/books"]');
    await expect(page.locator("h1")).toContainText("Reading Log");

    // Navigate to Habits
    await page.click('a[href="/habits"]');
    await expect(page.locator("h1")).toContainText("Habits");

    // Navigate to Harmony
    await page.click('a[href="/harmony"]');
    await expect(page.locator("h1")).toContainText("Harmony");

    // Navigate back Home
    await page.click('a[href="/"]');
    await expect(page.locator("h1")).toContainText("Welcome to your growth garden");
  });

  test("nav highlights active page", async ({ page }) => {
    await page.goto("/reflect");
    const reflectLink = page.locator('nav a[href="/reflect"]');
    await expect(reflectLink).toHaveClass(/bg-terracotta/);
  });
});
