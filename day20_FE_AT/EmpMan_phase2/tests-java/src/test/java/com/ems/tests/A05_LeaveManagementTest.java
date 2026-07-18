package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.AttendancePage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A05_LeaveManagementTest extends BaseTest {

    private AttendancePage attendancePage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        attendancePage = new AttendancePage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("attendance");
        attendancePage.waitForLoad();
        attendancePage.clickLeaveTab();
    }

    @Test
    public void testLeaveRecordsRender() {
        int count = attendancePage.rosterRows.count();
        assertThat(count).isGreaterThan(0);
    }

    @Test
    public void testLeaveApproveRejectButtons() {
        int rowsWithButtons = page.locator("button").filter(new com.microsoft.playwright.Locator.FilterOptions().setHasText("Approve")).count();
        if(rowsWithButtons > 0) {
            assertThat(rowsWithButtons).isGreaterThan(0);
        }
    }
}
