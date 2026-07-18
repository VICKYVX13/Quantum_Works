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
public class A13_ProfileTest extends BaseTest {

    private SettingsPage settingsPage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        settingsPage = new SettingsPage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("settings");
        settingsPage.waitForLoad();
        settingsPage.clickProfileTab();
    }

    @Test
    public void testProfileFormPreFilled() {
        String name = settingsPage.nameInput.inputValue();
        assertThat(name).isNotBlank();
        
        String email = settingsPage.emailInput.inputValue();
        assertThat(email).contains("@");
    }

    @Test
    public void testProfileSave() {
        settingsPage.saveProfileBtn.click();
        assertThat(settingsPage.savedMessage.isVisible()).isTrue();
    }
}
