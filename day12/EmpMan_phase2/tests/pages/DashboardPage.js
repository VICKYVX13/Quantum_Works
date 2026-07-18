/**
 * Page Object Model – Dashboard
 * KPI cards, charts, activity feed, "Generate Report" button.
 */
class DashboardPage {
  constructor(page) {
    this.page = page;

    this.container        = page.locator('.dashboard');
    this.pageTitle        = page.locator('.dashboard-title').first();
    this.pageSubtitle     = page.locator('.dashboard-subtitle').first();
    this.generateReportBtn = page.locator('button', { hasText: 'Generate Report' });

    // KPI cards
    this.kpiGrid          = page.locator('.kpi-grid').first();
    this.kpiCards         = page.locator('.kpi-card');

    // Chart cards
    this.chartsGrid       = page.locator('.charts-grid');
    this.chartCards       = page.locator('.chart-card');

    // Recent activities
    this.activityList     = page.locator('.activity-list');
    this.activityItems    = page.locator('.activity-item');
  }

  async waitForLoad() {
    await this.container.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(1000); // let charts render
  }

  async getTitle() {
    return this.pageTitle.innerText();
  }

  async getKpiCount() {
    return this.kpiCards.count();
  }

  /** Get value from a KPI card by title text */
  async getKpiValue(titleText) {
    const card = this.kpiCards.filter({ hasText: titleText });
    return card.locator('.kpi-value').innerText();
  }

  async getChartCount() {
    return this.chartCards.count();
  }

  async getActivityCount() {
    return this.activityItems.count();
  }

  async clickGenerateReport() {
    await this.generateReportBtn.click();
  }
}

module.exports = { DashboardPage };
