/**
 * Page Object Model – Login Page
 * Covers: Admin tab, Employee tab, username/password inputs,
 *         toggle password visibility, error messages, submit.
 */
class LoginPage {
  constructor(page) {
    this.page = page;

    // --- Tabs ---
    this.adminTab    = page.locator('#admin-login-tab');
    this.employeeTab = page.locator('#employee-login-tab');

    // --- Form fields ---
    this.usernameInput = page.locator('#login-username');
    this.passwordInput = page.locator('#login-password');
    this.submitBtn     = page.locator('#login-submit-btn');
    this.errorMsg      = page.locator('.login-error');

    // --- Brand / UI elements ---
    this.brandTitle    = page.locator('.login-brand-title');
    this.loginTitle    = page.locator('.login-title');
    this.demoCredsBox  = page.locator('.login-demo-creds');
  }

  /** Navigate to the app root */
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  /** Select the Admin tab */
  async selectAdminTab() {
    await this.adminTab.click();
  }

  /** Select the Employee tab */
  async selectEmployeeTab() {
    await this.employeeTab.click();
  }

  /**
   * Perform a full login
   * @param {'admin'|'employee'} role
   * @param {string} username
   * @param {string} password
   */
  async login(role, username, password) {
    if (role === 'admin') {
      await this.selectAdminTab();
    } else {
      await this.selectEmployeeTab();
    }
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }

  /** Wait until the Dashboard is visible (post-login redirect) */
  async waitForDashboard() {
    await this.page.waitForSelector('.dashboard', { timeout: 15000 });
  }

  /** Wait until the ESS Dashboard is visible (employee login) */
  async waitForESSDashboard() {
    await this.page.waitForSelector('.ess-dashboard, [id="nav-ess-dashboard"]', { timeout: 15000 });
  }

  /** Retrieve visible error message text */
  async getErrorText() {
    await this.errorMsg.waitFor({ state: 'visible', timeout: 8000 });
    return this.errorMsg.innerText();
  }

  /** Check if submit button is in loading state */
  async isLoading() {
    return (await this.submitBtn.innerText()).includes('Signing');
  }
}

module.exports = { LoginPage };
