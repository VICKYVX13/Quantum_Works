package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.DashboardPage;
import com.ems.pages.EmployeePage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A08_DepartmentsTest extends BaseTest {

    @Test
    public void testDepartmentFilterInEmployees() {
        SidebarPage sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("employees");
        
        EmployeePage employeePage = new EmployeePage(page);
        employeePage.waitForLoad();
        
        assertThat(employeePage.deptFilter.isVisible()).isTrue();
        
        int initialCount = employeePage.tableRows.count();
        employeePage.deptFilter.selectOption(new com.microsoft.playwright.options.SelectOption().setLabel("Engineering"));
        page.waitForTimeout(500);
        
        assertThat(employeePage.tableRows.count()).isLessThanOrEqualTo(initialCount);
    }
}
