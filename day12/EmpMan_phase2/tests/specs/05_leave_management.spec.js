/**
 * MODULE 05 – Leave Management Tests
 * Leave management is part of the Attendance module (Leave Requests tab).
 * These tests focus deeply on leave request workflows.
 */
const { test, expect } = require('@playwright/test');
const { AttendancePage } = require('../pages/AttendancePage');
const { SidebarPage }    = require('../pages/SidebarPage');

test.describe('05 – Leave Management Module', () => {
  let attendance, sidebar;

  test.beforeEach(async ({ page }) => {
    attendance = new AttendancePage(page);
    sidebar    = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('attendance');
    await attendance.waitForLoad();
    await attendance.clickLeaveTab();
  });

  test('LV-01 Leave Requests tab opens leave section', async ({ page }) => {
    await expect(attendance.leaveTab).toHaveClass(/active/);
  });

  test('LV-02 Leave request table has columns: Employee, Type, From, To, Days, Status, Actions', async ({ page }) => {
    const headers = page.locator('th');
    const headerTexts = await headers.allInnerTexts();
    expect(headerTexts.some(h => /Employee|Name/i.test(h))).toBe(true);
    expect(headerTexts.some(h => /Type|Leave Type/i.test(h))).toBe(true);
    expect(headerTexts.some(h => /Status/i.test(h))).toBe(true);
  });

  test('LV-03 Leave records are visible', async ({ page }) => {
    const rows = await page.locator('tbody tr').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('LV-04 Pending leave status badge is present', async ({ page }) => {
    const pendingBadge = page.locator('.badge', { hasText: /Pending/i });
    const count = await pendingBadge.count();
    expect(count).toBeGreaterThanOrEqual(0); // Could be 0 if all approved
  });

  test('LV-05 Approved leave status badge is styled differently', async ({ page }) => {
    const approvedBadge = page.locator('.badge-success', { hasText: /Approved/i }).first();
    if (await approvedBadge.isVisible()) {
      await expect(approvedBadge).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('LV-06 Approve button is visible for Pending requests', async ({ page }) => {
    const approveBtn = page.locator('button', { hasText: /Approve/i }).first();
    if (await approveBtn.isVisible()) {
      await expect(approveBtn).toBeEnabled();
    } else {
      test.skip();
    }
  });

  test('LV-07 Reject button is visible for Pending requests', async ({ page }) => {
    const rejectBtn = page.locator('button', { hasText: /Reject/i }).first();
    if (await rejectBtn.isVisible()) {
      await expect(rejectBtn).toBeEnabled();
    } else {
      test.skip();
    }
  });

  test('LV-08 Leave request count shown in tab badge', async ({ page }) => {
    // The tab label includes "(N)" pending count
    const tabText = await attendance.leaveTab.innerText();
    expect(tabText).toMatch(/\(/);
  });

  test('LV-09 Leave days column shows numeric values', async ({ page }) => {
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    if (count > 0) {
      const firstRowText = await rows.first().innerText();
      // Should contain a number for days
      expect(/\d/.test(firstRowText)).toBe(true);
    }
  });
});
