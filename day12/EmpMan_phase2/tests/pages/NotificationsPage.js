/**
 * Page Object Model – Notifications Module
 * Features: unread/read lists, KPI summary cards, mark read, mark all read.
 */
class NotificationsPage {
  constructor(page) {
    this.page = page;

    this.container       = page.locator('.notifs');
    this.pageTitle       = page.locator('.dashboard-title').first();
    this.pageSubtitle    = page.locator('.dashboard-subtitle').first();
    this.markAllReadBtn  = page.locator('#mark-all-read-btn');

    // KPI summary cards
    this.kpiCards        = page.locator('.kpi-card');

    // Notification cards
    this.notifCards      = page.locator('.notif-card');
    this.unreadCards     = page.locator('.notif-card:not(.notif-read)');
    this.readCards       = page.locator('.notif-card.notif-read');

    // "Mark Read" buttons on individual cards
    this.markReadBtns    = page.locator('button', { hasText: /Mark Read/i });
  }

  async waitForLoad() {
    await this.container.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(500);
  }

  async getKpiCount() {
    return this.kpiCards.count();
  }

  async getTotalNotifCount() {
    return this.notifCards.count();
  }

  async getUnreadCount() {
    return this.unreadCards.count();
  }

  async getReadCount() {
    return this.readCards.count();
  }

  async markFirstAsRead() {
    await this.markReadBtns.first().click();
    await this.page.waitForTimeout(400);
  }

  async markAllRead() {
    if (await this.markAllReadBtn.isVisible()) {
      await this.markAllReadBtn.click();
      await this.page.waitForTimeout(400);
    }
  }

  async getSubtitleText() {
    return this.pageSubtitle.innerText();
  }
}

module.exports = { NotificationsPage };
