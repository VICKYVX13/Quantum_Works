/**
 * Page Object Model – Reports Module
 * Report types: Employee, Attendance, Payroll, Leave, Department, Performance.
 * Features: report type selector, search, table data, PDF/XLSX download.
 */
class ReportsPage {
  constructor(page) {
    this.page = page;

    this.container       = page.locator('.reports, [class*="report"]').first();
    this.pageTitle       = page.locator('.dashboard-title').first();

    // Report type selector cards / buttons
    this.reportTypeCards = page.locator('.report-type-card, .card').filter({ hasText: /Report/i });
    this.reportTypeBtns  = page.locator('button, div[class*="type"]').filter({ hasText: /Employee Report|Attendance Report|Payroll Report|Leave Report|Department Report|Performance Report/i });

    // Search input
    this.searchInput     = page.locator('input[placeholder*="Search"]').first();

    // Table
    this.table           = page.locator('.data-table, table').first();
    this.tableRows       = page.locator('tbody tr');
    this.tableHeaders    = page.locator('th');

    // Download buttons
    this.downloadPdfBtn  = page.locator('button', { hasText: /PDF/i }).first();
    this.downloadXlsxBtn = page.locator('button', { hasText: /Excel|XLSX/i }).first();

    // Filter dropdowns
    this.filterDropdowns = page.locator('select');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.data-table, table, .report-type-card, .card', { timeout: 15000 });
    await this.page.waitForTimeout(600);
  }

  async selectReportType(labelText) {
    // Try clicking a card or button containing the label text
    const selector = page => page.locator('button, div[role="button"], .card').filter({ hasText: labelText }).first();
    await selector(this.page).click();
    await this.page.waitForTimeout(400);
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.page.waitForTimeout(400);
  }

  async getTableRowCount() {
    return this.tableRows.count();
  }

  async getHeaderCount() {
    return this.tableHeaders.count();
  }

  async clickDownloadPdf() {
    await this.downloadPdfBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async clickDownloadXlsx() {
    await this.downloadXlsxBtn.click();
    await this.page.waitForTimeout(1000);
  }
}

module.exports = { ReportsPage };
