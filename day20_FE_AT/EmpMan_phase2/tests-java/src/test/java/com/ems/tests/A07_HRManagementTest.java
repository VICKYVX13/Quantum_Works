package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.HRPage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A07_HRManagementTest extends BaseTest {

    private HRPage hrPage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        hrPage = new HRPage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("hr");
        hrPage.waitForLoad();
    }

    @Test
    public void testHRSubNavItems() {
        int count = hrPage.subNavItems.count();
        assertThat(count).isGreaterThan(0);
    }

    @Test
    public void testRecruitmentSection() {
        hrPage.clickSubNav("Recruitment");
        assertThat(hrPage.tableRows.count()).isGreaterThanOrEqualTo(0);
    }
    
    @Test
    public void testOnboardingSection() {
        hrPage.clickSubNav("Onboarding");
        assertThat(hrPage.container.isVisible()).isTrue();
    }
}
