/**
 * Page Object Model – HR Module
 * Sub-sections: Recruitment, Onboarding, Leave, Performance, Training, Announcements.
 */
class HRPage {
  constructor(page) {
    this.page = page;

    this.container     = page.locator('.hr-module, [class*="hr"]').first();
    this.pageTitle     = page.locator('.dashboard-title').first();

    // Sub-nav tabs (buttons on left/top)
    this.navItems      = page.locator('.hr-nav-item');

    // Add Candidate button
    this.addCandidateBtn = page.locator('button', { hasText: /Add Candidate/i });

    // Table rows in candidate tracking
    this.tableRows     = page.locator('tbody tr');

    // Checklist items (onboarding / offboarding)
    this.checklistItems = page.locator('.checklist-item, [class*="task"]');

    // Announcement textarea / form
    this.announcementArea = page.locator('textarea').first();
    this.postBtn       = page.locator('button', { hasText: /Post|Submit|Announce/i }).first();
  }

  async waitForLoad() {
    await this.page.waitForSelector('.hr-nav-item, [class*="hr-nav"]', { timeout: 15000 });
    await this.page.waitForTimeout(600);
  }

  async clickSubNav(labelText) {
    const btn = this.navItems.filter({ hasText: labelText });
    await btn.click();
    await this.page.waitForTimeout(500);
  }

  async getNavCount() {
    return this.navItems.count();
  }

  async getTableRowCount() {
    return this.tableRows.count();
  }

  async clickAddCandidate() {
    await this.addCandidateBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.addCandidateBtn.click();
    await this.page.waitForTimeout(400);
  }

  async clickViewOnRow(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    await row.locator('button', { hasText: /View/i }).click();
    await this.page.waitForTimeout(400);
  }

  async clickScheduleInterviewOnRow(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    await row.locator('button', { hasText: /Schedule/i }).click();
    await this.page.waitForTimeout(400);
  }
}

module.exports = { HRPage };
