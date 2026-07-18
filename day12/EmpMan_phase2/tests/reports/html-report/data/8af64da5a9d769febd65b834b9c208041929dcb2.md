# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07_hr_management.spec.js >> 07 – HR Management Module >> HR-09 Performance section is accessible
- Location: specs\07_hr_management.spec.js:72:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.hr-module, [class*="hr"]')
Expected: visible
Error: strict mode violation: locator('.hr-module, [class*="hr"]') resolved to 10 elements:
    1) <div class="hr-module">…</div> aka locator('div').filter({ hasText: 'HR ModuleRecruitment,' }).nth(3)
    2) <div class="hr-layout">…</div> aka locator('div').filter({ hasText: 'RecruitmentOnboarding /' }).nth(4)
    3) <nav class="hr-sidenav card">…</nav> aka getByText('RecruitmentOnboarding /')
    4) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Recruitment' })
    5) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Onboarding / Offboarding' })
    6) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Training' })
    7) <button class="hr-nav-item active">…</button> aka getByRole('button', { name: 'Performance' })
    8) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Announcements' })
    9) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Grievances' })
    10) <div class="hr-content">…</div> aka locator('div').filter({ hasText: 'Performance Reviews Initiate' }).nth(5)

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('.hr-module, [class*="hr"]')

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
        - generic [ref=e98]: HR Module
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
        - generic [ref=e112]:
          - heading "HR Module" [level=1] [ref=e113]
          - paragraph [ref=e114]: Recruitment, Onboarding, Training, Performance & More
        - generic [ref=e115]:
          - navigation [ref=e116]:
            - button "Recruitment" [ref=e117] [cursor=pointer]:
              - img [ref=e118]
              - generic [ref=e121]: Recruitment
            - button "Onboarding / Offboarding" [ref=e122] [cursor=pointer]:
              - img [ref=e123]
              - generic [ref=e128]: Onboarding / Offboarding
            - button "Training" [ref=e129] [cursor=pointer]:
              - img [ref=e130]
              - generic [ref=e133]: Training
            - button "Performance" [active] [ref=e134] [cursor=pointer]:
              - img [ref=e135]
              - generic [ref=e137]: Performance
            - button "Announcements" [ref=e138] [cursor=pointer]:
              - img [ref=e139]
              - generic [ref=e142]: Announcements
            - button "Grievances" [ref=e143] [cursor=pointer]:
              - img [ref=e144]
              - generic [ref=e146]: Grievances
          - generic [ref=e148]:
            - generic [ref=e149]:
              - heading "Performance Reviews" [level=3] [ref=e150]
              - button "Initiate Review" [ref=e151] [cursor=pointer]:
                - img [ref=e152]
                - text: Initiate Review
            - table [ref=e154]:
              - rowgroup [ref=e155]:
                - row "Employee Department Reviewer Period Score Status" [ref=e156]:
                  - columnheader "Employee" [ref=e157]
                  - columnheader "Department" [ref=e158]
                  - columnheader "Reviewer" [ref=e159]
                  - columnheader "Period" [ref=e160]
                  - columnheader "Score" [ref=e161]
                  - columnheader "Status" [ref=e162]
              - rowgroup [ref=e163]:
                - row "Alice Johnson Engineering John Smith Q2 2026 92% Completed" [ref=e164]:
                  - cell "Alice Johnson" [ref=e165]
                  - cell "Engineering" [ref=e166]:
                    - generic [ref=e167]: Engineering
                  - cell "John Smith" [ref=e168]
                  - cell "Q2 2026" [ref=e169]
                  - cell "92%" [ref=e170]:
                    - generic [ref=e174]: 92%
                  - cell "Completed" [ref=e175]:
                    - generic [ref=e176]: Completed
                - row "Bob Williams Sales Lisa Ray Q2 2026 78% In Progress" [ref=e177]:
                  - cell "Bob Williams" [ref=e178]
                  - cell "Sales" [ref=e179]:
                    - generic [ref=e180]: Sales
                  - cell "Lisa Ray" [ref=e181]
                  - cell "Q2 2026" [ref=e182]
                  - cell "78%" [ref=e183]:
                    - generic [ref=e187]: 78%
                  - cell "In Progress" [ref=e188]:
                    - generic [ref=e189]: In Progress
                - row "Carol Davis Marketing Tom Brown Q2 2026 — Pending" [ref=e190]:
                  - cell "Carol Davis" [ref=e191]
                  - cell "Marketing" [ref=e192]:
                    - generic [ref=e193]: Marketing
                  - cell "Tom Brown" [ref=e194]
                  - cell "Q2 2026" [ref=e195]
                  - cell "—" [ref=e196]
                  - cell "Pending" [ref=e197]:
                    - generic [ref=e198]: Pending
                - row "David Miller Engineering John Smith Q2 2026 88% Completed" [ref=e199]:
                  - cell "David Miller" [ref=e200]
                  - cell "Engineering" [ref=e201]:
                    - generic [ref=e202]: Engineering
                  - cell "John Smith" [ref=e203]
                  - cell "Q2 2026" [ref=e204]
                  - cell "88%" [ref=e205]:
                    - generic [ref=e209]: 88%
                  - cell "Completed" [ref=e210]:
                    - generic [ref=e211]: Completed
```

# Test source

```ts
  1  | /**
  2  |  * MODULE 07 – HR Management Module Tests
  3  |  * Sub-sections: Recruitment, Onboarding/Offboarding, Leave Policy,
  4  |  *               Performance, Training, Announcements, Pulse Survey.
  5  |  */
  6  | const { test, expect } = require('@playwright/test');
  7  | const { HRPage }     = require('../pages/HRPage');
  8  | const { SidebarPage } = require('../pages/SidebarPage');
  9  | 
  10 | test.describe('07 – HR Management Module', () => {
  11 |   let hr, sidebar;
  12 | 
  13 |   test.beforeEach(async ({ page }) => {
  14 |     hr      = new HRPage(page);
  15 |     sidebar = new SidebarPage(page);
  16 |     await page.goto('/');
  17 |     await page.waitForLoadState('networkidle');
  18 |     await sidebar.navigateTo('hr');
  19 |     await hr.waitForLoad();
  20 |   });
  21 | 
  22 |   test('HR-01 HR Module loads with sub-navigation', async ({ page }) => {
  23 |     const count = await hr.getNavCount();
  24 |     expect(count).toBeGreaterThanOrEqual(2);
  25 |   });
  26 | 
  27 |   test('HR-02 Recruitment section shows candidate table', async ({ page }) => {
  28 |     // Recruitment is the default/first section
  29 |     await hr.clickSubNav('Recruitment');
  30 |     const count = await hr.getTableRowCount();
  31 |     expect(count).toBeGreaterThan(0);
  32 |   });
  33 | 
  34 |   test('HR-03 Candidate table has required columns', async ({ page }) => {
  35 |     await hr.clickSubNav('Recruitment');
  36 |     const headers = await page.locator('th').allInnerTexts();
  37 |     expect(headers.some(h => /Candidate|Name/i.test(h))).toBe(true);
  38 |     expect(headers.some(h => /Role|Position/i.test(h))).toBe(true);
  39 |     expect(headers.some(h => /Stage|Status/i.test(h))).toBe(true);
  40 |   });
  41 | 
  42 |   test('HR-04 Add Candidate button is visible in Recruitment', async ({ page }) => {
  43 |     await hr.clickSubNav('Recruitment');
  44 |     await expect(hr.addCandidateBtn).toBeVisible();
  45 |   });
  46 | 
  47 |   test('HR-05 View button present on candidate rows', async ({ page }) => {
  48 |     await hr.clickSubNav('Recruitment');
  49 |     const viewBtn = page.locator('button', { hasText: /View/i }).first();
  50 |     await expect(viewBtn).toBeVisible();
  51 |   });
  52 | 
  53 |   test('HR-06 Schedule Interview button present on candidate rows', async ({ page }) => {
  54 |     await hr.clickSubNav('Recruitment');
  55 |     const schedBtn = page.locator('button', { hasText: /Schedule/i }).first();
  56 |     await expect(schedBtn).toBeVisible();
  57 |   });
  58 | 
  59 |   test('HR-07 Candidate stage badges are visible', async ({ page }) => {
  60 |     await hr.clickSubNav('Recruitment');
  61 |     const badge = page.locator('.badge').first();
  62 |     await expect(badge).toBeVisible();
  63 |   });
  64 | 
  65 |   test('HR-08 Onboarding section loads with checklist', async ({ page }) => {
  66 |     await hr.clickSubNav('Onboarding');
  67 |     await page.waitForTimeout(500);
  68 |     const content = await page.locator('.hr-module, [class*="hr"]').innerText();
  69 |     expect(content).toMatch(/onboard|task|checklist/i);
  70 |   });
  71 | 
  72 |   test('HR-09 Performance section is accessible', async ({ page }) => {
  73 |     await hr.clickSubNav('Performance');
  74 |     await page.waitForTimeout(500);
> 75 |     await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  76 |   });
  77 | 
  78 |   test('HR-10 Training section is accessible', async ({ page }) => {
  79 |     await hr.clickSubNav('Training');
  80 |     await page.waitForTimeout(500);
  81 |     await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
  82 |   });
  83 | 
  84 |   test('HR-11 Announcements section is accessible', async ({ page }) => {
  85 |     await hr.clickSubNav('Announcements');
  86 |     await page.waitForTimeout(500);
  87 |     await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
  88 |   });
  89 | 
  90 |   test('HR-12 Breadcrumb shows HR Module', async ({ page }) => {
  91 |     await expect(page.locator('.breadcrumb-current')).toContainText('HR');
  92 |   });
  93 | });
  94 | 
```