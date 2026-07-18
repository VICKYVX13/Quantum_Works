/**
 * MODULE 12 – Notifications Module Tests
 * Tests: page load, KPI summary cards, unread/read lists,
 *        individual mark-read, mark-all-read, notification types.
 */
const { test, expect } = require('@playwright/test');
const { NotificationsPage } = require('../pages/NotificationsPage');
const { SidebarPage }       = require('../pages/SidebarPage');

test.describe('12 – Notifications Module', () => {
  let notif, sidebar;

  test.beforeEach(async ({ page }) => {
    notif   = new NotificationsPage(page);
    sidebar = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('notifications');
    await notif.waitForLoad();
  });

  test('NF-01 Notifications page loads', async ({ page }) => {
    await expect(notif.container).toBeVisible();
    const title = await notif.pageTitle.innerText();
    expect(title).toMatch(/Notification/i);
  });

  test('NF-02 KPI summary cards are present', async ({ page }) => {
    const count = await notif.getKpiCount();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('NF-03 Warnings KPI card is visible', async ({ page }) => {
    const card = notif.kpiCards.filter({ hasText: /Warnings/i });
    await expect(card).toBeVisible();
  });

  test('NF-04 Success KPI card is visible', async ({ page }) => {
    const card = notif.kpiCards.filter({ hasText: /Success/i });
    await expect(card).toBeVisible();
  });

  test('NF-05 Info KPI card is visible', async ({ page }) => {
    const card = notif.kpiCards.filter({ hasText: /Info/i });
    await expect(card).toBeVisible();
  });

  test('NF-06 Alerts KPI card is visible', async ({ page }) => {
    const card = notif.kpiCards.filter({ hasText: /Alerts/i });
    await expect(card).toBeVisible();
  });

  test('NF-07 Notification cards are rendered', async ({ page }) => {
    const count = await notif.getTotalNotifCount();
    expect(count).toBeGreaterThan(0);
  });

  test('NF-08 Unread notifications have Mark Read button', async ({ page }) => {
    const unreadCount = await notif.getUnreadCount();
    if (unreadCount > 0) {
      await expect(notif.markReadBtns.first()).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('NF-09 Mark Read button works on first unread notification', async ({ page }) => {
    const before = await notif.getUnreadCount();
    if (before > 0) {
      await notif.markFirstAsRead();
      const after = await notif.getUnreadCount();
      expect(after).toBeLessThan(before);
    } else {
      test.skip();
    }
  });

  test('NF-10 Mark All as Read button visible when unread > 0', async ({ page }) => {
    const unreadCount = await notif.getUnreadCount();
    if (unreadCount > 0) {
      await expect(notif.markAllReadBtn).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('NF-11 Mark All as Read clears all unread', async ({ page }) => {
    const before = await notif.getUnreadCount();
    if (before > 0) {
      await notif.markAllRead();
      await page.waitForTimeout(600);
      const after = await notif.getUnreadCount();
      expect(after).toBe(0);
    } else {
      test.skip();
    }
  });

  test('NF-12 Notification card shows title and message', async ({ page }) => {
    const firstCard = notif.notifCards.first();
    const cardText  = await firstCard.innerText();
    expect(cardText.length).toBeGreaterThan(5);
  });

  test('NF-13 Notification card shows time', async ({ page }) => {
    const timeEl = page.locator('.notif-time').first();
    await expect(timeEl).toBeVisible();
    const text = await timeEl.innerText();
    expect(text).toMatch(/ago|hour|day|min/i);
  });

  test('NF-14 Bell icon in header navigates to notifications', async ({ page }) => {
    await sidebar.navigateTo('dashboard');
    await page.locator('#header-notif-btn').click();
    await expect(notif.container).toBeVisible({ timeout: 8000 });
  });

  test('NF-15 Breadcrumb shows System Notifications', async ({ page }) => {
    await expect(page.locator('.breadcrumb-current')).toContainText('Notification');
  });
});
