import { test, expect } from "@playwright/test";

test.describe("Reflect Page", () => {
  test("can submit a reflection and see it in history", async ({ page }) => {
    await page.goto("/reflect");

    // Select a mood (click the Seedling element)
    await page.click('button:has-text("Seedling")');

    // Type journal entry
    await page.fill('textarea[id="journal"]', "Feeling fresh and hopeful today!");

    // Type gratitude
    await page.fill('textarea[id="gratitude"]', "Grateful for sunshine");

    // Submit
    await page.click('button:has-text("Plant this reflection")');

    // Verify it appears in history
    await expect(page.locator("text=Feeling fresh and hopeful today!")).toBeVisible();
  });

  test("submit button disabled without mood or journal", async ({ page }) => {
    await page.goto("/reflect");

    const submitBtn = page.locator('button:has-text("Plant this reflection")');
    await expect(submitBtn).toBeDisabled();
  });
});
