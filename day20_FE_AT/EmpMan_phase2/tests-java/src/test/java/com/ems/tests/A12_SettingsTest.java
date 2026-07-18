package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.SettingsPage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A12_SettingsTest extends BaseTest {

    private SettingsPage settingsPage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        settingsPage = new SettingsPage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("settings");
        settingsPage.waitForLoad();
    }

    @Test
    public void testSettingsTabsExist() {
        assertThat(settingsPage.profileTab.isVisible()).isTrue();
        assertThat(settingsPage.companyTab.isVisible()).isTrue();
        assertThat(settingsPage.notificationsTab.isVisible()).isTrue();
        assertThat(settingsPage.appearanceTab.isVisible()).isTrue();
        assertThat(settingsPage.securityTab.isVisible()).isTrue();
    }

    @Test
    public void testAppearanceThemeToggle() {
        settingsPage.appearanceTab.click();
        page.waitForTimeout(500);
        com.microsoft.playwright.Locator toggleBtn = page.locator("button").filter(new com.microsoft.playwright.Locator.FilterOptions().setHasText(java.util.regex.Pattern.compile("(?i)Toggle|Dark|Light|Switch"))).first();
        if(toggleBtn.isVisible()) {
            String themeBefore = (String) page.evaluate("document.documentElement.getAttribute('data-theme')");
            toggleBtn.click();
            page.waitForTimeout(500);
            String themeAfter = (String) page.evaluate("document.documentElement.getAttribute('data-theme')");
            assertThat(themeAfter).isNotEqualTo(themeBefore);
        }
    }
}
