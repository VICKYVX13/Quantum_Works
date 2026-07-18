/**
 * Page Object Model – Employee Management (EmployeeDB)
 * Covers: search, filter, sort, pagination, grid/list toggle,
 *         Add/Edit/Delete/View modals, PDF download.
 */
class EmployeePage {
  constructor(page) {
    this.page = page;

    // Container
    this.container      = page.locator('.employee-db, .employees-page').first();

    // Toolbar
    this.searchInput    = page.locator('input[placeholder*="Search"]').first();
    this.gridViewBtn    = page.locator('[title*="Grid"], button[aria-label*="grid"]').first();
    this.listViewBtn    = page.locator('[title*="List"], button[aria-label*="list"]').first();
    this.addEmpBtn      = page.locator('button', { hasText: /Add.*Employee/i }).first();
    this.downloadBtn    = page.locator('button', { hasText: /Download|Export/i }).first();

    // Filters
    this.deptFilter     = page.locator('select').first();
    this.statusFilter   = page.locator('select').nth(1);

    // Table / Cards
    this.table          = page.locator('.data-table, table').first();
    this.tableRows      = page.locator('tbody tr');
    this.employeeCards  = page.locator('.emp-card');

    // Pagination
    this.prevBtn        = page.locator('button[aria-label*="Previous"], button:has(.lucide-chevron-left)').first();
    this.nextBtn        = page.locator('button[aria-label*="Next"], button:has(.lucide-chevron-right)').first();
    this.pageInfo       = page.locator('.pagination-info, [class*="page-info"]').first();

    // Modal
    this.modal          = page.locator('.modal').first();
    this.modalTitle     = page.locator('.modal-title').first();
    this.closeModalBtn  = page.locator('.modal .btn-icon[aria-label="Close"]').first();

    // Modal form fields
    this.nameInput      = page.locator('[name="name"]').first();
    this.emailInput     = page.locator('[name="email"]').first();
    this.phoneInput     = page.locator('[name="phone"]').first();
    this.deptSelect     = page.locator('[name="department"]').first();
    this.roleSelect     = page.locator('[name="role"]').first();
    this.salaryInput    = page.locator('[name="salary"]').first();
    this.locationInput  = page.locator('[name="location"]').first();
    this.joinDateInput  = page.locator('[name="joinDate"]').first();
    this.statusSelect   = page.locator('[name="status"]').first();
    this.skillsInput    = page.locator('[name="skills"]').first();
    this.saveBtn        = page.locator('button[type="submit"]').first();
  }

  async waitForLoad() {
    await this.page.waitForSelector('.data-table, .emp-card', { timeout: 20000 });
    await this.page.waitForTimeout(600);
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.page.waitForTimeout(500);
  }

  async clearSearch() {
    await this.searchInput.fill('');
    await this.page.waitForTimeout(400);
  }

  async filterByDepartment(dept) {
    await this.deptFilter.selectOption(dept);
    await this.page.waitForTimeout(400);
  }

  async filterByStatus(status) {
    await this.statusFilter.selectOption(status);
    await this.page.waitForTimeout(400);
  }

  async getTableRowCount() {
    return this.tableRows.count();
  }

  async clickAddEmployee() {
    await this.addEmpBtn.click();
    await this.modal.waitFor({ state: 'visible', timeout: 8000 });
  }

  async fillEmployeeForm(data) {
    if (data.name)     await this.nameInput.fill(data.name);
    if (data.email)    await this.emailInput.fill(data.email);
    if (data.phone)    await this.phoneInput.fill(data.phone);
    if (data.department) await this.deptSelect.selectOption(data.department);
    if (data.role)     await this.roleSelect.selectOption(data.role);
    if (data.salary)   await this.salaryInput.fill(String(data.salary));
    if (data.location) await this.locationInput.fill(data.location);
    if (data.joinDate) await this.joinDateInput.fill(data.joinDate);
    if (data.skills)   await this.skillsInput.fill(data.skills);
  }

  async submitForm() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(1500);
  }

  async closeModal() {
    await this.closeModalBtn.click();
    await this.modal.waitFor({ state: 'hidden', timeout: 5000 });
  }

  /** Click the Edit button on a specific row (0-indexed) */
  async clickEditOnRow(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    const editBtn = row.locator('button', { hasText: /Edit/i }).first();
    await editBtn.click();
    await this.modal.waitFor({ state: 'visible', timeout: 8000 });
  }

  /** Click the Delete button on a specific row (0-indexed) */
  async clickDeleteOnRow(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    const delBtn = row.locator('button', { hasText: /Delete/i }).first();
    await delBtn.click();
    await this.page.waitForTimeout(500);
  }

  /** Click the View/Eye button on a specific row */
  async clickViewOnRow(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    const viewBtn = row.locator('button').filter({ hasText: /View/i }).first();
    await viewBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickNextPage() {
    await this.nextBtn.click();
    await this.page.waitForTimeout(400);
  }

  async clickPrevPage() {
    await this.prevBtn.click();
    await this.page.waitForTimeout(400);
  }

  /** Sort table by clicking a column header */
  async sortByColumn(columnText) {
    const header = this.page.locator('th', { hasText: columnText }).first();
    await header.click();
    await this.page.waitForTimeout(400);
  }
}

module.exports = { EmployeePage };
