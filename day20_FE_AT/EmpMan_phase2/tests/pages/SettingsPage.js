/**
 * Page Object Model – Settings Module
 * Tabs: Profile, Company, Notifications, Appearance, Security (Change Password), Roles & Permissions.
 */
class SettingsPage {
  constructor(page) {
    this.page = page;

    this.container     = page.locator('.settings');
    this.pageTitle     = page.locator('.dashboard-title').first();

    // Side-nav tabs
    this.profileTab      = page.locator('#settings-tab-profile');
    this.companyTab      = page.locator('#settings-tab-company');
    this.notificationsTab = page.locator('#settings-tab-notifications');
    this.appearanceTab   = page.locator('#settings-tab-appearance');
    this.securityTab     = page.locator('#settings-tab-security');
    this.rolesTab        = page.locator('#settings-tab-roles');

    // Profile form
    this.profileForm     = page.locator('#admin-profile-form');
    this.nameInput       = page.locator('[name="name"]').first();
    this.emailInput      = page.locator('[name="email"]').first();
    this.phoneInput      = page.locator('[name="phone"]').first();
    this.languageSelect  = page.locator('[name="language"]').first();
    this.timezoneSelect  = page.locator('[name="timezone"]').first();
    this.saveProfileBtn  = page.locator('#save-profile-btn');
    this.savedMessage    = page.locator('span', { hasText: /Saved successfully/i });

    // Security / Change password form
    this.currentPwdInput  = page.locator('[name="currentPassword"], [placeholder*="Current"], [placeholder*="current"]').first();
    this.newPwdInput      = page.locator('[name="newPassword"], [placeholder*="New password"], [placeholder*="new password"]').first();
    this.confirmPwdInput  = page.locator('[name="confirmPassword"], [placeholder*="Confirm"]').first();
    this.changePwdBtn     = page.locator('button', { hasText: /Change Password|Update Password/i }).first();

    // Theme toggle
    this.themeToggle      = page.locator('button', { hasText: /Toggle|Dark|Light|Theme/i }).first();

    // Sign out button inside settings
    this.signOutBtn       = page.locator('button', { hasText: /Sign Out/i });
  }

  async waitForLoad() {
    await this.container.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(500);
  }

  async clickProfileTab() {
    await this.profileTab.click();
    await this.page.waitForTimeout(400);
  }

  async clickCompanyTab() {
    await this.companyTab.click();
    await this.page.waitForTimeout(400);
  }

  async clickNotificationsTab() {
    await this.notificationsTab.click();
    await this.page.waitForTimeout(400);
  }

  async clickAppearanceTab() {
    await this.appearanceTab.click();
    await this.page.waitForTimeout(400);
  }

  async clickSecurityTab() {
    await this.securityTab.click();
    await this.page.waitForTimeout(400);
  }

  async clickRolesTab() {
    await this.rolesTab.click();
    await this.page.waitForTimeout(400);
  }

  async updateProfileName(name) {
    await this.nameInput.fill('');
    await this.nameInput.fill(name);
  }

  async saveProfile() {
    await this.saveProfileBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async isSavedMessageVisible() {
    return this.savedMessage.isVisible();
  }

  async clickThemeToggle() {
    if (await this.themeToggle.isVisible()) {
      await this.themeToggle.click();
      await this.page.waitForTimeout(400);
    }
  }

  async clickSignOut() {
    await this.signOutBtn.click();
    await this.page.waitForSelector('.login-page', { timeout: 10000 });
  }
}

module.exports = { SettingsPage };
