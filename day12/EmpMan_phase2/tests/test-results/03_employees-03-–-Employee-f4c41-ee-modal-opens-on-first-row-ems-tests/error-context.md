# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03_employees.spec.js >> 03 – Employee Management Module >> EMP-09 Edit Employee modal opens on first row
- Location: specs\03_employees.spec.js:95:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('tbody tr').first().locator('button').filter({ hasText: /Edit/i }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - img [ref=e8]
        - generic [ref=e10]: EMS Pro
      - button "Toggle sidebar" [ref=e11] [cursor=pointer]:
        - img [ref=e12]
    - generic [ref=e14]:
      - generic [ref=e15]: A
      - generic [ref=e16]:
        - generic [ref=e17]: Admin User
        - generic [ref=e18]: Super Administrator
    - navigation "Main navigation" [ref=e19]:
      - button "Dashboard" [ref=e20] [cursor=pointer]:
        - img [ref=e22]
        - generic [ref=e27]: Dashboard
      - button "Employees" [active] [ref=e28] [cursor=pointer]:
        - img [ref=e30]
        - generic [ref=e35]: Employees
      - button "Attendance" [ref=e36] [cursor=pointer]:
        - img [ref=e38]
        - generic [ref=e42]: Attendance
      - button "Schedule" [ref=e43] [cursor=pointer]:
        - img [ref=e45]
        - generic [ref=e47]: Schedule
      - button "HR Module" [ref=e48] [cursor=pointer]:
        - img [ref=e50]
        - generic [ref=e53]: HR Module
      - button "Payroll" [ref=e54] [cursor=pointer]:
        - img [ref=e56]
        - generic [ref=e58]: Payroll
      - button "Analytics" [ref=e59] [cursor=pointer]:
        - img [ref=e61]
        - generic [ref=e64]: Analytics
      - button "Reports" [ref=e65] [cursor=pointer]:
        - img [ref=e67]
        - generic [ref=e70]: Reports
      - button "Notifications 2" [ref=e71] [cursor=pointer]:
        - img [ref=e73]
        - generic [ref=e76]: Notifications
        - generic [ref=e77]: "2"
      - button "Settings" [ref=e78] [cursor=pointer]:
        - img [ref=e80]
        - generic [ref=e83]: Settings
    - generic [ref=e84]:
      - generic [ref=e86]: v3.0 Enterprise
      - button "Logout" [ref=e87] [cursor=pointer]:
        - img [ref=e88]
        - generic [ref=e91]: Logout
  - generic [ref=e92]:
    - banner [ref=e93]:
      - generic [ref=e95]:
        - generic [ref=e96]: EMS Pro
        - generic [ref=e97]: /
        - generic [ref=e98]: Employees
      - generic [ref=e99]:
        - generic [ref=e100]:
          - generic:
            - img
          - textbox "Search anything..." [ref=e101]
        - button [ref=e102] [cursor=pointer]:
          - img [ref=e103]
        - generic [ref=e106] [cursor=pointer]:
          - generic [ref=e107]: A
          - generic [ref=e108]: Administrator
    - main [ref=e109]:
      - generic [ref=e110]:
        - generic [ref=e111]:
          - generic [ref=e112]:
            - heading "Employee Database" [level=1] [ref=e113]
            - paragraph [ref=e114]: Manage your workforce (53 total)
          - button "Add Employee" [ref=e115] [cursor=pointer]:
            - img [ref=e116]
            - text: Add Employee
        - generic [ref=e117]:
          - generic [ref=e118]:
            - generic:
              - img
            - textbox "Search by name, ID, or email..." [ref=e119]
          - combobox [ref=e120] [cursor=pointer]:
            - option "All Departments" [selected]
            - option "Engineering"
            - option "Marketing"
            - option "Sales"
            - option "HR"
            - option "Finance"
            - option "Design"
            - option "Operations"
            - option "Legal"
          - combobox [ref=e121] [cursor=pointer]:
            - option "All Statuses" [selected]
            - option "Active"
            - option "On Leave"
            - option "Inactive"
          - generic [ref=e122]:
            - button "Table View" [ref=e123] [cursor=pointer]:
              - img [ref=e124]
            - button "Grid View" [ref=e125] [cursor=pointer]:
              - img [ref=e126]
        - generic [ref=e131]:
          - table [ref=e132]:
            - rowgroup [ref=e133]:
              - row "Employee Department Designation Status Location Join Date Actions" [ref=e134]:
                - columnheader "Employee" [ref=e135]:
                  - generic [ref=e136] [cursor=pointer]:
                    - text: Employee
                    - img [ref=e137]
                - columnheader "Department" [ref=e139]:
                  - generic [ref=e140] [cursor=pointer]:
                    - text: Department
                    - img [ref=e141]
                - columnheader "Designation" [ref=e144]
                - columnheader "Status" [ref=e145]:
                  - generic [ref=e146] [cursor=pointer]:
                    - text: Status
                    - img [ref=e147]
                - columnheader "Location" [ref=e150]
                - columnheader "Join Date" [ref=e151]:
                  - generic [ref=e152] [cursor=pointer]:
                    - text: Join Date
                    - img [ref=e153]
                - columnheader "Actions" [ref=e156]
            - rowgroup [ref=e157]:
              - row "AK Amelia Kovacek 45 Baby Employee Active Remote 2026-07-16" [ref=e158] [cursor=pointer]:
                - cell "AK Amelia Kovacek 45" [ref=e159]:
                  - generic [ref=e160]:
                    - generic [ref=e161]: AK
                    - generic [ref=e162]:
                      - generic [ref=e163]: Amelia Kovacek
                      - generic [ref=e164]: "45"
                - cell "Baby" [ref=e165]:
                  - generic [ref=e166]: Baby
                - cell "Employee" [ref=e167]
                - cell "Active" [ref=e168]:
                  - generic [ref=e169]: Active
                - cell "Remote" [ref=e170]
                - cell "2026-07-16" [ref=e171]
                - cell [ref=e172]:
                  - generic [ref=e173]:
                    - button "View Profile" [ref=e174]:
                      - img [ref=e175]
                    - button "Edit" [ref=e178]:
                      - img [ref=e179]
                    - button "Delete" [ref=e181]:
                      - img [ref=e182]
              - row "BBI Becky Bayer IV 46 Shoes Employee Active Remote 2026-07-16" [ref=e185] [cursor=pointer]:
                - cell "BBI Becky Bayer IV 46" [ref=e186]:
                  - generic [ref=e187]:
                    - generic [ref=e188]: BBI
                    - generic [ref=e189]:
                      - generic [ref=e190]: Becky Bayer IV
                      - generic [ref=e191]: "46"
                - cell "Shoes" [ref=e192]:
                  - generic [ref=e193]: Shoes
                - cell "Employee" [ref=e194]
                - cell "Active" [ref=e195]:
                  - generic [ref=e196]: Active
                - cell "Remote" [ref=e197]
                - cell "2026-07-16" [ref=e198]
                - cell [ref=e199]:
                  - generic [ref=e200]:
                    - button "View Profile" [ref=e201]:
                      - img [ref=e202]
                    - button "Edit" [ref=e205]:
                      - img [ref=e206]
                    - button "Delete" [ref=e208]:
                      - img [ref=e209]
              - row "BG Bernard Goldner 9 Music Employee Active Remote 2026-07-16" [ref=e212] [cursor=pointer]:
                - cell "BG Bernard Goldner 9" [ref=e213]:
                  - generic [ref=e214]:
                    - generic [ref=e215]: BG
                    - generic [ref=e216]:
                      - generic [ref=e217]: Bernard Goldner
                      - generic [ref=e218]: "9"
                - cell "Music" [ref=e219]:
                  - generic [ref=e220]: Music
                - cell "Employee" [ref=e221]
                - cell "Active" [ref=e222]:
                  - generic [ref=e223]: Active
                - cell "Remote" [ref=e224]
                - cell "2026-07-16" [ref=e225]
                - cell [ref=e226]:
                  - generic [ref=e227]:
                    - button "View Profile" [ref=e228]:
                      - img [ref=e229]
                    - button "Edit" [ref=e232]:
                      - img [ref=e233]
                    - button "Delete" [ref=e235]:
                      - img [ref=e236]
              - row "BH Bill Hermiston 34 Kids Employee Active Remote 2026-07-16" [ref=e239] [cursor=pointer]:
                - cell "BH Bill Hermiston 34" [ref=e240]:
                  - generic [ref=e241]:
                    - generic [ref=e242]: BH
                    - generic [ref=e243]:
                      - generic [ref=e244]: Bill Hermiston
                      - generic [ref=e245]: "34"
                - cell "Kids" [ref=e246]:
                  - generic [ref=e247]: Kids
                - cell "Employee" [ref=e248]
                - cell "Active" [ref=e249]:
                  - generic [ref=e250]: Active
                - cell "Remote" [ref=e251]
                - cell "2026-07-16" [ref=e252]
                - cell [ref=e253]:
                  - generic [ref=e254]:
                    - button "View Profile" [ref=e255]:
                      - img [ref=e256]
                    - button "Edit" [ref=e259]:
                      - img [ref=e260]
                    - button "Delete" [ref=e262]:
                      - img [ref=e263]
              - row "BH Brett Homenick 2 Kids Employee Active Remote 2026-07-16" [ref=e266] [cursor=pointer]:
                - cell "BH Brett Homenick 2" [ref=e267]:
                  - generic [ref=e268]:
                    - generic [ref=e269]: BH
                    - generic [ref=e270]:
                      - generic [ref=e271]: Brett Homenick
                      - generic [ref=e272]: "2"
                - cell "Kids" [ref=e273]:
                  - generic [ref=e274]: Kids
                - cell "Employee" [ref=e275]
                - cell "Active" [ref=e276]:
                  - generic [ref=e277]: Active
                - cell "Remote" [ref=e278]
                - cell "2026-07-16" [ref=e279]
                - cell [ref=e280]:
                  - generic [ref=e281]:
                    - button "View Profile" [ref=e282]:
                      - img [ref=e283]
                    - button "Edit" [ref=e286]:
                      - img [ref=e287]
                    - button "Delete" [ref=e289]:
                      - img [ref=e290]
              - row "BVI Bruce Vandervort II 39 Music Employee Active Remote 2026-07-16" [ref=e293] [cursor=pointer]:
                - cell "BVI Bruce Vandervort II 39" [ref=e294]:
                  - generic [ref=e295]:
                    - generic [ref=e296]: BVI
                    - generic [ref=e297]:
                      - generic [ref=e298]: Bruce Vandervort II
                      - generic [ref=e299]: "39"
                - cell "Music" [ref=e300]:
                  - generic [ref=e301]: Music
                - cell "Employee" [ref=e302]
                - cell "Active" [ref=e303]:
                  - generic [ref=e304]: Active
                - cell "Remote" [ref=e305]
                - cell "2026-07-16" [ref=e306]
                - cell [ref=e307]:
                  - generic [ref=e308]:
                    - button "View Profile" [ref=e309]:
                      - img [ref=e310]
                    - button "Edit" [ref=e313]:
                      - img [ref=e314]
                    - button "Delete" [ref=e316]:
                      - img [ref=e317]
              - row "BKI Bryan Koch II 29 Music Employee Active Remote 2026-07-16" [ref=e320] [cursor=pointer]:
                - cell "BKI Bryan Koch II 29" [ref=e321]:
                  - generic [ref=e322]:
                    - generic [ref=e323]: BKI
                    - generic [ref=e324]:
                      - generic [ref=e325]: Bryan Koch II
                      - generic [ref=e326]: "29"
                - cell "Music" [ref=e327]:
                  - generic [ref=e328]: Music
                - cell "Employee" [ref=e329]
                - cell "Active" [ref=e330]:
                  - generic [ref=e331]: Active
                - cell "Remote" [ref=e332]
                - cell "2026-07-16" [ref=e333]
                - cell [ref=e334]:
                  - generic [ref=e335]:
                    - button "View Profile" [ref=e336]:
                      - img [ref=e337]
                    - button "Edit" [ref=e340]:
                      - img [ref=e341]
                    - button "Delete" [ref=e343]:
                      - img [ref=e344]
              - row "CE Camille Ebert 23 Home Employee Active Remote 2026-07-16" [ref=e347] [cursor=pointer]:
                - cell "CE Camille Ebert 23" [ref=e348]:
                  - generic [ref=e349]:
                    - generic [ref=e350]: CE
                    - generic [ref=e351]:
                      - generic [ref=e352]: Camille Ebert
                      - generic [ref=e353]: "23"
                - cell "Home" [ref=e354]:
                  - generic [ref=e355]: Home
                - cell "Employee" [ref=e356]
                - cell "Active" [ref=e357]:
                  - generic [ref=e358]: Active
                - cell "Remote" [ref=e359]
                - cell "2026-07-16" [ref=e360]
                - cell [ref=e361]:
                  - generic [ref=e362]:
                    - button "View Profile" [ref=e363]:
                      - img [ref=e364]
                    - button "Edit" [ref=e367]:
                      - img [ref=e368]
                    - button "Delete" [ref=e370]:
                      - img [ref=e371]
              - row "CM Carla Morissette 20 Beauty Employee Active Remote 2026-07-16" [ref=e374] [cursor=pointer]:
                - cell "CM Carla Morissette 20" [ref=e375]:
                  - generic [ref=e376]:
                    - generic [ref=e377]: CM
                    - generic [ref=e378]:
                      - generic [ref=e379]: Carla Morissette
                      - generic [ref=e380]: "20"
                - cell "Beauty" [ref=e381]:
                  - generic [ref=e382]: Beauty
                - cell "Employee" [ref=e383]
                - cell "Active" [ref=e384]:
                  - generic [ref=e385]: Active
                - cell "Remote" [ref=e386]
                - cell "2026-07-16" [ref=e387]
                - cell [ref=e388]:
                  - generic [ref=e389]:
                    - button "View Profile" [ref=e390]:
                      - img [ref=e391]
                    - button "Edit" [ref=e394]:
                      - img [ref=e395]
                    - button "Delete" [ref=e397]:
                      - img [ref=e398]
              - row "CR Carlton Reilly 22 Home Employee Active Remote 2026-07-16" [ref=e401] [cursor=pointer]:
                - cell "CR Carlton Reilly 22" [ref=e402]:
                  - generic [ref=e403]:
                    - generic [ref=e404]: CR
                    - generic [ref=e405]:
                      - generic [ref=e406]: Carlton Reilly
                      - generic [ref=e407]: "22"
                - cell "Home" [ref=e408]:
                  - generic [ref=e409]: Home
                - cell "Employee" [ref=e410]
                - cell "Active" [ref=e411]:
                  - generic [ref=e412]: Active
                - cell "Remote" [ref=e413]
                - cell "2026-07-16" [ref=e414]
                - cell [ref=e415]:
                  - generic [ref=e416]:
                    - button "View Profile" [ref=e417]:
                      - img [ref=e418]
                    - button "Edit" [ref=e421]:
                      - img [ref=e422]
                    - button "Delete" [ref=e424]:
                      - img [ref=e425]
          - generic [ref=e428]:
            - generic [ref=e429]: Showing 1 to 10 of 53 entries
            - generic [ref=e430]:
              - button "Prev" [disabled] [ref=e431] [cursor=pointer]:
                - img [ref=e432]
                - text: Prev
              - generic [ref=e434]: 1 / 6
              - button "Next" [ref=e435] [cursor=pointer]:
                - text: Next
                - img [ref=e436]
```

# Test source

```ts
  13  |     // Toolbar
  14  |     this.searchInput    = page.locator('input[placeholder*="Search"]').first();
  15  |     this.gridViewBtn    = page.locator('[title*="Grid"], button[aria-label*="grid"]').first();
  16  |     this.listViewBtn    = page.locator('[title*="List"], button[aria-label*="list"]').first();
  17  |     this.addEmpBtn      = page.locator('button', { hasText: /Add.*Employee/i }).first();
  18  |     this.downloadBtn    = page.locator('button', { hasText: /Download|Export/i }).first();
  19  | 
  20  |     // Filters
  21  |     this.deptFilter     = page.locator('select').first();
  22  |     this.statusFilter   = page.locator('select').nth(1);
  23  | 
  24  |     // Table / Cards
  25  |     this.table          = page.locator('.data-table, table').first();
  26  |     this.tableRows      = page.locator('tbody tr');
  27  |     this.employeeCards  = page.locator('.emp-card');
  28  | 
  29  |     // Pagination
  30  |     this.prevBtn        = page.locator('button[aria-label*="Previous"], button:has(.lucide-chevron-left)').first();
  31  |     this.nextBtn        = page.locator('button[aria-label*="Next"], button:has(.lucide-chevron-right)').first();
  32  |     this.pageInfo       = page.locator('.pagination-info, [class*="page-info"]').first();
  33  | 
  34  |     // Modal
  35  |     this.modal          = page.locator('.modal').first();
  36  |     this.modalTitle     = page.locator('.modal-title').first();
  37  |     this.closeModalBtn  = page.locator('.modal .btn-icon[aria-label="Close"]').first();
  38  | 
  39  |     // Modal form fields
  40  |     this.nameInput      = page.locator('[name="name"]').first();
  41  |     this.emailInput     = page.locator('[name="email"]').first();
  42  |     this.phoneInput     = page.locator('[name="phone"]').first();
  43  |     this.deptSelect     = page.locator('[name="department"]').first();
  44  |     this.roleSelect     = page.locator('[name="role"]').first();
  45  |     this.salaryInput    = page.locator('[name="salary"]').first();
  46  |     this.locationInput  = page.locator('[name="location"]').first();
  47  |     this.joinDateInput  = page.locator('[name="joinDate"]').first();
  48  |     this.statusSelect   = page.locator('[name="status"]').first();
  49  |     this.skillsInput    = page.locator('[name="skills"]').first();
  50  |     this.saveBtn        = page.locator('button[type="submit"]').first();
  51  |   }
  52  | 
  53  |   async waitForLoad() {
  54  |     await this.page.waitForSelector('.data-table, .emp-card', { timeout: 20000 });
  55  |     await this.page.waitForTimeout(600);
  56  |   }
  57  | 
  58  |   async search(term) {
  59  |     await this.searchInput.fill(term);
  60  |     await this.page.waitForTimeout(500);
  61  |   }
  62  | 
  63  |   async clearSearch() {
  64  |     await this.searchInput.fill('');
  65  |     await this.page.waitForTimeout(400);
  66  |   }
  67  | 
  68  |   async filterByDepartment(dept) {
  69  |     await this.deptFilter.selectOption(dept);
  70  |     await this.page.waitForTimeout(400);
  71  |   }
  72  | 
  73  |   async filterByStatus(status) {
  74  |     await this.statusFilter.selectOption(status);
  75  |     await this.page.waitForTimeout(400);
  76  |   }
  77  | 
  78  |   async getTableRowCount() {
  79  |     return this.tableRows.count();
  80  |   }
  81  | 
  82  |   async clickAddEmployee() {
  83  |     await this.addEmpBtn.click();
  84  |     await this.modal.waitFor({ state: 'visible', timeout: 8000 });
  85  |   }
  86  | 
  87  |   async fillEmployeeForm(data) {
  88  |     if (data.name)     await this.nameInput.fill(data.name);
  89  |     if (data.email)    await this.emailInput.fill(data.email);
  90  |     if (data.phone)    await this.phoneInput.fill(data.phone);
  91  |     if (data.department) await this.deptSelect.selectOption(data.department);
  92  |     if (data.role)     await this.roleSelect.selectOption(data.role);
  93  |     if (data.salary)   await this.salaryInput.fill(String(data.salary));
  94  |     if (data.location) await this.locationInput.fill(data.location);
  95  |     if (data.joinDate) await this.joinDateInput.fill(data.joinDate);
  96  |     if (data.skills)   await this.skillsInput.fill(data.skills);
  97  |   }
  98  | 
  99  |   async submitForm() {
  100 |     await this.saveBtn.click();
  101 |     await this.page.waitForTimeout(1500);
  102 |   }
  103 | 
  104 |   async closeModal() {
  105 |     await this.closeModalBtn.click();
  106 |     await this.modal.waitFor({ state: 'hidden', timeout: 5000 });
  107 |   }
  108 | 
  109 |   /** Click the Edit button on a specific row (0-indexed) */
  110 |   async clickEditOnRow(rowIndex) {
  111 |     const row = this.tableRows.nth(rowIndex);
  112 |     const editBtn = row.locator('button', { hasText: /Edit/i }).first();
> 113 |     await editBtn.click();
      |                   ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  114 |     await this.modal.waitFor({ state: 'visible', timeout: 8000 });
  115 |   }
  116 | 
  117 |   /** Click the Delete button on a specific row (0-indexed) */
  118 |   async clickDeleteOnRow(rowIndex) {
  119 |     const row = this.tableRows.nth(rowIndex);
  120 |     const delBtn = row.locator('button', { hasText: /Delete/i }).first();
  121 |     await delBtn.click();
  122 |     await this.page.waitForTimeout(500);
  123 |   }
  124 | 
  125 |   /** Click the View/Eye button on a specific row */
  126 |   async clickViewOnRow(rowIndex) {
  127 |     const row = this.tableRows.nth(rowIndex);
  128 |     const viewBtn = row.locator('button').filter({ hasText: /View/i }).first();
  129 |     await viewBtn.click();
  130 |     await this.page.waitForTimeout(500);
  131 |   }
  132 | 
  133 |   async clickNextPage() {
  134 |     await this.nextBtn.click();
  135 |     await this.page.waitForTimeout(400);
  136 |   }
  137 | 
  138 |   async clickPrevPage() {
  139 |     await this.prevBtn.click();
  140 |     await this.page.waitForTimeout(400);
  141 |   }
  142 | 
  143 |   /** Sort table by clicking a column header */
  144 |   async sortByColumn(columnText) {
  145 |     const header = this.page.locator('th', { hasText: columnText }).first();
  146 |     await header.click();
  147 |     await this.page.waitForTimeout(400);
  148 |   }
  149 | }
  150 | 
  151 | module.exports = { EmployeePage };
  152 | 
```