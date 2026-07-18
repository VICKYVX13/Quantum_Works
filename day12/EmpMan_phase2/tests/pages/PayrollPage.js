/**
 * Page Object Model – Payroll Module
 * Features: payroll table, search, payslip modal, PDF download,
 *           XLSX export, pagination, status badges.
 */
class PayrollPage {
  constructor(page) {
    this.page = page;

    this.container       = page.locator('.payroll, [class*="payroll"]').first();
    this.pageTitle       = page.locator('.dashboard-title').first();

    // Toolbar
    this.searchInput     = page.locator('input[placeholder*="Search"]').first();
    this.exportXlsxBtn   = page.locator('button', { hasText: /Excel|XLSX|Export/i }).first();
    this.exportPdfBtn    = page.locator('button', { hasText: /PDF/i }).first();
    this.runPayrollBtn   = page.locator('button', { hasText: /Run Payroll|Process/i }).first();

    // Table
    this.table           = page.locator('.data-table, table').first();
    this.tableRows       = page.locator('tbody tr');

    // Pagination
    this.prevBtn         = page.locator('button:has(.lucide-chevron-left)').first();
    this.nextBtn         = page.locator('button:has(.lucide-chevron-right)').first();

    // Payslip modal
    this.payslipModal    = page.locator('.modal, [class*="modal"]').first();
    this.closeModal      = page.locator('.modal .btn-icon[aria-label="Close"], button[aria-label="Close"]').first();
    this.downloadPdfBtn  = page.locator('button', { hasText: /Download.*PDF|PDF/i }).first();

    // Summary KPI cards
    this.kpiCards        = page.locator('.kpi-card');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.data-table, table', { timeout: 20000 });
    await this.page.waitForTimeout(800);
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.page.waitForTimeout(400);
  }

  async getRowCount() {
    return this.tableRows.count();
  }

  /** Open payslip modal for a given row index */
  async openPayslip(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    const viewBtn = row.locator('button', { hasText: /Payslip|View/i }).first();
    await viewBtn.click();
    await this.payslipModal.waitFor({ state: 'visible', timeout: 8000 });
  }

  async closePayslipModal() {
    await this.closeModal.click();
    await this.page.waitForTimeout(400);
  }

  async clickNextPage() {
    await this.nextBtn.click();
    await this.page.waitForTimeout(400);
  }

  async getStatusBadgeTextOnRow(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    return row.locator('.badge').last().innerText();
  }

  async getPayslipEmployeeName() {
    return this.payslipModal.locator('h2, h3').first().innerText();
  }
}

module.exports = { PayrollPage };
