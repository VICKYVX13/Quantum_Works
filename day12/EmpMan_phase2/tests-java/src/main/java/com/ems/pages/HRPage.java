package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class HRPage {
    private final Page page;

    public final Locator container;
    public final Locator subNavItems;
    public final Locator tableRows;

    public HRPage(Page page) {
        this.page = page;
        this.container = page.locator(".hr-module, .hr-container");
        this.subNavItems = page.locator(".hr-nav button");
        this.tableRows = page.locator("tbody tr");
    }

    public void waitForLoad() {
        container.waitFor();
    }

    public void clickSubNav(String tabName) {
        subNavItems.filter(new Locator.FilterOptions().setHasText(tabName)).click();
        page.waitForTimeout(500);
    }
}
