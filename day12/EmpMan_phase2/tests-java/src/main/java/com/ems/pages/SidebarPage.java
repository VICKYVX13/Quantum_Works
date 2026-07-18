package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

public class SidebarPage {
    private final Page page;

    public final Locator dashboardLink;
    public final Locator employeesLink;
    public final Locator attendanceLink;
    public final Locator payrollLink;
    public final Locator hrLink;
    public final Locator reportsLink;
    public final Locator notificationsLink;
    public final Locator settingsLink;
    public final Locator logoutBtn;

    public SidebarPage(Page page) {
        this.page = page;
        this.dashboardLink = page.locator(".sidebar-nav a[href='/']");
        this.employeesLink = page.locator(".sidebar-nav a[href='/employees']");
        this.attendanceLink = page.locator(".sidebar-nav a[href='/attendance']");
        this.payrollLink = page.locator(".sidebar-nav a[href='/payroll']");
        this.hrLink = page.locator(".sidebar-nav a[href='/hr']");
        this.reportsLink = page.locator(".sidebar-nav a[href='/reports']");
        this.notificationsLink = page.locator(".sidebar-nav a[href='/notifications']");
        this.settingsLink = page.locator(".sidebar-nav a[href='/settings']");
        this.logoutBtn = page.locator("button.logout-btn");
    }

    public void navigateTo(String linkName) {
        switch (linkName.toLowerCase()) {
            case "dashboard": dashboardLink.click(); break;
            case "employees": employeesLink.click(); break;
            case "attendance": attendanceLink.click(); break;
            case "payroll": payrollLink.click(); break;
            case "hr": hrLink.click(); break;
            case "reports": reportsLink.click(); break;
            case "notifications": notificationsLink.click(); break;
            case "settings": settingsLink.click(); break;
            default: throw new IllegalArgumentException("Unknown link: " + linkName);
        }
    }
}
