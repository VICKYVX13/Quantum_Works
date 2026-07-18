/**
 * MODULE 16 – Logout Tests
 * Tests: sidebar logout button, settings sign-out, session cleared,
 *        login page restored, localStorage cleared.
 * NOTE: This file runs LAST. After logout tests, session is gone.
 */
const { test, expect } = require('@playwright/test');
const { SidebarPage }  = require('../pages/SidebarPage');
const { LoginPage }    = require('../pages/LoginPage');

test.describe('16 – Logout Module', () => {
  let sidebar, login;

  test.beforeEach(async ({ page }) => {
    sidebar = new SidebarPage(page);
    login   = new LoginPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Ensure we're on dashboard (logged in via storageState)
    await page.waitForSelector('.dashboard, .sidebar', { timeout: 15000 });
  });

  test('LO-01 Logout button is visible in sidebar', async ({ page }) => {
    await expect(sidebar.logoutBtn).toBeVisible();
  });

  test('LO-02 Logout button is enabled', async ({ page }) => {
    await expect(sidebar.logoutBtn).toBeEnabled();
  });

  test('LO-03 Clicking Logout redirects to Login page', async ({ page }) => {
    await sidebar.logoutBtn.click();
    await page.waitForSelector('.login-page', { timeout: 10000 });
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('LO-04 After logout, localStorage ems_current_user is cleared', async ({ page }) => {
    await sidebar.logoutBtn.click();
    await page.waitForSelector('.login-page', { timeout: 10000 });
    const stored = await page.evaluate(() => localStorage.getItem('ems_current_user'));
    expect(stored).toBeNull();
  });

  test('LO-05 After logout, login form is shown with both tabs', async ({ page }) => {
    await sidebar.logoutBtn.click();
    await page.waitForSelector('.login-page', { timeout: 10000 });
    await expect(login.adminTab).toBeVisible();
    await expect(login.employeeTab).toBeVisible();
    await expect(login.usernameInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
  });

  test('LO-06 After logout, re-login is possible', async ({ page }) => {
    await sidebar.logoutBtn.click();
    await page.waitForSelector('.login-page', { timeout: 10000 });
    // Re-login
    await login.login('admin', 'admin', 'admin123');
    await login.waitForDashboard();
    await expect(page.locator('.dashboard')).toBeVisible();
  });

  test('LO-07 Sign Out from Settings also logs out', async ({ page }) => {
    await sidebar.navigateTo('settings');
    await page.waitForSelector('.settings', { timeout: 10000 });
    const signOutBtn = page.locator('button', { hasText: /Sign Out/i }).first();
    await signOutBtn.click();
    await page.waitForSelector('.login-page', { timeout: 10000 });
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('LO-08 Navigating to app after logout shows Login page', async ({ page }) => {
    await sidebar.logoutBtn.click();
    await page.waitForSelector('.login-page', { timeout: 10000 });
    // Reload and check
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.login-page')).toBeVisible();
  });
});
