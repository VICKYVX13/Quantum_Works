package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class DashboardPage {
    private final Page page;

    public final Locator container;
    public final Locator pageTitle;
    public final Locator kpiCards;
    public final Locator chartCards;
    public final Locator activityItems;
    public final Locator generateReportBtn;

    public DashboardPage(Page page) {
        this.page = page;
        this.container = page.locator(".dashboard, .dashboard-container");
        this.pageTitle = page.locator(".dashboard-title, h1").filter(new Locator.FilterOptions().setHasText("Dashboard"));
        this.kpiCards = page.locator(".kpi-card");
        this.chartCards = page.locator(".chart-card");
        this.activityItems = page.locator(".activity-item");
        this.generateReportBtn = page.locator("button").filter(new Locator.FilterOptions().setHasText("Generate Report"));
    }

    public void waitForLoad() {
        container.waitFor();
    }
}
