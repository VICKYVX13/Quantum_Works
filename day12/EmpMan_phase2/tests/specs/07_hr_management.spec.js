/**
 * MODULE 07 – HR Management Module Tests
 * Sub-sections: Recruitment, Onboarding/Offboarding, Leave Policy,
 *               Performance, Training, Announcements, Pulse Survey.
 */
const { test, expect } = require('@playwright/test');
const { HRPage }     = require('../pages/HRPage');
const { SidebarPage } = require('../pages/SidebarPage');

test.describe('07 – HR Management Module', () => {
  let hr, sidebar;

  test.beforeEach(async ({ page }) => {
    hr      = new HRPage(page);
    sidebar = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('hr');
    await hr.waitForLoad();
  });

  test('HR-01 HR Module loads with sub-navigation', async ({ page }) => {
    const count = await hr.getNavCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('HR-02 Recruitment section shows candidate table', async ({ page }) => {
    // Recruitment is the default/first section
    await hr.clickSubNav('Recruitment');
    const count = await hr.getTableRowCount();
    expect(count).toBeGreaterThan(0);
  });

  test('HR-03 Candidate table has required columns', async ({ page }) => {
    await hr.clickSubNav('Recruitment');
    const headers = await page.locator('th').allInnerTexts();
    expect(headers.some(h => /Candidate|Name/i.test(h))).toBe(true);
    expect(headers.some(h => /Role|Position/i.test(h))).toBe(true);
    expect(headers.some(h => /Stage|Status/i.test(h))).toBe(true);
  });

  test('HR-04 Add Candidate button is visible in Recruitment', async ({ page }) => {
    await hr.clickSubNav('Recruitment');
    await expect(hr.addCandidateBtn).toBeVisible();
  });

  test('HR-05 View button present on candidate rows', async ({ page }) => {
    await hr.clickSubNav('Recruitment');
    const viewBtn = page.locator('button', { hasText: /View/i }).first();
    await expect(viewBtn).toBeVisible();
  });

  test('HR-06 Schedule Interview button present on candidate rows', async ({ page }) => {
    await hr.clickSubNav('Recruitment');
    const schedBtn = page.locator('button', { hasText: /Schedule/i }).first();
    await expect(schedBtn).toBeVisible();
  });

  test('HR-07 Candidate stage badges are visible', async ({ page }) => {
    await hr.clickSubNav('Recruitment');
    const badge = page.locator('.badge').first();
    await expect(badge).toBeVisible();
  });

  test('HR-08 Onboarding section loads with checklist', async ({ page }) => {
    await hr.clickSubNav('Onboarding');
    await page.waitForTimeout(500);
    const content = await page.locator('.hr-module, [class*="hr"]').innerText();
    expect(content).toMatch(/onboard|task|checklist/i);
  });

  test('HR-09 Performance section is accessible', async ({ page }) => {
    await hr.clickSubNav('Performance');
    await page.waitForTimeout(500);
    await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
  });

  test('HR-10 Training section is accessible', async ({ page }) => {
    await hr.clickSubNav('Training');
    await page.waitForTimeout(500);
    await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
  });

  test('HR-11 Announcements section is accessible', async ({ page }) => {
    await hr.clickSubNav('Announcements');
    await page.waitForTimeout(500);
    await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
  });

  test('HR-12 Breadcrumb shows HR Module', async ({ page }) => {
    await expect(page.locator('.breadcrumb-current')).toContainText('HR');
  });
});
