import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("should return HTTP 200 on the main page", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
  });

  test("should render the app without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
    const nonAuthErrors = errors.filter(
      (e) => !e.includes("auth") && !e.includes("Firebase") && !e.includes("firestore")
    );
    expect(nonAuthErrors).toHaveLength(0);
  });

  test("should display the MoodLog heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "MoodLog" })).toBeVisible({ timeout: 15000 });
  });

  test("should display the login page for unauthenticated users", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("should have a working sign-up toggle", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible({ timeout: 15000 });
    await page.getByText("Sign Up", { exact: true }).click();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });
});
