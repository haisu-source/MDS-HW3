import { test, expect } from "@playwright/test";

test.describe("Books Page", () => {
  test("can add a book and see it on the shelf", async ({ page }) => {
    await page.goto("/books");

    // Fill out the form
    await page.fill('input[id="title"]', "The Alchemist");
    await page.fill('input[id="author"]', "Paulo Coelho");
    await page.fill('textarea[id="reason"]', "A friend recommended it for personal growth");
    await page.fill('textarea[id="connection"]', "Reminds me of my own journey");

    // Submit
    await page.click('button:has-text("Add to shelf")');

    // Verify it appears
    await expect(page.locator("text=The Alchemist")).toBeVisible();
    await expect(page.locator("text=Paulo Coelho")).toBeVisible();
  });
});
