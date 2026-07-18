/**
 * MODULE 09 – Roles & Permissions Tests
 * Roles & Permissions is managed inside Settings → "Roles & Permissions" tab.
 */
const { test, expect } = require('@playwright/test');
const { SettingsPage } = require('../pages/SettingsPage');
const { SidebarPage }  = require('../pages/SidebarPage');

test.describe('09 – Roles & Permissions Module', () => {
  let settings, sidebar;

  test.beforeEach(async ({ page }) => {
    settings = new SettingsPage(page);
    sidebar  = new SidebarPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await sidebar.navigateTo('settings');
    await settings.waitForLoad();
    await settings.clickRolesTab();
  });

  test('RP-01 Roles & Permissions tab is accessible', async ({ page }) => {
    await expect(settings.rolesTab).toBeVisible();
  });

  test('RP-02 Roles section renders content', async ({ page }) => {
    await expect(settings.container).toBeVisible();
    const content = await settings.container.innerText();
    expect(content).toMatch(/Role|Permission|Admin|Employee/i);
  });

  test('RP-03 Admin role is listed', async ({ page }) => {
    const content = await settings.container.innerText();
    expect(content).toMatch(/Admin/i);
  });

  test('RP-04 Employee role is listed', async ({ page }) => {
    const content = await settings.container.innerText();
    expect(content).toMatch(/Employee/i);
  });

  test('RP-05 Roles tab in settings sidenav has correct id', async ({ page }) => {
    await expect(page.locator('#settings-tab-roles')).toBeVisible();
  });

  test('RP-06 Role designations visible in Employee form dropdown', async ({ page }) => {
    await sidebar.navigateTo('employees');
    await page.waitForSelector('.data-table, table', { timeout: 20000 });
    const addBtn = page.locator('button', { hasText: /Add.*Employee/i }).first();
    await addBtn.click();
    const roleSelect = page.locator('[name="role"]').first();
    await expect(roleSelect).toBeVisible();
    const opts = await roleSelect.locator('option').allInnerTexts();
    expect(opts.length).toBeGreaterThan(1);
    // Close modal
    await page.locator('.modal .btn-icon[aria-label="Close"]').first().click();
  });
});
