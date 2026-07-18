# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03_employees.spec.js >> 03 – Employee Management Module >> EMP-02 Search by employee name filters results
- Location: specs\03_employees.spec.js:27:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('tbody tr').first()
Expected substring: "Alice"
Received string:    "AKAmelia Kovacek45BabyEmployeeActiveRemote2026-07-16"
Timeout: 15000ms

Call log:
  - Expect "toContainText" with timeout 15000ms
  - waiting for locator('tbody tr').first()
    33 × locator resolved to <tr class="emp-row">…</tr>
       - unexpected value "AKAmelia Kovacek45BabyEmployeeActiveRemote2026-07-16"

```

```yaml
- row "AK Amelia Kovacek 45 Baby Employee Active Remote 2026-07-16":
  - cell "AK Amelia Kovacek 45"
  - cell "Baby"
  - cell "Employee"
  - cell "Active"
  - cell "Remote"
  - cell "2026-07-16"
  - cell:
    - button "View Profile"
    - button "Edit"
    - button "Delete"
```

# Test source

```ts
  1   | /**
  2   |  * MODULE 03 – Employee Management Tests
  3   |  * Tests: table render, search, dept/status filter, add employee (CRUD),
  4   |  *        edit employee, delete, view, pagination, sort, grid/list toggle.
  5   |  */
  6   | const { test, expect } = require('@playwright/test');
  7   | const { EmployeePage } = require('../pages/EmployeePage');
  8   | const { SidebarPage }  = require('../pages/SidebarPage');
  9   | 
  10  | test.describe('03 – Employee Management Module', () => {
  11  |   let emp, sidebar;
  12  | 
  13  |   test.beforeEach(async ({ page }) => {
  14  |     emp     = new EmployeePage(page);
  15  |     sidebar = new SidebarPage(page);
  16  |     await page.goto('/');
  17  |     await page.waitForLoadState('networkidle');
  18  |     await sidebar.navigateTo('employees');
  19  |     await emp.waitForLoad();
  20  |   });
  21  | 
  22  |   test('EMP-01 Employee table renders with data', async ({ page }) => {
  23  |     const count = await emp.getTableRowCount();
  24  |     expect(count).toBeGreaterThan(0);
  25  |   });
  26  | 
  27  |   test('EMP-02 Search by employee name filters results', async ({ page }) => {
  28  |     const beforeCount = await emp.getTableRowCount();
  29  |     await emp.search('Alice');
  30  |     const afterCount = await emp.getTableRowCount();
  31  |     expect(afterCount).toBeLessThanOrEqual(beforeCount);
  32  |     // Visible rows should contain "Alice"
  33  |     const firstRow = page.locator('tbody tr').first();
> 34  |     await expect(firstRow).toContainText('Alice');
      |                            ^ Error: expect(locator).toContainText(expected) failed
  35  |   });
  36  | 
  37  |   test('EMP-03 Clearing search restores full list', async ({ page }) => {
  38  |     await emp.search('Alice');
  39  |     const filtered = await emp.getTableRowCount();
  40  |     await emp.clearSearch();
  41  |     const full = await emp.getTableRowCount();
  42  |     expect(full).toBeGreaterThanOrEqual(filtered);
  43  |   });
  44  | 
  45  |   test('EMP-04 Filter by department narrows results', async ({ page }) => {
  46  |     const before = await emp.getTableRowCount();
  47  |     await emp.filterByDepartment('Engineering');
  48  |     const after = await emp.getTableRowCount();
  49  |     expect(after).toBeLessThanOrEqual(before);
  50  |   });
  51  | 
  52  |   test('EMP-05 Add New Employee modal opens', async ({ page }) => {
  53  |     await emp.clickAddEmployee();
  54  |     await expect(emp.modal).toBeVisible();
  55  |     const title = await emp.modalTitle.innerText();
  56  |     expect(title).toMatch(/Add/i);
  57  |   });
  58  | 
  59  |   test('EMP-06 Add Employee form has required fields', async ({ page }) => {
  60  |     await emp.clickAddEmployee();
  61  |     await expect(emp.nameInput).toBeVisible();
  62  |     await expect(emp.emailInput).toBeVisible();
  63  |     await expect(emp.deptSelect).toBeVisible();
  64  |     await expect(emp.roleSelect).toBeVisible();
  65  |   });
  66  | 
  67  |   test('EMP-07 Submit empty Add Employee form shows validation', async ({ page }) => {
  68  |     await emp.clickAddEmployee();
  69  |     await emp.saveBtn.click();
  70  |     // HTML5 required validation fires
  71  |     const isInvalid = await emp.nameInput.evaluate(el => !el.validity.valid);
  72  |     expect(isInvalid).toBe(true);
  73  |   });
  74  | 
  75  |   test('EMP-08 Add new employee successfully', async ({ page }) => {
  76  |     const beforeCount = await emp.getTableRowCount();
  77  |     await emp.clickAddEmployee();
  78  |     await emp.fillEmployeeForm({
  79  |       name:       'Test Playwright',
  80  |       email:      'test.playwright@emspro.com',
  81  |       phone:      '+1-555-9999',
  82  |       department: 'Engineering',
  83  |       role:       'Software Engineer',
  84  |       salary:     '75000',
  85  |       location:   'Test City',
  86  |       joinDate:   '2026-01-01',
  87  |       skills:     'Playwright, Automation',
  88  |     });
  89  |     await emp.submitForm();
  90  |     // Row count should increase or stay same (API mock may differ)
  91  |     const afterCount = await emp.getTableRowCount();
  92  |     expect(afterCount).toBeGreaterThanOrEqual(beforeCount);
  93  |   });
  94  | 
  95  |   test('EMP-09 Edit Employee modal opens on first row', async ({ page }) => {
  96  |     await emp.clickEditOnRow(0);
  97  |     await expect(emp.modal).toBeVisible();
  98  |     const title = await emp.modalTitle.innerText();
  99  |     expect(title).toMatch(/Edit/i);
  100 |   });
  101 | 
  102 |   test('EMP-10 Close modal with X button', async ({ page }) => {
  103 |     await emp.clickAddEmployee();
  104 |     await emp.closeModal();
  105 |     await expect(emp.modal).toBeHidden();
  106 |   });
  107 | 
  108 |   test('EMP-11 Pagination – Next button navigates pages', async ({ page }) => {
  109 |     // Only test if pagination controls exist
  110 |     if (await emp.nextBtn.isVisible()) {
  111 |       const firstPageText = await page.locator('tbody tr').first().innerText();
  112 |       await emp.clickNextPage();
  113 |       const secondPageText = await page.locator('tbody tr').first().innerText();
  114 |       expect(firstPageText).not.toBe(secondPageText);
  115 |     } else {
  116 |       test.skip();
  117 |     }
  118 |   });
  119 | 
  120 |   test('EMP-12 Sort by Name column works', async ({ page }) => {
  121 |     await emp.sortByColumn('Name');
  122 |     await page.waitForTimeout(300);
  123 |     // Row count should remain same
  124 |     const count = await emp.getTableRowCount();
  125 |     expect(count).toBeGreaterThan(0);
  126 |   });
  127 | 
  128 |   test('EMP-13 Breadcrumb shows Employees', async ({ page }) => {
  129 |     const bc = page.locator('.breadcrumb-current');
  130 |     await expect(bc).toContainText('Employees');
  131 |   });
  132 | });
  133 | 
```