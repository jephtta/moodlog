import { test, expect } from "@playwright/test";

test.describe("Mood entry (unauthenticated)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
  });

  test("should show auth form instead of mood logger when not signed in", async ({ page }) => {
    await expect(page.getByText("Log Mood")).not.toBeVisible();
    await expect(page.getByText("Track your daily mood")).toBeVisible();
  });

  test("should not show sign-out button when not signed in", async ({ page }) => {
    await expect(page.getByText("Sign Out")).not.toBeVisible();
  });

  test("should not show mood emoji buttons when not signed in", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Great" })).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Awful" })).not.toBeVisible();
  });

  test("should not show note input when not signed in", async ({ page }) => {
    await expect(page.getByPlaceholder("Add a note (optional)")).not.toBeVisible();
  });
});
