/**
 * Page Object Model – Attendance Module
 * Tabs: Daily Attendance, Pending Leave Requests
 * Features: KPI cards, search, dept filter, status filter, approve/reject leave.
 */
class AttendancePage {
  constructor(page) {
    this.page = page;

    this.container         = page.locator('.attendance');
    this.pageTitle         = page.locator('.dashboard-title').first();

    // Tabs
    this.attendanceTab     = page.locator('.tab-btn', { hasText: /Daily Attendance/i });
    this.leaveTab          = page.locator('.tab-btn', { hasText: /Leave Requests/i });

    // KPI cards
    this.kpiCards          = page.locator('.kpi-card');

    // Search / Filter bar
    this.searchInput       = page.locator('input[placeholder*="Search"]').first();
    this.deptFilter        = page.locator('select').first();
    this.statusFilter      = page.locator('select').nth(1);

    // Attendance roster table
    this.rosterTable       = page.locator('.data-table, table').first();
    this.rosterRows        = page.locator('tbody tr');

    // Leave request rows
    this.leaveRows         = page.locator('tbody tr');
    this.approveButtons    = page.locator('button', { hasText: /Approve/i });
    this.rejectButtons     = page.locator('button', { hasText: /Reject/i });
  }

  async waitForLoad() {
    await this.container.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(800);
  }

  async clickAttendanceTab() {
    await this.attendanceTab.click();
    await this.page.waitForTimeout(500);
  }

  async clickLeaveTab() {
    await this.leaveTab.click();
    await this.page.waitForTimeout(500);
  }

  async search(term) {
    await this.searchInput.fill(term);
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

  async getKpiCount() {
    return this.kpiCards.count();
  }

  async getRosterRowCount() {
    return this.rosterRows.count();
  }

  async getLeaveRowCount() {
    return this.leaveRows.count();
  }

  async approveFirstPendingLeave() {
    await this.approveButtons.first().click();
    await this.page.waitForTimeout(600);
  }

  async rejectFirstPendingLeave() {
    await this.rejectButtons.first().click();
    await this.page.waitForTimeout(600);
  }

  /** Read the date badge visible in the header */
  async getDateBadgeText() {
    return this.page.locator('.current-time-badge').innerText();
  }
}

module.exports = { AttendancePage };
