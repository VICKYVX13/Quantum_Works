/**
 * Page Object Model – Sidebar Navigation
 * Handles all nav-item clicks, logout, sidebar toggle, profile chip.
 */
class SidebarPage {
  constructor(page) {
    this.page = page;

    this.sidebarEl      = page.locator('aside.sidebar');
    this.toggleBtn      = page.locator('#sidebar-toggle-btn');
    this.logoutBtn      = page.locator('#logout-btn');
    this.logoText       = page.locator('.sidebar-logo-text');
    this.profileName    = page.locator('.sidebar-profile-name');
    this.profileRole    = page.locator('.sidebar-profile-role');
    this.versionBadge   = page.locator('.sidebar-version');
    this.notifBadge     = page.locator('.nav-badge');
  }

  /** Click a navigation item by its id (e.g. 'dashboard', 'employees') */
  async navigateTo(viewId) {
    const btn = this.page.locator(`#nav-${viewId}`);
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
    // Brief settle
    await this.page.waitForTimeout(600);
  }

  async toggleSidebar() {
    await this.toggleBtn.click();
    await this.page.waitForTimeout(400);
  }

  async isSidebarOpen() {
    return this.sidebarEl.evaluate(el => el.classList.contains('sidebar-open'));
  }

  async logout() {
    await this.logoutBtn.click();
    await this.page.waitForSelector('.login-page', { timeout: 10000 });
  }

  /** Read sidebar profile chip name */
  async getProfileName() {
    return this.profileName.innerText();
  }

  /** Get badge count on notifications nav item */
  async getNotifBadgeCount() {
    try {
      return parseInt(await this.notifBadge.first().innerText(), 10);
    } catch {
      return 0;
    }
  }

  /** Verify a nav item is visible */
  async isNavItemVisible(viewId) {
    return this.page.locator(`#nav-${viewId}`).isVisible();
  }
}

module.exports = { SidebarPage };
