import { test, expect } from "@playwright/test";

test.describe("Auth form structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
  });

  test("should show email placeholder text", async ({ page }) => {
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  });

  test("should show password placeholder text", async ({ page }) => {
    await expect(page.getByPlaceholder("At least 6 characters")).toBeVisible();
  });

  test("should show sign-up prompt for new users", async ({ page }) => {
    await expect(page.getByText("Don't have an account?")).toBeVisible();
  });

  test("should require email field", async ({ page }) => {
    await expect(page.getByLabel("Email")).toHaveAttribute("required", "");
  });

  test("should require password field", async ({ page }) => {
    await expect(page.getByLabel("Password")).toHaveAttribute("required", "");
  });

  test("should enforce minimum password length", async ({ page }) => {
    await expect(page.getByLabel("Password")).toHaveAttribute("minlength", "6");
  });
});
