/**
 * AUTH SETUP – runs once, saves browser storage state so all
 * module specs can reuse the authenticated session.
 */
const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const AUTH_FILE = 'auth.json';

setup('authenticate as admin', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();

  // ── Verify Login page elements ─────────────────────────────────
  await expect(login.brandTitle).toBeVisible();
  await expect(login.loginTitle).toBeVisible();
  await expect(login.adminTab).toBeVisible();
  await expect(login.employeeTab).toBeVisible();
  await expect(login.usernameInput).toBeVisible();
  await expect(login.passwordInput).toBeVisible();
  await expect(login.submitBtn).toBeVisible();
  await expect(login.demoCredsBox).toBeVisible();

  // ── Perform admin login ────────────────────────────────────────
  await login.login('admin', 'admin', 'admin123');
  await login.waitForDashboard();

  // Verify we landed on dashboard
  await expect(page.locator('.dashboard')).toBeVisible();

  // Save authenticated storage state
  await page.context().storageState({ path: AUTH_FILE });
});
