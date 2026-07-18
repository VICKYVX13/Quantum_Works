package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.LoginPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A01_LoginTest extends BaseTest {
    
    private LoginPage loginPage;

    @BeforeEach
    public void setUpTest() {
        loginPage = new LoginPage(page);
    }

    @Test
    public void testLoginElementsPresent() {
        loginPage.navigateToRoot();
        assertThat(loginPage.container.isVisible()).isTrue();
        assertThat(loginPage.adminTab.isVisible()).isTrue();
        assertThat(loginPage.employeeTab.isVisible()).isTrue();
        assertThat(loginPage.usernameInput.isVisible()).isTrue();
        assertThat(loginPage.passwordInput.isVisible()).isTrue();
        assertThat(loginPage.loginBtn.isVisible()).isTrue();
    }

    @Test
    public void testEmptyFieldsValidation() {
        loginPage.navigateToRoot();
        loginPage.loginBtn.click();
        
        boolean isUsernameInvalid = (Boolean) loginPage.usernameInput.evaluate("el => !el.validity.valid");
        assertThat(isUsernameInvalid).isTrue();
    }

    @Test
    public void testSuccessfulAdminLogin() {
        loginPage.navigateToRoot();
        loginPage.selectAdminTab();
        loginPage.login("admin", "admin123");
        
        loginPage.dashboardTitle.waitFor();
        assertThat(loginPage.dashboardTitle.isVisible()).isTrue();
    }
}
