import { test, expect } from "@playwright/test";

test("contact page renders inquiry form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Inquiry" })).toBeVisible();
});
