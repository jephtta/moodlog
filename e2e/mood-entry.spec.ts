import { test, expect } from "@playwright/test";

test.describe("Mood Entry (unauthenticated)", () => {
  test("redirects to auth when not signed in", async ({ page }) => {
    await page.goto("/");
    // Wait for loading to finish, then should see auth form
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Log Mood")).not.toBeVisible();
  });
});

test.describe("Page structure", () => {
  test("page loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15000 });
    // Firebase auth errors are expected in test env, filter those
    const nonAuthErrors = errors.filter(
      (e) => !e.includes("auth") && !e.includes("Firebase") && !e.includes("firestore")
    );
    expect(nonAuthErrors).toHaveLength(0);
  });

  test("has MoodLog heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "MoodLog" })).toBeVisible({ timeout: 15000 });
  });
});
