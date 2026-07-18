/**
 * MODULE 13 – Settings Module Tests
 * Tabs: Profile, Company, Notifications, Appearance (Theme), Security.
 */
const { test, expect } = require('@playwright/test');
const { SettingsPage } = require('../pages/SettingsPage');
const { SidebarPage }  = require('../pages/SidebarPage');

test.describe('13 – Settings Module', () => {
  let settings, sidebar;

  test.beforeEach(async ({ page }) => {
    settings = new SettingsPage(page);
    sidebar  = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('settings');
    await settings.waitForLoad();
  });

  test('ST-01 Settings page loads', async ({ page }) => {
    await expect(settings.container).toBeVisible();
  });

  test('ST-02 Settings side-nav has all tabs', async ({ page }) => {
    await expect(settings.profileTab).toBeVisible();
    await expect(settings.companyTab).toBeVisible();
    await expect(settings.notificationsTab).toBeVisible();
    await expect(settings.appearanceTab).toBeVisible();
    await expect(settings.securityTab).toBeVisible();
    await expect(settings.rolesTab).toBeVisible();
  });

  test('ST-03 Profile tab is active by default', async ({ page }) => {
    await expect(settings.profileTab).toHaveClass(/active/);
  });

  test('ST-04 Profile form loads with admin details', async ({ page }) => {
    await expect(settings.nameInput).toBeVisible();
    await expect(settings.emailInput).toBeVisible();
  });

  test('ST-05 Update profile name and save shows success', async ({ page }) => {
    const origName = await settings.nameInput.inputValue();
    await settings.updateProfileName('Updated Admin Name');
    await settings.saveProfile();
    const visible = await settings.isSavedMessageVisible();
    expect(visible).toBe(true);
    // Restore
    await settings.updateProfileName(origName);
    await settings.saveProfile();
  });

  test('ST-06 Company tab loads company settings form', async ({ page }) => {
    await settings.clickCompanyTab();
    const content = await settings.container.innerText();
    expect(content).toMatch(/Company|Industry|Currency/i);
  });

  test('ST-07 Notifications tab shows toggle preferences', async ({ page }) => {
    await settings.clickNotificationsTab();
    const content = await settings.container.innerText();
    expect(content).toMatch(/Notification|Leave|Payroll/i);
  });

  test('ST-08 Appearance tab loads theme settings', async ({ page }) => {
    await settings.clickAppearanceTab();
    const content = await settings.container.innerText();
    expect(content).toMatch(/Appearance|Theme|Dark|Light/i);
  });

  test('ST-09 Theme toggle button is functional', async ({ page }) => {
    await settings.clickAppearanceTab();
    const toggleBtn = page.locator('button', { hasText: /Toggle|Dark|Light|Switch/i }).first();
    if (await toggleBtn.isVisible()) {
      const themeAttrBefore = await page.locator('html').getAttribute('data-theme');
      await toggleBtn.click();
      await page.waitForTimeout(400);
      const themeAttrAfter = await page.locator('html').getAttribute('data-theme');
      expect(themeAttrAfter).not.toBe(themeAttrBefore);
    } else {
      test.skip();
    }
  });

  test('ST-10 Security tab loads change password form', async ({ page }) => {
    await settings.clickSecurityTab();
    const content = await settings.container.innerText();
    expect(content).toMatch(/Password|Security|Current|New/i);
  });

  test('ST-11 Roles & Permissions tab loads', async ({ page }) => {
    await settings.clickRolesTab();
    const content = await settings.container.innerText();
    expect(content).toMatch(/Role|Permission|Admin/i);
  });

  test('ST-12 Sign Out button is in settings sidenav', async ({ page }) => {
    await expect(settings.signOutBtn).toBeVisible();
  });

  test('ST-13 Breadcrumb shows System Settings', async ({ page }) => {
    await expect(page.locator('.breadcrumb-current')).toContainText('Settings');
  });
});
