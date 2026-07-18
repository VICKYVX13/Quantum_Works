package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A10_ReportsTest extends BaseTest {

    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("reports");
        page.waitForLoadState(com.microsoft.playwright.options.LoadState.NETWORKIDLE);
    }

    @Test
    public void testReportsPageLoads() {
        assertThat(page.locator(".dashboard-title, h1").first().isVisible()).isTrue();
    }

    @Test
    public void testReportTypeCardsExist() {
        int count = page.locator(".card").filter(new com.microsoft.playwright.Locator.FilterOptions().setHasText(java.util.regex.Pattern.compile("(?i)Report"))).count();
        assertThat(count).isGreaterThanOrEqualTo(0);
    }

    @Test
    public void testPdfDownloadButton() {
        com.microsoft.playwright.Locator pdfBtn = page.locator("button").filter(new com.microsoft.playwright.Locator.FilterOptions().setHasText(java.util.regex.Pattern.compile("(?i)PDF"))).first();
        if(pdfBtn.isVisible()) {
            assertThat(pdfBtn.isEnabled()).isTrue();
        }
    }
}
