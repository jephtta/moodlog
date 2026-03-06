import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("shows sign-in form by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Track your daily mood")).toBeVisible({ timeout: 15000 });
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("can toggle between sign-in and sign-up", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible({ timeout: 15000 });
    // Click the "Sign Up" text link to toggle
    await page.getByText("Sign Up", { exact: true }).click();
    // Now the submit button should say "Sign Up"
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("shows error for invalid credentials", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
    await page.getByLabel("Email").fill("invalid@test.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText(/auth/i)).toBeVisible({ timeout: 15000 });
  });

  test("email field has correct type", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
    await expect(page.getByLabel("Email")).toHaveAttribute("type", "email");
  });

  test("password field has correct type", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Password")).toBeVisible({ timeout: 15000 });
    await expect(page.getByLabel("Password")).toHaveAttribute("type", "password");
  });
});
