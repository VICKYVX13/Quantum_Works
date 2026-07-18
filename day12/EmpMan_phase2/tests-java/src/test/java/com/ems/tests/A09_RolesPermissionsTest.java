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
public class A09_RolesPermissionsTest extends BaseTest {

    private SettingsPage settingsPage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        settingsPage = new SettingsPage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("settings");
        settingsPage.waitForLoad();
        settingsPage.clickRolesTab();
    }

    @Test
    public void testRolesSectionRenders() {
        if(settingsPage.rolesTab.isVisible()) {
            assertThat(settingsPage.container.isVisible()).isTrue();
            String content = settingsPage.container.innerText();
            assertThat(content).containsIgnoringCase("Role");
        }
    }
}
