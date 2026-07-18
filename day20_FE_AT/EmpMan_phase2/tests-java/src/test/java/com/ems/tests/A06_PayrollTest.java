package com.ems.tests;

import com.ems.base.BaseTest;
import com.ems.base.TestFailureExtension;
import com.ems.pages.PayrollPage;
import com.ems.pages.SidebarPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(TestFailureExtension.class)
public class A06_PayrollTest extends BaseTest {

    private PayrollPage payrollPage;
    private SidebarPage sidebarPage;

    @BeforeEach
    public void setUpTest() {
        payrollPage = new PayrollPage(page);
        sidebarPage = new SidebarPage(page);
        sidebarPage.navigateTo("payroll");
        payrollPage.waitForLoad();
    }

    @Test
    public void testPayrollTableRenders() {
        int count = payrollPage.tableRows.count();
        assertThat(count).isGreaterThan(0);
    }

    @Test
    public void testSearchPayroll() {
        int initialCount = payrollPage.tableRows.count();
        payrollPage.searchInput.fill("Alice");
        page.waitForTimeout(500);
        int afterCount = payrollPage.tableRows.count();
        assertThat(afterCount).isLessThanOrEqualTo(initialCount);
    }

    @Test
    public void testViewPayslipModal() {
        if(payrollPage.tableRows.count() > 0) {
            page.locator("button").filter(new com.microsoft.playwright.Locator.FilterOptions().setHasText("View")).first().click();
            assertThat(payrollPage.payslipModal.isVisible()).isTrue();
            
            payrollPage.closePayslipBtn.first().click();
            assertThat(payrollPage.payslipModal.isHidden()).isTrue();
        }
    }
}
