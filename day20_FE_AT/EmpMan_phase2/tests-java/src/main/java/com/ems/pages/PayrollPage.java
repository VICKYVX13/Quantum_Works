package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class PayrollPage {
    private final Page page;

    public final Locator container;
    public final Locator tableRows;
    public final Locator searchInput;
    public final Locator payslipModal;
    public final Locator closePayslipBtn;

    public PayrollPage(Page page) {
        this.page = page;
        this.container = page.locator(".payroll-module, .payroll-container");
        this.tableRows = page.locator("tbody tr");
        this.searchInput = page.locator("input[placeholder*='Search']").first();
        this.payslipModal = page.locator(".modal, .payslip-modal");
        this.closePayslipBtn = page.locator(".btn-icon[aria-label='Close'], button").filter(new Locator.FilterOptions().setHasText("Close"));
    }

    public void waitForLoad() {
        container.waitFor();
    }
}
