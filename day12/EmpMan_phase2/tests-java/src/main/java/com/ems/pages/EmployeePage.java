package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class EmployeePage {
    private final Page page;

    public final Locator container;
    public final Locator addEmployeeBtn;
    public final Locator searchInput;
    public final Locator deptFilter;
    public final Locator tableRows;
    public final Locator modal;
    public final Locator modalTitle;
    public final Locator nameInput;
    public final Locator emailInput;
    public final Locator deptSelect;
    public final Locator roleSelect;
    public final Locator saveBtn;
    public final Locator closeBtn;

    public EmployeePage(Page page) {
        this.page = page;
        this.container = page.locator(".employee-db, .employee-management");
        this.addEmployeeBtn = page.locator("button").filter(new Locator.FilterOptions().setHasText("Add Employee"));
        this.searchInput = page.locator("input[placeholder*='Search']").first();
        this.deptFilter = page.locator("select").first();
        this.tableRows = page.locator("tbody tr");
        this.modal = page.locator(".modal, .dialog");
        this.modalTitle = modal.locator("h2, h3").first();
        this.nameInput = page.locator("input[name='name']");
        this.emailInput = page.locator("input[name='email']");
        this.deptSelect = page.locator("select[name='department']");
        this.roleSelect = page.locator("select[name='role']");
        this.saveBtn = modal.locator("button[type='submit'], button").filter(new Locator.FilterOptions().setHasText("Save"));
        this.closeBtn = modal.locator(".btn-icon[aria-label='Close'], button").filter(new Locator.FilterOptions().setHasText("Close"));
    }

    public void waitForLoad() {
        container.waitFor();
    }

    public void clickAddEmployee() {
        addEmployeeBtn.click();
        modal.waitFor();
    }

    public void closeModal() {
        closeBtn.first().click();
    }

    public void search(String query) {
        searchInput.fill(query);
        page.waitForTimeout(500);
    }
}
