# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07_hr_management.spec.js >> 07 – HR Management Module >> HR-11 Announcements section is accessible
- Location: specs\07_hr_management.spec.js:84:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.hr-module, [class*="hr"]')
Expected: visible
Error: strict mode violation: locator('.hr-module, [class*="hr"]') resolved to 10 elements:
    1) <div class="hr-module">…</div> aka locator('div').filter({ hasText: 'HR ModuleRecruitment,' }).nth(3)
    2) <div class="hr-layout">…</div> aka getByText('RecruitmentOnboarding / OffboardingTrainingPerformanceAnnouncementsGrievancesHR')
    3) <nav class="hr-sidenav card">…</nav> aka getByText('RecruitmentOnboarding /')
    4) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Recruitment' })
    5) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Onboarding / Offboarding' })
    6) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Training' })
    7) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Performance' })
    8) <button class="hr-nav-item active">…</button> aka getByRole('button', { name: 'Announcements' })
    9) <button class="hr-nav-item ">…</button> aka getByRole('button', { name: 'Grievances' })
    10) <div class="hr-content">…</div> aka locator('div').filter({ hasText: 'HR Announcements New' }).nth(5)

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
            - button "Performance" [ref=e134] [cursor=pointer]:
              - img [ref=e135]
              - generic [ref=e137]: Performance
            - button "Announcements" [active] [ref=e138] [cursor=pointer]:
              - img [ref=e139]
              - generic [ref=e142]: Announcements
            - button "Grievances" [ref=e143] [cursor=pointer]:
              - img [ref=e144]
              - generic [ref=e146]: Grievances
          - generic [ref=e148]:
            - generic [ref=e149]:
              - heading "HR Announcements" [level=3] [ref=e150]
              - button "New Announcement" [ref=e151] [cursor=pointer]:
                - img [ref=e152]
                - text: New Announcement
            - generic [ref=e153]:
              - generic [ref=e154]:
                - generic [ref=e155]:
                  - heading "Q3 Town Hall Meeting" [level=4] [ref=e156]
                  - generic [ref=e157]: High
                - paragraph [ref=e158]: The company-wide Q3 Town Hall is scheduled for July 25, 2026 at 10:00 AM. All employees are required to attend.
                - generic [ref=e159]:
                  - generic [ref=e160]: "Posted by: HR Department"
                  - generic [ref=e161]: "Date: 2026-07-13"
              - generic [ref=e162]:
                - generic [ref=e163]:
                  - heading "New Leave Policy Update" [level=4] [ref=e164]
                  - generic [ref=e165]: Medium
                - paragraph [ref=e166]: Effective August 1st, 2026, the annual leave policy has been updated. Please review the updated HR policy document.
                - generic [ref=e167]:
                  - generic [ref=e168]: "Posted by: HR Department"
                  - generic [ref=e169]: "Date: 2026-07-12"
              - generic [ref=e170]:
                - generic [ref=e171]:
                  - heading "Office Renovation - Floor 3" [level=4] [ref=e172]
                  - generic [ref=e173]: Low
                - paragraph [ref=e174]: The 3rd floor will be under renovation from July 20-27. Please work from home or use floors 1 and 2 during this period.
                - generic [ref=e175]:
                  - generic [ref=e176]: "Posted by: Admin"
                  - generic [ref=e177]: "Date: 2026-07-11"
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
  75 |     await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
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
> 87 |     await expect(page.locator('.hr-module, [class*="hr"]')).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  88 |   });
  89 | 
  90 |   test('HR-12 Breadcrumb shows HR Module', async ({ page }) => {
  91 |     await expect(page.locator('.breadcrumb-current')).toContainText('HR');
  92 |   });
  93 | });
  94 | 
```