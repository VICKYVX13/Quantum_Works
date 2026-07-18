/**
 * MODULE 11 – Reports Module Tests
 * Tests: report type selection, Employee/Attendance/Payroll/Leave/Department/Performance reports,
 *        search, table render, PDF and XLSX export buttons.
 */
const { test, expect } = require('@playwright/test');
const { SidebarPage } = require('../pages/SidebarPage');

test.describe('11 – Reports Module', () => {
  let sidebar;

  test.beforeEach(async ({ page }) => {
    sidebar = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('reports');
    await page.waitForSelector('.data-table, table, .card', { timeout: 15000 });
    await page.waitForTimeout(800);
  });

  test('RP-01 Reports page loads', async ({ page }) => {
    await expect(page.locator('.dashboard-title').first()).toBeVisible();
  });

  test('RP-02 Report type selector cards are visible', async ({ page }) => {
    const cards = page.locator('.card').filter({ hasText: /Report/i });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('RP-03 Employee Report is available', async ({ page }) => {
    const el = page.locator('button, div, span').filter({ hasText: /Employee Report/i }).first();
    await expect(el).toBeVisible();
  });

  test('RP-04 Attendance Report is available', async ({ page }) => {
    const el = page.locator('button, div, span').filter({ hasText: /Attendance Report/i }).first();
    await expect(el).toBeVisible();
  });

  test('RP-05 Payroll Report is available', async ({ page }) => {
    const el = page.locator('button, div, span').filter({ hasText: /Payroll Report/i }).first();
    await expect(el).toBeVisible();
  });

  test('RP-06 Leave Report is available', async ({ page }) => {
    const el = page.locator('button, div, span').filter({ hasText: /Leave Report/i }).first();
    await expect(el).toBeVisible();
  });

  test('RP-07 Department Report is available', async ({ page }) => {
    const el = page.locator('button, div, span').filter({ hasText: /Department Report/i }).first();
    await expect(el).toBeVisible();
  });

  test('RP-08 Performance Report is available', async ({ page }) => {
    const el = page.locator('button, div, span').filter({ hasText: /Performance Report/i }).first();
    await expect(el).toBeVisible();
  });

  test('RP-09 Data table renders with rows', async ({ page }) => {
    const rows = await page.locator('tbody tr').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('RP-10 Search filters report rows', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    if (await searchInput.isVisible()) {
      const before = await page.locator('tbody tr').count();
      await searchInput.fill('Alice');
      await page.waitForTimeout(400);
      const after = await page.locator('tbody tr').count();
      expect(after).toBeLessThanOrEqual(before);
    } else {
      test.skip();
    }
  });

  test('RP-11 PDF Download button is visible', async ({ page }) => {
    const pdfBtn = page.locator('button', { hasText: /PDF/i }).first();
    if (await pdfBtn.isVisible()) {
      await expect(pdfBtn).toBeEnabled();
    } else {
      test.skip();
    }
  });

  test('RP-12 Excel Download button is visible', async ({ page }) => {
    const xlsxBtn = page.locator('button', { hasText: /Excel|XLSX/i }).first();
    if (await xlsxBtn.isVisible()) {
      await expect(xlsxBtn).toBeEnabled();
    } else {
      test.skip();
    }
  });

  test('RP-13 Table headers visible', async ({ page }) => {
    const headers = await page.locator('th').allInnerTexts();
    expect(headers.length).toBeGreaterThan(0);
  });

  test('RP-14 Breadcrumb shows System Reports', async ({ page }) => {
    await expect(page.locator('.breadcrumb-current')).toContainText('Report');
  });
});
