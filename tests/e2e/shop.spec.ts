import { expect, test } from "@playwright/test";

test("browse, add, and complete a demo checkout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "runs in the mobile project");

  await page.goto("/", { waitUntil: "load" });
  await expect(page.getByRole("heading", { name: /dresses with a story/i })).toBeVisible();

  await page.goto("/product/sika-tie-dye-playsuit", { waitUntil: "load" });
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  await page.goto("/checkout", { waitUntil: "load" });
  await page.getByLabel("Full name").fill("Ama Mensah");
  await page.getByLabel("Phone").fill("0244127788");
  await page.getByLabel("Email").fill("ama@example.com");
  await page.getByLabel("City / town").fill("Accra");
  await page.getByLabel("Address & landmark").fill("12 Oxford Street, Osu");
  await page.getByRole("button", { name: /Pay GH/ }).click();
  await expect(page).toHaveURL(/\/order\/SNS-/);
  await expect(page.getByText(/paid/i).first()).toBeVisible();
});
