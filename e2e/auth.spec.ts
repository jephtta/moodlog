import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
  });

  test("should show sign-in form by default", async ({ page }) => {
    await expect(page.getByText("Track your daily mood")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("should toggle between sign-in and sign-up", async ({ page }) => {
    await page.getByText("Sign Up", { exact: true }).click();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
    // Toggle back
    await page.getByText("Sign In", { exact: true }).click();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("invalid@test.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Invalid email or password.")).toBeVisible({ timeout: 15000 });
  });

  test("should clear error when toggling between sign-in and sign-up", async ({ page }) => {
    // Trigger an error first
    await page.getByLabel("Email").fill("invalid@test.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Invalid email or password.")).toBeVisible({ timeout: 15000 });
    // Toggle to sign-up should clear the error
    await page.getByText("Sign Up", { exact: true }).click();
    await expect(page.getByText("Invalid email or password.")).not.toBeVisible();
  });

  test("should have email field with type email", async ({ page }) => {
    await expect(page.getByLabel("Email")).toHaveAttribute("type", "email");
  });

  test("should have password field with type password", async ({ page }) => {
    await expect(page.getByLabel("Password")).toHaveAttribute("type", "password");
  });
});
