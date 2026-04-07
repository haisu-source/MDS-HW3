import { test, expect } from "@playwright/test";

test.describe("Habits Page", () => {
  test("can select identity and see suggestions", async ({ page }) => {
    await page.goto("/habits");

    // Select Student identity
    await page.click('button:has-text("Student")');

    // Should see student-related suggestions
    await expect(page.locator("text=Review one concept before bed")).toBeVisible();
  });

  test("can add a suggested habit", async ({ page }) => {
    await page.goto("/habits");

    // Select Coder identity
    await page.click('button:has-text("Coder")');

    // Add a suggested habit
    await page.click('button:has-text("+ Add") >> nth=0');

    // Should appear in "Your Habits" section
    await expect(page.locator("text=Your Habits")).toBeVisible();
  });
});
