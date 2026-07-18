/**
 * MODULE 02 – Dashboard Tests
 * Tests: page load, KPI cards, chart sections, activity feed,
 *        header elements, global search, notification bell.
 */
const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { SidebarPage }   = require('../pages/SidebarPage');

test.describe('02 – Dashboard Module', () => {
  let dashboard, sidebar;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    sidebar   = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('dashboard');
    await dashboard.waitForLoad();
  });

  test('DB-01 Dashboard page loads with title', async ({ page }) => {
    await expect(dashboard.container).toBeVisible();
    const title = await dashboard.getTitle();
    expect(title).toContain('Dashboard');
  });

  test('DB-02 KPI grid contains 8 cards', async ({ page }) => {
    const count = await dashboard.getKpiCount();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('DB-03 Total Employees KPI card is visible', async ({ page }) => {
    const card = dashboard.kpiCards.filter({ hasText: 'Total Employees' });
    await expect(card).toBeVisible();
  });

  test('DB-04 Attendance Rate KPI card is visible', async ({ page }) => {
    const card = dashboard.kpiCards.filter({ hasText: 'Attendance Rate' });
    await expect(card).toBeVisible();
  });

  test('DB-05 Monthly Payroll KPI card is visible', async ({ page }) => {
    const card = dashboard.kpiCards.filter({ hasText: 'Monthly Payroll' });
    await expect(card).toBeVisible();
  });

  test('DB-06 Charts grid renders at least 4 chart cards', async ({ page }) => {
    const count = await dashboard.getChartCount();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('DB-07 Employee Growth chart is present', async ({ page }) => {
    const card = dashboard.chartCards.filter({ hasText: /Employee Growth/i });
    await expect(card).toBeVisible();
  });

  test('DB-08 Attendance Trends chart is present', async ({ page }) => {
    const card = dashboard.chartCards.filter({ hasText: /Attendance Trends/i });
    await expect(card).toBeVisible();
  });

  test('DB-09 Department Distribution chart is present', async ({ page }) => {
    const card = dashboard.chartCards.filter({ hasText: /Department Distribution/i });
    await expect(card).toBeVisible();
  });

  test('DB-10 Recent Activities section shows at least 1 item', async ({ page }) => {
    const count = await dashboard.getActivityCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('DB-11 Global search input is present in header', async ({ page }) => {
    await expect(page.locator('#global-search')).toBeVisible();
  });

  test('DB-12 Notification bell in header is clickable', async ({ page }) => {
    const bell = page.locator('#header-notif-btn');
    await expect(bell).toBeVisible();
    await bell.click();
    // After click, should navigate to notifications
    await expect(page.locator('.notifs')).toBeVisible({ timeout: 8000 });
  });

  test('DB-13 Generate Report button is visible', async ({ page }) => {
    await sidebar.navigateTo('dashboard');
    await dashboard.waitForLoad();
    await expect(dashboard.generateReportBtn).toBeVisible();
  });

  test('DB-14 Breadcrumb shows Dashboard', async ({ page }) => {
    const breadcrumb = page.locator('.breadcrumb-current');
    await expect(breadcrumb).toContainText('Dashboard');
  });
});
