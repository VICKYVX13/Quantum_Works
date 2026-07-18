package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class AttendancePage {
    private final Page page;

    public final Locator container;
    public final Locator attendanceTab;
    public final Locator leaveTab;
    public final Locator rosterRows;
    public final Locator searchInput;

    public AttendancePage(Page page) {
        this.page = page;
        this.container = page.locator(".attendance-module, .attendance-container");
        this.attendanceTab = page.locator("button").filter(new Locator.FilterOptions().setHasText("Daily Attendance"));
        this.leaveTab = page.locator("button").filter(new Locator.FilterOptions().setHasText("Leave Requests"));
        this.rosterRows = page.locator("tbody tr");
        this.searchInput = page.locator("input[placeholder*='Search']").first();
    }

    public void waitForLoad() {
        container.waitFor();
    }

    public void clickLeaveTab() {
        leaveTab.click();
        page.waitForTimeout(500);
    }
}
