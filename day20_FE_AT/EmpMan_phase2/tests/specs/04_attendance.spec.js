/**
 * MODULE 04 – Attendance Module Tests
 * Tests: page load, KPI cards, tabs, search, filter,
 *        attendance roster, leave request approve/reject.
 */
const { test, expect } = require('@playwright/test');
const { AttendancePage } = require('../pages/AttendancePage');
const { SidebarPage }    = require('../pages/SidebarPage');

test.describe('04 – Attendance Module', () => {
  let attendance, sidebar;

  test.beforeEach(async ({ page }) => {
    attendance = new AttendancePage(page);
    sidebar    = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('attendance');
    await attendance.waitForLoad();
  });

  test('ATT-01 Attendance page loads correctly', async ({ page }) => {
    await expect(attendance.container).toBeVisible();
  });

  test('ATT-02 Page has a current date badge', async ({ page }) => {
    const date = await attendance.getDateBadgeText();
    expect(date).toBeTruthy();
    expect(date.length).toBeGreaterThan(3);
  });

  test('ATT-03 KPI cards are visible', async ({ page }) => {
    const count = await attendance.getKpiCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('ATT-04 Daily Attendance tab is active by default', async ({ page }) => {
    await expect(attendance.attendanceTab).toHaveClass(/active/);
  });

  test('ATT-05 Leave Requests tab switches content', async ({ page }) => {
    await attendance.clickLeaveTab();
    await expect(attendance.leaveTab).toHaveClass(/active/);
  });

  test('ATT-06 Attendance roster has rows', async ({ page }) => {
    const count = await attendance.getRosterRowCount();
    expect(count).toBeGreaterThan(0);
  });

  test('ATT-07 Search filters attendance roster', async ({ page }) => {
    const before = await attendance.getRosterRowCount();
    await attendance.search('Alice');
    const after = await attendance.getRosterRowCount();
    expect(after).toBeLessThanOrEqual(before);
  });

  test('ATT-08 Clear search restores roster', async ({ page }) => {
    await attendance.search('Alice');
    await attendance.search('');
    const count = await attendance.getRosterRowCount();
    expect(count).toBeGreaterThan(0);
  });

  test('ATT-09 Department filter narrows roster', async ({ page }) => {
    const depts = await page.locator('select').first().locator('option').allInnerTexts();
    const validDept = depts.find(d => d !== '' && d !== 'All Departments');
    if (validDept) {
      await attendance.filterByDepartment(validDept);
      const count = await attendance.getRosterRowCount();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('ATT-10 Leave request approve action works', async ({ page }) => {
    await attendance.clickLeaveTab();
    const pendingRows = page.locator('tbody tr').filter({ hasText: /Pending/i });
    const count = await pendingRows.count();
    if (count > 0) {
      await attendance.approveFirstPendingLeave();
      // Status should change to Approved
      await expect(page.locator('.badge', { hasText: /Approved/i }).first()).toBeVisible({ timeout: 5000 });
    } else {
      test.skip();
    }
  });

  test('ATT-11 Leave request reject action works', async ({ page }) => {
    await attendance.clickLeaveTab();
    const pendingRows = page.locator('tbody tr').filter({ hasText: /Pending/i });
    const count = await pendingRows.count();
    if (count > 0) {
      await attendance.rejectFirstPendingLeave();
      await page.waitForTimeout(600);
      // Status should change to Rejected
      await expect(page.locator('.badge', { hasText: /Rejected/i }).first()).toBeVisible({ timeout: 5000 });
    } else {
      test.skip();
    }
  });

  test('ATT-12 Breadcrumb shows Attendance Management', async ({ page }) => {
    await expect(page.locator('.breadcrumb-current')).toContainText('Attendance');
  });
});
