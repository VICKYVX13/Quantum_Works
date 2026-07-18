/**
 * MODULE 08 – Department Management Tests
 * Department data is surfaced in Employee filters, Dashboard charts,
 * and Reports. This module tests department-related functionality.
 */
const { test, expect } = require('@playwright/test');
const { SidebarPage }  = require('../pages/SidebarPage');
const { EmployeePage } = require('../pages/EmployeePage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('08 – Department Management Module', () => {
  let sidebar, emp, dashboard;

  test.beforeEach(async ({ page }) => {
    sidebar   = new SidebarPage(page);
    emp       = new EmployeePage(page);
    dashboard = new DashboardPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('DPT-01 Department Distribution chart on Dashboard', async ({ page }) => {
    await sidebar.navigateTo('dashboard');
    await dashboard.waitForLoad();
    const chart = page.locator('.chart-card', { hasText: /Department Distribution/i });
    await expect(chart).toBeVisible();
  });

  test('DPT-02 Department filter dropdown exists in Employees', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    await expect(emp.deptFilter).toBeVisible();
  });

  test('DPT-03 Department options include Engineering', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    const options = await emp.deptFilter.locator('option').allInnerTexts();
    expect(options.some(o => /Engineering/i.test(o))).toBe(true);
  });

  test('DPT-04 Department options include Marketing', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    const options = await emp.deptFilter.locator('option').allInnerTexts();
    expect(options.some(o => /Marketing/i.test(o))).toBe(true);
  });

  test('DPT-05 Department options include HR', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    const options = await emp.deptFilter.locator('option').allInnerTexts();
    expect(options.some(o => /HR|Human Resources/i.test(o))).toBe(true);
  });

  test('DPT-06 Department filter Engineering shows only Engineering employees', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    await emp.filterByDepartment('Engineering');
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    // All visible rows should be Engineering dept
    for (let i = 0; i < Math.min(count, 3); i++) {
      const rowText = await rows.nth(i).innerText();
      expect(rowText).toMatch(/Engineering/i);
    }
  });

  test('DPT-07 Departments KPI card on Dashboard', async ({ page }) => {
    await sidebar.navigateTo('dashboard');
    await dashboard.waitForLoad();
    const card = dashboard.kpiCards.filter({ hasText: /Departments/i });
    await expect(card).toBeVisible();
    const value = await card.locator('.kpi-value').innerText();
    expect(Number(value)).toBeGreaterThan(0);
  });

  test('DPT-08 Department column exists in employees table', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    const headers = await page.locator('th').allInnerTexts();
    expect(headers.some(h => /Department/i.test(h))).toBe(true);
  });

  test('DPT-09 Department dropdown in Add Employee form', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await emp.waitForLoad();
    await emp.clickAddEmployee();
    await expect(emp.deptSelect).toBeVisible();
    const opts = await emp.deptSelect.locator('option').allInnerTexts();
    expect(opts.length).toBeGreaterThan(1);
    await emp.closeModal();
  });
});
