package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.DashboardPage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A02_DashboardTest extends BaseTest {

    private DashboardPage dashboardPage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        dashboardPage = new DashboardPage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("dashboard");
        dashboardPage.waitForLoad();
    }

    @Test
    public void testDashboardKpiCards() {
        int count = dashboardPage.kpiCards.count();
        assertThat(count).isGreaterThanOrEqualTo(6);
    }

    @Test
    public void testDashboardCharts() {
        int count = dashboardPage.chartCards.count();
        assertThat(count).isGreaterThanOrEqualTo(4);
    }

    @Test
    public void testRecentActivities() {
        int count = dashboardPage.activityItems.count();
        assertThat(count).isGreaterThanOrEqualTo(1);
    }
}
