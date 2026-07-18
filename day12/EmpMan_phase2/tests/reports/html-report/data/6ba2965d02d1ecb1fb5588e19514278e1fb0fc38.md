# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 06_payroll.spec.js >> 06 – Payroll Module >> PY-09 Close payslip modal with X button
- Location: specs\06_payroll.spec.js:72:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('.modal .btn-icon[aria-label="Close"], button[aria-label="Close"]').first()

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
      - button "Employees" [ref=e28] [cursor=pointer]:
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
        - generic [ref=e98]: Payroll Management
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
            - heading "Payroll Management" [level=1] [ref=e113]
            - paragraph [ref=e114]: Salary details, payslips, and payment processing
          - generic [ref=e115]:
            - button "Export Excel" [ref=e116] [cursor=pointer]:
              - img [ref=e117]
              - text: Export Excel
            - button "Run Payroll" [ref=e120] [cursor=pointer]:
              - img [ref=e121]
              - text: Run Payroll
        - generic [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]: Total Monthly Payroll
              - img [ref=e127]
            - generic [ref=e131]: $2774K
          - generic [ref=e132]:
            - generic [ref=e133]:
              - generic [ref=e134]: Paid
              - img [ref=e136]
            - generic [ref=e140]: "33"
          - generic [ref=e141]:
            - generic [ref=e142]:
              - generic [ref=e143]: Pending
              - img [ref=e145]
            - generic [ref=e149]: "10"
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]: Avg Net Salary
              - img [ref=e154]
            - generic [ref=e158]: $52,332
        - generic [ref=e159]:
          - generic [ref=e160]:
            - heading "Employee Salary Details — July 2026" [level=3] [ref=e161]
            - generic [ref=e162]:
              - generic [ref=e163]:
                - generic:
                  - img
                - textbox "Search employee..." [ref=e164]
              - combobox [ref=e165] [cursor=pointer]:
                - option "All Status" [selected]
                - option "Paid"
                - option "Pending"
                - option "Processing"
          - table [ref=e167]:
            - rowgroup [ref=e168]:
              - row "Employee Department Basic Allowances Bonus Deductions Net Salary Status Actions" [ref=e169]:
                - columnheader "Employee" [ref=e170]
                - columnheader "Department" [ref=e171]
                - columnheader "Basic" [ref=e172]
                - columnheader "Allowances" [ref=e173]
                - columnheader "Bonus" [ref=e174]
                - columnheader "Deductions" [ref=e175]
                - columnheader "Net Salary" [ref=e176]
                - columnheader "Status" [ref=e177]
                - columnheader "Actions" [ref=e178]
            - rowgroup [ref=e179]:
              - row "MRP Myrtle Rice PhD 1 Grocery $50,000 $12,500 +$5,000 -$14,900 $55,100 Paid Payslip" [ref=e180]:
                - cell "MRP Myrtle Rice PhD 1" [ref=e181]:
                  - generic [ref=e182]:
                    - generic [ref=e183]: MRP
                    - generic [ref=e184]:
                      - generic [ref=e185]: Myrtle Rice PhD
                      - generic [ref=e186]: "1"
                - cell "Grocery" [ref=e187]:
                  - generic [ref=e188]: Grocery
                - cell "$50,000" [ref=e189]
                - cell "$12,500" [ref=e190]
                - cell "+$5,000" [ref=e191]
                - cell "-$14,900" [ref=e192]
                - cell "$55,100" [ref=e193]
                - cell "Paid" [ref=e194]:
                  - generic [ref=e195]: Paid
                - cell "Payslip" [ref=e196]:
                  - button "Payslip" [active] [ref=e197] [cursor=pointer]:
                    - img [ref=e198]
                    - text: Payslip
              - row "BH Brett Homenick 2 Kids $50,000 $12,500 — -$14,000 $48,500 Paid Payslip" [ref=e201]:
                - cell "BH Brett Homenick 2" [ref=e202]:
                  - generic [ref=e203]:
                    - generic [ref=e204]: BH
                    - generic [ref=e205]:
                      - generic [ref=e206]: Brett Homenick
                      - generic [ref=e207]: "2"
                - cell "Kids" [ref=e208]:
                  - generic [ref=e209]: Kids
                - cell "$50,000" [ref=e210]
                - cell "$12,500" [ref=e211]
                - cell "—" [ref=e212]
                - cell "-$14,000" [ref=e213]
                - cell "$48,500" [ref=e214]
                - cell "Paid" [ref=e215]:
                  - generic [ref=e216]: Paid
                - cell "Payslip" [ref=e217]:
                  - button "Payslip" [ref=e218] [cursor=pointer]:
                    - img [ref=e219]
                    - text: Payslip
              - row "CZ Chester Zemlak 3 Toys $50,000 $12,500 — -$14,000 $48,500 Paid Payslip" [ref=e222]:
                - cell "CZ Chester Zemlak 3" [ref=e223]:
                  - generic [ref=e224]:
                    - generic [ref=e225]: CZ
                    - generic [ref=e226]:
                      - generic [ref=e227]: Chester Zemlak
                      - generic [ref=e228]: "3"
                - cell "Toys" [ref=e229]:
                  - generic [ref=e230]: Toys
                - cell "$50,000" [ref=e231]
                - cell "$12,500" [ref=e232]
                - cell "—" [ref=e233]
                - cell "-$14,000" [ref=e234]
                - cell "$48,500" [ref=e235]
                - cell "Paid" [ref=e236]:
                  - generic [ref=e237]: Paid
                - cell "Payslip" [ref=e238]:
                  - button "Payslip" [ref=e239] [cursor=pointer]:
                    - img [ref=e240]
                    - text: Payslip
              - row "JS Jordan Schulist 4 Books $50,000 $12,500 +$5,000 -$14,600 $52,900 Pending Payslip" [ref=e243]:
                - cell "JS Jordan Schulist 4" [ref=e244]:
                  - generic [ref=e245]:
                    - generic [ref=e246]: JS
                    - generic [ref=e247]:
                      - generic [ref=e248]: Jordan Schulist
                      - generic [ref=e249]: "4"
                - cell "Books" [ref=e250]:
                  - generic [ref=e251]: Books
                - cell "$50,000" [ref=e252]
                - cell "$12,500" [ref=e253]
                - cell "+$5,000" [ref=e254]
                - cell "-$14,600" [ref=e255]
                - cell "$52,900" [ref=e256]
                - cell "Pending" [ref=e257]:
                  - generic [ref=e258]: Pending
                - cell "Payslip" [ref=e259]:
                  - button "Payslip" [ref=e260] [cursor=pointer]:
                    - img [ref=e261]
                    - text: Payslip
              - row "OF Oliver Franecki 5 Games $50,000 $12,500 — -$14,000 $48,500 Processing Payslip" [ref=e264]:
                - cell "OF Oliver Franecki 5" [ref=e265]:
                  - generic [ref=e266]:
                    - generic [ref=e267]: OF
                    - generic [ref=e268]:
                      - generic [ref=e269]: Oliver Franecki
                      - generic [ref=e270]: "5"
                - cell "Games" [ref=e271]:
                  - generic [ref=e272]: Games
                - cell "$50,000" [ref=e273]
                - cell "$12,500" [ref=e274]
                - cell "—" [ref=e275]
                - cell "-$14,000" [ref=e276]
                - cell "$48,500" [ref=e277]
                - cell "Processing" [ref=e278]:
                  - generic [ref=e279]: Processing
                - cell "Payslip" [ref=e280]:
                  - button "Payslip" [ref=e281] [cursor=pointer]:
                    - img [ref=e282]
                    - text: Payslip
              - row "j joyal 6 Engineering $123,444 $30,861 — -$34,570 $125,907 Paid Payslip" [ref=e285]:
                - cell "j joyal 6" [ref=e286]:
                  - generic [ref=e287]:
                    - generic [ref=e288]: j
                    - generic [ref=e289]:
                      - generic [ref=e290]: joyal
                      - generic [ref=e291]: "6"
                - cell "Engineering" [ref=e292]:
                  - generic [ref=e293]: Engineering
                - cell "$123,444" [ref=e294]
                - cell "$30,861" [ref=e295]
                - cell "—" [ref=e296]
                - cell "-$34,570" [ref=e297]
                - cell "$125,907" [ref=e298]
                - cell "Paid" [ref=e299]:
                  - generic [ref=e300]: Paid
                - cell "Payslip" [ref=e301]:
                  - button "Payslip" [ref=e302] [cursor=pointer]:
                    - img [ref=e303]
                    - text: Payslip
              - row "LZ Leon Zboncak 7 Kids $50,000 $12,500 +$5,000 -$14,600 $52,900 Paid Payslip" [ref=e306]:
                - cell "LZ Leon Zboncak 7" [ref=e307]:
                  - generic [ref=e308]:
                    - generic [ref=e309]: LZ
                    - generic [ref=e310]:
                      - generic [ref=e311]: Leon Zboncak
                      - generic [ref=e312]: "7"
                - cell "Kids" [ref=e313]:
                  - generic [ref=e314]: Kids
                - cell "$50,000" [ref=e315]
                - cell "$12,500" [ref=e316]
                - cell "+$5,000" [ref=e317]
                - cell "-$14,600" [ref=e318]
                - cell "$52,900" [ref=e319]
                - cell "Paid" [ref=e320]:
                  - generic [ref=e321]: Paid
                - cell "Payslip" [ref=e322]:
                  - button "Payslip" [ref=e323] [cursor=pointer]:
                    - img [ref=e324]
                    - text: Payslip
              - row "FB Flora Barton 8 Jewelry $50,000 $12,500 — -$14,000 $48,500 Paid Payslip" [ref=e327]:
                - cell "FB Flora Barton 8" [ref=e328]:
                  - generic [ref=e329]:
                    - generic [ref=e330]: FB
                    - generic [ref=e331]:
                      - generic [ref=e332]: Flora Barton
                      - generic [ref=e333]: "8"
                - cell "Jewelry" [ref=e334]:
                  - generic [ref=e335]: Jewelry
                - cell "$50,000" [ref=e336]
                - cell "$12,500" [ref=e337]
                - cell "—" [ref=e338]
                - cell "-$14,000" [ref=e339]
                - cell "$48,500" [ref=e340]
                - cell "Paid" [ref=e341]:
                  - generic [ref=e342]: Paid
                - cell "Payslip" [ref=e343]:
                  - button "Payslip" [ref=e344] [cursor=pointer]:
                    - img [ref=e345]
                    - text: Payslip
              - row "BG Bernard Goldner 9 Music $50,000 $12,500 — -$14,000 $48,500 Pending Payslip" [ref=e348]:
                - cell "BG Bernard Goldner 9" [ref=e349]:
                  - generic [ref=e350]:
                    - generic [ref=e351]: BG
                    - generic [ref=e352]:
                      - generic [ref=e353]: Bernard Goldner
                      - generic [ref=e354]: "9"
                - cell "Music" [ref=e355]:
                  - generic [ref=e356]: Music
                - cell "$50,000" [ref=e357]
                - cell "$12,500" [ref=e358]
                - cell "—" [ref=e359]
                - cell "-$14,000" [ref=e360]
                - cell "$48,500" [ref=e361]
                - cell "Pending" [ref=e362]:
                  - generic [ref=e363]: Pending
                - cell "Payslip" [ref=e364]:
                  - button "Payslip" [ref=e365] [cursor=pointer]:
                    - img [ref=e366]
                    - text: Payslip
              - row "DMK Dr. Mabel Kling 10 Books $50,000 $12,500 +$5,000 -$14,600 $52,900 Processing Payslip" [ref=e369]:
                - cell "DMK Dr. Mabel Kling 10" [ref=e370]:
                  - generic [ref=e371]:
                    - generic [ref=e372]: DMK
                    - generic [ref=e373]:
                      - generic [ref=e374]: Dr. Mabel Kling
                      - generic [ref=e375]: "10"
                - cell "Books" [ref=e376]:
                  - generic [ref=e377]: Books
                - cell "$50,000" [ref=e378]
                - cell "$12,500" [ref=e379]
                - cell "+$5,000" [ref=e380]
                - cell "-$14,600" [ref=e381]
                - cell "$52,900" [ref=e382]
                - cell "Processing" [ref=e383]:
                  - generic [ref=e384]: Processing
                - cell "Payslip" [ref=e385]:
                  - button "Payslip" [ref=e386] [cursor=pointer]:
                    - img [ref=e387]
                    - text: Payslip
          - generic [ref=e390]:
            - generic [ref=e391]: Showing 1 to 10 of 53
            - generic [ref=e392]:
              - button "Prev" [disabled] [ref=e393] [cursor=pointer]:
                - img [ref=e394]
                - text: Prev
              - generic [ref=e396]: 1 / 6
              - button "Next" [ref=e397] [cursor=pointer]:
                - text: Next
                - img [ref=e398]
        - generic [ref=e401]:
          - generic [ref=e402]:
            - heading "Payslip — July 2026" [level=2] [ref=e403]
            - button [ref=e404] [cursor=pointer]:
              - img [ref=e405]
          - generic [ref=e408]:
            - generic [ref=e409]: Myrtle Rice PhD
            - generic [ref=e410]: Employee • Grocery
            - generic [ref=e411]: "ID: 1 • Bank: ****2558"
          - generic [ref=e412]:
            - generic [ref=e413]:
              - generic [ref=e414]: Earnings
              - generic [ref=e415]:
                - generic [ref=e416]: Basic Salary
                - generic [ref=e417]: $50,000
              - generic [ref=e418]:
                - generic [ref=e419]: HRA
                - generic [ref=e420]: $10,000
              - generic [ref=e421]:
                - generic [ref=e422]: Transport
                - generic [ref=e423]: $2,500
              - generic [ref=e424]:
                - generic [ref=e425]: Bonus
                - generic [ref=e426]: $5,000
              - generic [ref=e427]:
                - generic [ref=e428]: Overtime
                - generic [ref=e429]: $2,500
              - generic [ref=e430]:
                - generic [ref=e431]: Gross Salary
                - generic [ref=e432]: $70,000
            - generic [ref=e433]:
              - generic [ref=e434]: Deductions
              - generic [ref=e435]:
                - generic [ref=e436]: Income Tax
                - generic [ref=e437]: "-$8,400"
              - generic [ref=e438]:
                - generic [ref=e439]: Provident Fund
                - generic [ref=e440]: "-$6,000"
              - generic [ref=e441]:
                - generic [ref=e442]: Insurance
                - generic [ref=e443]: "-$500"
          - generic [ref=e444]:
            - generic [ref=e445]: Net Salary
            - generic [ref=e446]: $55,100
          - generic [ref=e447]:
            - button "Close" [ref=e448] [cursor=pointer]
            - button "Download PDF" [ref=e449] [cursor=pointer]:
              - img [ref=e450]
              - text: Download PDF
```

# Test source

```ts
  1  | /**
  2  |  * Page Object Model – Payroll Module
  3  |  * Features: payroll table, search, payslip modal, PDF download,
  4  |  *           XLSX export, pagination, status badges.
  5  |  */
  6  | class PayrollPage {
  7  |   constructor(page) {
  8  |     this.page = page;
  9  | 
  10 |     this.container       = page.locator('.payroll, [class*="payroll"]').first();
  11 |     this.pageTitle       = page.locator('.dashboard-title').first();
  12 | 
  13 |     // Toolbar
  14 |     this.searchInput     = page.locator('input[placeholder*="Search"]').first();
  15 |     this.exportXlsxBtn   = page.locator('button', { hasText: /Excel|XLSX|Export/i }).first();
  16 |     this.exportPdfBtn    = page.locator('button', { hasText: /PDF/i }).first();
  17 |     this.runPayrollBtn   = page.locator('button', { hasText: /Run Payroll|Process/i }).first();
  18 | 
  19 |     // Table
  20 |     this.table           = page.locator('.data-table, table').first();
  21 |     this.tableRows       = page.locator('tbody tr');
  22 | 
  23 |     // Pagination
  24 |     this.prevBtn         = page.locator('button:has(.lucide-chevron-left)').first();
  25 |     this.nextBtn         = page.locator('button:has(.lucide-chevron-right)').first();
  26 | 
  27 |     // Payslip modal
  28 |     this.payslipModal    = page.locator('.modal, [class*="modal"]').first();
  29 |     this.closeModal      = page.locator('.modal .btn-icon[aria-label="Close"], button[aria-label="Close"]').first();
  30 |     this.downloadPdfBtn  = page.locator('button', { hasText: /Download.*PDF|PDF/i }).first();
  31 | 
  32 |     // Summary KPI cards
  33 |     this.kpiCards        = page.locator('.kpi-card');
  34 |   }
  35 | 
  36 |   async waitForLoad() {
  37 |     await this.page.waitForSelector('.data-table, table', { timeout: 20000 });
  38 |     await this.page.waitForTimeout(800);
  39 |   }
  40 | 
  41 |   async search(term) {
  42 |     await this.searchInput.fill(term);
  43 |     await this.page.waitForTimeout(400);
  44 |   }
  45 | 
  46 |   async getRowCount() {
  47 |     return this.tableRows.count();
  48 |   }
  49 | 
  50 |   /** Open payslip modal for a given row index */
  51 |   async openPayslip(rowIndex) {
  52 |     const row = this.tableRows.nth(rowIndex);
  53 |     const viewBtn = row.locator('button', { hasText: /Payslip|View/i }).first();
  54 |     await viewBtn.click();
  55 |     await this.payslipModal.waitFor({ state: 'visible', timeout: 8000 });
  56 |   }
  57 | 
  58 |   async closePayslipModal() {
> 59 |     await this.closeModal.click();
     |                           ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  60 |     await this.page.waitForTimeout(400);
  61 |   }
  62 | 
  63 |   async clickNextPage() {
  64 |     await this.nextBtn.click();
  65 |     await this.page.waitForTimeout(400);
  66 |   }
  67 | 
  68 |   async getStatusBadgeTextOnRow(rowIndex) {
  69 |     const row = this.tableRows.nth(rowIndex);
  70 |     return row.locator('.badge').last().innerText();
  71 |   }
  72 | 
  73 |   async getPayslipEmployeeName() {
  74 |     return this.payslipModal.locator('h2, h3').first().innerText();
  75 |   }
  76 | }
  77 | 
  78 | module.exports = { PayrollPage };
  79 | 
```