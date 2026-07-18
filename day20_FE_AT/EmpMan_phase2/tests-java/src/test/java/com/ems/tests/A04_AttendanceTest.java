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
public class A04_AttendanceTest extends BaseTest {

    private AttendancePage attendancePage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        attendancePage = new AttendancePage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("attendance");
        attendancePage.waitForLoad();
    }

    @Test
    public void testAttendancePageLoads() {
        assertThat(attendancePage.container.isVisible()).isTrue();
    }

    @Test
    public void testTabsSwitching() {
        attendancePage.clickLeaveTab();
        assertThat(attendancePage.leaveTab.getAttribute("class")).contains("active");
    }

    @Test
    public void testSearchAttendance() {
        int initialCount = attendancePage.rosterRows.count();
        attendancePage.searchInput.fill("Bob");
        page.waitForTimeout(500);
        int afterCount = attendancePage.rosterRows.count();
        assertThat(afterCount).isLessThanOrEqualTo(initialCount);
    }
}
