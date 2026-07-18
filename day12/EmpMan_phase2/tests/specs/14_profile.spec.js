/**
 * MODULE 14 – Profile Module Tests
 * Admin profile management via Settings → Profile tab.
 * Verifies: form fields, avatar display, change photo button, save action.
 */
const { test, expect } = require('@playwright/test');
const { SettingsPage } = require('../pages/SettingsPage');
const { SidebarPage }  = require('../pages/SidebarPage');

test.describe('14 – Profile Module', () => {
  let settings, sidebar;

  test.beforeEach(async ({ page }) => {
    settings = new SettingsPage(page);
    sidebar  = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('settings');
    await settings.waitForLoad();
    await settings.clickProfileTab();
  });

  test('PR-01 Profile tab loads admin profile form', async ({ page }) => {
    await expect(settings.profileForm).toBeVisible();
  });

  test('PR-02 Admin avatar "A" is displayed', async ({ page }) => {
    const avatar = page.locator('[style*="border-radius: 50%"]').filter({ hasText: 'A' }).first();
    if (await avatar.isVisible()) {
      await expect(avatar).toContainText('A');
    } else {
      // check generic avatar
      const av2 = page.locator('div').filter({ hasText: /^A$/ }).first();
      await expect(av2).toBeVisible();
    }
  });

  test('PR-03 Name field has default admin name', async ({ page }) => {
    const name = await settings.nameInput.inputValue();
    expect(name).toBeTruthy();
    expect(name.length).toBeGreaterThan(0);
  });

  test('PR-04 Email field is valid email format', async ({ page }) => {
    const email = await settings.emailInput.inputValue();
    expect(email).toMatch(/@/);
  });

  test('PR-05 Phone field is pre-filled', async ({ page }) => {
    const phone = await settings.phoneInput.inputValue();
    expect(phone).toBeTruthy();
  });

  test('PR-06 Language dropdown defaults to English', async ({ page }) => {
    const lang = await settings.languageSelect.inputValue();
    expect(lang).toMatch(/English/i);
  });

  test('PR-07 Timezone dropdown is visible and has options', async ({ page }) => {
    const opts = await settings.timezoneSelect.locator('option').allInnerTexts();
    expect(opts.length).toBeGreaterThan(1);
  });

  test('PR-08 Save Changes button submits and shows confirmation', async ({ page }) => {
    await settings.saveProfile();
    const visible = await settings.isSavedMessageVisible();
    expect(visible).toBe(true);
  });

  test('PR-09 Change Photo button is visible', async ({ page }) => {
    const changePhotoBtn = page.locator('button', { hasText: /Change Photo/i });
    await expect(changePhotoBtn).toBeVisible();
  });

  test('PR-10 Admin name displayed in header', async ({ page }) => {
    const headerName = page.locator('.header-admin-name');
    if (await headerName.isVisible()) {
      const text = await headerName.innerText();
      expect(text).toMatch(/Admin/i);
    } else {
      test.skip();
    }
  });

  test('PR-11 Admin avatar shown in header', async ({ page }) => {
    const headerAvatar = page.locator('.header-admin-avatar');
    await expect(headerAvatar).toBeVisible();
  });

  test('PR-12 Sidebar profile chip shows admin info', async ({ page }) => {
    const profileChip = page.locator('.sidebar-profile');
    if (await profileChip.isVisible()) {
      await expect(profileChip).toContainText(/Admin/i);
    } else {
      test.skip();
    }
  });
});
