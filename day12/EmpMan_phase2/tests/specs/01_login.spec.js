/**
 * MODULE 01 – Login Page Tests
 * Tests: page load, tab switching, admin login success,
 *        invalid credentials error, toggle password visibility.
 */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// These tests run WITHOUT storageState (fresh page)
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('01 – Login Module', () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    // Clear localStorage to force login page
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('LG-01 Login page loads with all required elements', async ({ page }) => {
    await expect(login.brandTitle).toBeVisible();
    await expect(login.loginTitle).toHaveText('Sign in to EMS Pro');
    await expect(login.adminTab).toBeVisible();
    await expect(login.employeeTab).toBeVisible();
    await expect(login.usernameInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
    await expect(login.submitBtn).toBeVisible();
    await expect(login.demoCredsBox).toBeVisible();
  });

  test('LG-02 Admin tab is active by default', async ({ page }) => {
    await expect(login.adminTab).toHaveClass(/active/);
    const placeholder = await login.usernameInput.getAttribute('placeholder');
    expect(placeholder).toBe('admin');
  });

  test('LG-03 Switching to Employee tab changes input type to email', async ({ page }) => {
    await login.selectEmployeeTab();
    await expect(login.employeeTab).toHaveClass(/active/);
    const type = await login.usernameInput.getAttribute('type');
    expect(type).toBe('email');
  });

  test('LG-04 Submit with empty fields shows HTML5 validation', async ({ page }) => {
    await login.submitBtn.click();
    // Browser native validation prevents submission
    const isInvalid = await login.usernameInput.evaluate(el => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('LG-05 Invalid admin credentials show error message', async ({ page }) => {
    await login.login('admin', 'wronguser', 'wrongpass');
    const errText = await login.getErrorText();
    expect(errText).toContain('Invalid');
  });

  test('LG-06 Successful admin login redirects to Dashboard', async ({ page }) => {
    await login.login('admin', 'admin', 'admin123');
    await login.waitForDashboard();
    await expect(page.locator('.dashboard')).toBeVisible();
  });

  test('LG-07 Password field masks input by default', async ({ page }) => {
    const type = await login.passwordInput.getAttribute('type');
    expect(type).toBe('password');
  });

  test('LG-08 Demo credentials box shows correct admin creds', async ({ page }) => {
    const text = await login.demoCredsBox.innerText();
    expect(text).toContain('admin');
    expect(text).toContain('admin123');
  });
});
