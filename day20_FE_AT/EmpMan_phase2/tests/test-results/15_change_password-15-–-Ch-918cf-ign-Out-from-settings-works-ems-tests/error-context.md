# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 15_change_password.spec.js >> 15 – Change Password Module >> CP-07 Sign Out from settings works
- Location: specs\15_change_password.spec.js:66:3

# Error details

```
Error: locator.waitFor: Error: strict mode violation: locator('button').filter({ hasText: /Sign Out/i }) resolved to 2 elements:
    1) <button class="hr-nav-item">…</button> aka getByRole('button', { name: 'Sign Out', exact: true })
    2) <button class="btn btn-danger" id="logout-settings-btn">Sign Out of All Devices</button> aka getByRole('button', { name: 'Sign Out of All Devices' })

Call log:
  - waiting for locator('button').filter({ hasText: /Sign Out/i }) to be visible

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
        - generic [ref=e98]: System Settings
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
          - heading "Settings" [level=1] [ref=e112]
          - paragraph [ref=e113]: Manage your account, company, and system preferences
        - generic [ref=e114]:
          - navigation [ref=e115]:
            - button "Profile" [ref=e116] [cursor=pointer]:
              - img [ref=e117]
              - generic [ref=e120]: Profile
            - button "Company" [ref=e121] [cursor=pointer]:
              - img [ref=e122]
              - generic [ref=e125]: Company
            - button "Notifications" [ref=e126] [cursor=pointer]:
              - img [ref=e127]
              - generic [ref=e130]: Notifications
            - button "Appearance" [ref=e131] [cursor=pointer]:
              - img [ref=e132]
              - generic [ref=e138]: Appearance
            - button "Security" [active] [ref=e139] [cursor=pointer]:
              - img [ref=e140]
              - generic [ref=e143]: Security
            - button "Roles & Permissions" [ref=e144] [cursor=pointer]:
              - img [ref=e145]
              - generic [ref=e147]: Roles & Permissions
            - button "Sign Out" [ref=e149] [cursor=pointer]:
              - img [ref=e150]
              - text: Sign Out
          - generic [ref=e154]:
            - heading "Security Settings" [level=3] [ref=e155]
            - generic [ref=e156]:
              - generic [ref=e157]:
                - generic [ref=e158]: Change Password
                - generic [ref=e159]: Last changed 30 days ago
              - button "Update" [ref=e160] [cursor=pointer]
            - generic [ref=e161]:
              - generic [ref=e162]:
                - generic [ref=e163]: Two-Factor Authentication
                - generic [ref=e164]: Add an extra layer of security
              - button "Enable" [ref=e165] [cursor=pointer]
            - generic [ref=e166]:
              - generic [ref=e167]:
                - generic [ref=e168]: Active Sessions
                - generic [ref=e169]: 1 active session (This Device)
              - button "Manage" [ref=e170] [cursor=pointer]
            - generic [ref=e171]:
              - generic [ref=e172]:
                - generic [ref=e173]: Login History
                - generic [ref=e174]: View recent login activity
              - button "View" [ref=e175] [cursor=pointer]
            - generic [ref=e176]:
              - generic [ref=e177]:
                - generic [ref=e178]: API Access Keys
                - generic [ref=e179]: Manage API keys and tokens
              - button "Configure" [ref=e180] [cursor=pointer]
            - generic [ref=e181]:
              - generic [ref=e182]: Danger Zone
              - paragraph [ref=e183]: This will sign you out from all active sessions.
              - button "Sign Out of All Devices" [ref=e184] [cursor=pointer]
```

# Test source

```ts
  1  | /**
  2  |  * MODULE 15 – Change Password Tests
  3  |  * Change Password is part of Settings → Security tab.
  4  |  * Tests: form fields, validation, password visibility toggle.
  5  |  */
  6  | const { test, expect } = require('@playwright/test');
  7  | const { SettingsPage } = require('../pages/SettingsPage');
  8  | const { SidebarPage }  = require('../pages/SidebarPage');
  9  | 
  10 | test.describe('15 – Change Password Module', () => {
  11 |   let settings, sidebar;
  12 | 
  13 |   test.beforeEach(async ({ page }) => {
  14 |     settings = new SettingsPage(page);
  15 |     sidebar  = new SidebarPage(page);
  16 |     await page.goto('/');
  17 |     await page.waitForLoadState('networkidle');
  18 |     await sidebar.navigateTo('settings');
  19 |     await settings.waitForLoad();
  20 |     await settings.clickSecurityTab();
  21 |     await page.waitForTimeout(500);
  22 |   });
  23 | 
  24 |   test('CP-01 Security tab loads with password-related content', async ({ page }) => {
  25 |     const content = await settings.container.innerText();
  26 |     expect(content).toMatch(/Password|Security|Change/i);
  27 |   });
  28 | 
  29 |   test('CP-02 Security tab content is rendered', async ({ page }) => {
  30 |     await expect(settings.container).toBeVisible();
  31 |     const text = await page.locator('.settings-content').innerText();
  32 |     expect(text.length).toBeGreaterThan(10);
  33 |   });
  34 | 
  35 |   test('CP-03 Current Password field is present', async ({ page }) => {
  36 |     const currentPwd = page.locator(
  37 |       'input[type="password"], input[name="currentPassword"], input[placeholder*="Current"]'
  38 |     ).first();
  39 |     if (await currentPwd.isVisible()) {
  40 |       await expect(currentPwd).toBeEnabled();
  41 |     } else {
  42 |       // Security section might show different content - just verify section loaded
  43 |       const content = await settings.container.innerText();
  44 |       expect(content.length).toBeGreaterThan(0);
  45 |     }
  46 |   });
  47 | 
  48 |   test('CP-04 New Password field is present', async ({ page }) => {
  49 |     const inputs = page.locator('input[type="password"]');
  50 |     const count = await inputs.count();
  51 |     // There should be at least 1 password input in security section
  52 |     expect(count).toBeGreaterThanOrEqual(0); // May be 0 if section not rendered yet
  53 |   });
  54 | 
  55 |   test('CP-05 Security section shows 2FA or session info', async ({ page }) => {
  56 |     const content = await page.locator('.settings-content').innerText();
  57 |     expect(content).toMatch(/2FA|Session|Security|Two-Factor|Password/i);
  58 |   });
  59 | 
  60 |   test('CP-06 Settings security tab is clickable multiple times', async ({ page }) => {
  61 |     await settings.clickProfileTab();
  62 |     await settings.clickSecurityTab();
  63 |     await expect(settings.container).toBeVisible();
  64 |   });
  65 | 
  66 |   test('CP-07 Sign Out from settings works', async ({ page }) => {
  67 |     // Click Sign Out inside settings sidebar  
> 68 |     await settings.signOutBtn.waitFor({ state: 'visible', timeout: 5000 });
     |                               ^ Error: locator.waitFor: Error: strict mode violation: locator('button').filter({ hasText: /Sign Out/i }) resolved to 2 elements:
  69 |     // Don't actually sign out - just verify button exists
  70 |     await expect(settings.signOutBtn).toBeEnabled();
  71 |   });
  72 | });
  73 | 
```