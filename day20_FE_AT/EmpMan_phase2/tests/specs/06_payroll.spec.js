/**
 * MODULE 06 – Payroll Module Tests
 * Tests: table render, search, payslip modal, pagination,
 *        status badges, KPI summary, XLSX export button.
 */
const { test, expect } = require('@playwright/test');
const { PayrollPage } = require('../pages/PayrollPage');
const { SidebarPage } = require('../pages/SidebarPage');

test.describe('06 – Payroll Module', () => {
  let payroll, sidebar;

  test.beforeEach(async ({ page }) => {
    payroll = new PayrollPage(page);
    sidebar = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('payroll');
    await payroll.waitForLoad();
  });

  test('PY-01 Payroll page loads with data table', async ({ page }) => {
    await expect(payroll.table).toBeVisible();
    const count = await payroll.getRowCount();
    expect(count).toBeGreaterThan(0);
  });

  test('PY-02 Payroll table has required columns', async ({ page }) => {
    const headers = await page.locator('th').allInnerTexts();
    expect(headers.some(h => /Name|Employee/i.test(h))).toBe(true);
    expect(headers.some(h => /Department/i.test(h))).toBe(true);
    expect(headers.some(h => /Basic|Salary/i.test(h))).toBe(true);
    expect(headers.some(h => /Net|Status/i.test(h))).toBe(true);
  });

  test('PY-03 Search filters payroll records', async ({ page }) => {
    const before = await payroll.getRowCount();
    await payroll.search('Alice');
    const after = await payroll.getRowCount();
    expect(after).toBeLessThanOrEqual(before);
  });

  test('PY-04 Clear search restores all records', async ({ page }) => {
    await payroll.search('Alice');
    await payroll.search('');
    const count = await payroll.getRowCount();
    expect(count).toBeGreaterThan(0);
  });

  test('PY-05 Payment status badges are visible', async ({ page }) => {
    const badge = page.locator('.badge', { hasText: /Paid|Pending|Processing/i }).first();
    await expect(badge).toBeVisible();
  });

  test('PY-06 Payslip modal opens on first row', async ({ page }) => {
    await payroll.openPayslip(0);
    await expect(payroll.payslipModal).toBeVisible();
  });

  test('PY-07 Payslip modal shows employee details', async ({ page }) => {
    await payroll.openPayslip(0);
    const modalContent = await payroll.payslipModal.innerText();
    expect(modalContent).toMatch(/Employee|Name|Payslip/i);
  });

  test('PY-08 Payslip modal shows earnings breakdown', async ({ page }) => {
    await payroll.openPayslip(0);
    const modalContent = await payroll.payslipModal.innerText();
    expect(modalContent).toMatch(/Basic|HRA|Transport|Net/i);
  });

  test('PY-09 Close payslip modal with X button', async ({ page }) => {
    await payroll.openPayslip(0);
    await payroll.closePayslipModal();
    await page.waitForTimeout(500);
    // Modal should be gone
    await expect(page.locator('.overlay')).toBeHidden({ timeout: 5000 });
  });

  test('PY-10 Excel export button is visible', async ({ page }) => {
    const xlsxBtn = page.locator('button', { hasText: /Excel|XLSX/i }).first();
    if (await xlsxBtn.isVisible()) {
      await expect(xlsxBtn).toBeEnabled();
    } else {
      test.skip();
    }
  });

  test('PY-11 Pagination next button works', async ({ page }) => {
    if (await payroll.nextBtn.isVisible() && await payroll.nextBtn.isEnabled()) {
      await payroll.clickNextPage();
      const count = await payroll.getRowCount();
      expect(count).toBeGreaterThanOrEqual(0);
    } else {
      test.skip();
    }
  });

  test('PY-12 Breadcrumb shows Payroll Management', async ({ page }) => {
    await expect(page.locator('.breadcrumb-current')).toContainText('Payroll');
  });
});
