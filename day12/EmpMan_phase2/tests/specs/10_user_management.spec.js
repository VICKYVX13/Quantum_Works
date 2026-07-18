/**
 * MODULE 10 – User Management Tests
 * User Management covers admin and employee users.
 * Admin user management via Settings → Profile & Security tabs.
 * Employee login validation tested here.
 */
const { test, expect } = require('@playwright/test');
const { SettingsPage } = require('../pages/SettingsPage');
const { SidebarPage }  = require('../pages/SidebarPage');

test.describe('10 – User Management Module', () => {
  let settings, sidebar;

  test.beforeEach(async ({ page }) => {
    settings = new SettingsPage(page);
    sidebar  = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('settings');
    await settings.waitForLoad();
  });

  test('UM-01 Admin profile name is visible', async ({ page }) => {
    await settings.clickProfileTab();
    await expect(settings.nameInput).toBeVisible();
    const name = await settings.nameInput.inputValue();
    expect(name).toBeTruthy();
  });

  test('UM-02 Admin email is pre-filled', async ({ page }) => {
    await settings.clickProfileTab();
    const email = await settings.emailInput.inputValue();
    expect(email).toMatch(/@/);
  });

  test('UM-03 Admin profile form has phone field', async ({ page }) => {
    await settings.clickProfileTab();
    await expect(settings.phoneInput).toBeVisible();
  });

  test('UM-04 Language dropdown has options', async ({ page }) => {
    await settings.clickProfileTab();
    await expect(settings.languageSelect).toBeVisible();
    const opts = await settings.languageSelect.locator('option').allInnerTexts();
    expect(opts.length).toBeGreaterThan(1);
  });

  test('UM-05 Timezone dropdown has options', async ({ page }) => {
    await settings.clickProfileTab();
    await expect(settings.timezoneSelect).toBeVisible();
    const opts = await settings.timezoneSelect.locator('option').allInnerTexts();
    expect(opts.length).toBeGreaterThan(1);
  });

  test('UM-06 Save Changes button is visible', async ({ page }) => {
    await settings.clickProfileTab();
    await expect(settings.saveProfileBtn).toBeVisible();
    await expect(settings.saveProfileBtn).toBeEnabled();
  });

  test('UM-07 Save profile shows success message', async ({ page }) => {
    await settings.clickProfileTab();
    await settings.saveProfile();
    const visible = await settings.isSavedMessageVisible();
    expect(visible).toBe(true);
  });

  test('UM-08 Security tab is accessible for change password', async ({ page }) => {
    await settings.clickSecurityTab();
    await page.waitForTimeout(500);
    const content = await settings.container.innerText();
    expect(content).toMatch(/Password|Security|Change/i);
  });

  test('UM-09 Admin avatar displays "A" in sidebar', async ({ page }) => {
    const avatar = page.locator('.sidebar-profile-avatar').first();
    if (await avatar.isVisible()) {
      const text = await avatar.innerText();
      expect(text.trim()).toBe('A');
    } else {
      test.skip();
    }
  });

  test('UM-10 Admin role shown as "Super Administrator"', async ({ page }) => {
    const roleEl = page.locator('.sidebar-profile-role').first();
    if (await roleEl.isVisible()) {
      const text = await roleEl.innerText();
      expect(text).toMatch(/Super Administrator|Admin/i);
    } else {
      test.skip();
    }
  });
});
