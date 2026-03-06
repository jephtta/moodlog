import { test, expect } from "@playwright/test";

test.describe("Calendar (UI structure)", () => {
  test("auth form has all required elements", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Track your daily mood")).toBeVisible({ timeout: 15000 });
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
    await expect(page.getByPlaceholder("At least 6 characters")).toBeVisible();
  });

  test("sign up link is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Don't have an account?")).toBeVisible({ timeout: 15000 });
  });
});
