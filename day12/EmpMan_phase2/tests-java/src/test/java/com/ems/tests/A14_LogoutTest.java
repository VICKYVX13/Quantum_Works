package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A14_LogoutTest extends BaseTest {

    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        sidebarPage = new SidebarPage(page);
    }

    @Test
    public void testLogout() {
        sidebarPage.logoutBtn.click();
        page.waitForSelector(".login-page, .login-container");
        
        assertThat(page.locator(".login-page, .login-container").isVisible()).isTrue();
    }
    
    // Close the browser session after the final test
    @AfterAll
    public static void tearDownAll() {
        if(page != null) {
            page.context().browser().close();
            playwright.close();
        }
    }
}
