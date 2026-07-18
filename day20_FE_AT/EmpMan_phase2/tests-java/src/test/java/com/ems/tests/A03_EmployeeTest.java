package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.EmployeePage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A03_EmployeeTest extends BaseTest {

    private EmployeePage employeePage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        employeePage = new EmployeePage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("employees");
        employeePage.waitForLoad();
    }

    @Test
    public void testEmployeeTableRenders() {
        int count = employeePage.tableRows.count();
        assertThat(count).isGreaterThan(0);
    }

    @Test
    public void testSearchEmployee() {
        int initialCount = employeePage.tableRows.count();
        employeePage.search("Alice");
        int countAfterSearch = employeePage.tableRows.count();
        assertThat(countAfterSearch).isLessThanOrEqualTo(initialCount);
    }

    @Test
    public void testAddEmployeeModal() {
        employeePage.clickAddEmployee();
        assertThat(employeePage.modal.isVisible()).isTrue();
        assertThat(employeePage.nameInput.isVisible()).isTrue();
        
        employeePage.closeModal();
        assertThat(employeePage.modal.isHidden()).isTrue();
    }
}
