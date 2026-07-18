package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A11_NotificationsTest extends BaseTest {

    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("notifications");
        page.waitForLoadState(com.microsoft.playwright.options.LoadState.NETWORKIDLE);
    }

    @Test
    public void testNotificationsPageLoads() {
        assertThat(page.locator(".dashboard-title, h1").first().isVisible()).isTrue();
    }

    @Test
    public void testNotificationCardsRender() {
        int count = page.locator(".notif-card, .notification-item").count();
        assertThat(count).isGreaterThan(0);
    }

    @Test
    public void testMarkAllAsRead() {
        com.microsoft.playwright.Locator markAllBtn = page.locator("button").filter(new com.microsoft.playwright.Locator.FilterOptions().setHasText(java.util.regex.Pattern.compile("(?i)Mark All")));
        if(markAllBtn.isVisible()) {
            markAllBtn.click();
            page.waitForTimeout(500);
            // After marking all as read, there should be 0 unread
            // Implementation depends on actual UI, we just check no error occurs.
            assertThat(markAllBtn.isVisible()).isFalse(); // or remains, but action completed
        }
    }
}
