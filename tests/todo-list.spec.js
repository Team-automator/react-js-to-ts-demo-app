import { test, expect } from "@playwright/test";

test("should display app title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="app-title"]')).toHaveText(
    "React 17 Todo App"
  );
});

test("should have input and Add button", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="todo-input"]')).toBeVisible();
  await expect(
    page.locator('[data-testid="add-button"]', { hasText: "Add" })
  ).toBeVisible();
});

test("should show filter buttons", async ({ page }) => {
  await page.goto("/");
  const filters = ["All", "Active", "Completed"];
  for (const label of filters) {
    await expect(
      page.locator(`[data-testid="filter-${label.toLowerCase()}"]`)
    ).toBeVisible();
  }
});

test('should show "No tasks found." when list is empty', async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="empty-message"]')).toBeVisible();
});

test("should add a new todo item", async ({ page }) => {
  await page.goto("/");
  await page.fill('[data-testid="todo-input"]', "Write Playwright tests");
  await page.click('[data-testid="add-button"]');
  await expect(page.locator("li")).toContainText("Write Playwright tests");
});

test("should filter completed tasks", async ({ page }) => {
  await page.goto("/");

  // Add and complete a task
  await page.fill('[data-testid="todo-input"]', "Test filter logic");
  await page.click('[data-testid="add-button"]');
  await page.click('[data-testid="todo-checkbox"]'); // assumes checkbox completes the task

  // Click 'Completed' filter
  await page.click('[data-testid="filter-completed"]');
  await expect(page.locator("li")).toContainText("Test filter logic");
});
