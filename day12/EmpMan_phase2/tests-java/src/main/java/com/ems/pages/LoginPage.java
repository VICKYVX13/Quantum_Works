package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

public class LoginPage {
    private final Page page;
    
    public final Locator container;
    public final Locator adminTab;
    public final Locator employeeTab;
    public final Locator usernameInput;
    public final Locator passwordInput;
    public final Locator loginBtn;
    public final Locator errorMsg;
    public final Locator dashboardTitle;

    public LoginPage(Page page) {
        this.page = page;
        this.container = page.locator(".login-container, .login-page");
        this.adminTab = page.locator("button").filter(new Locator.FilterOptions().setHasText("Admin Login"));
        this.employeeTab = page.locator("button").filter(new Locator.FilterOptions().setHasText("Employee Login"));
        this.usernameInput = page.locator("input[type='text'], input[name='username']");
        this.passwordInput = page.locator("input[type='password'], input[name='password']");
        this.loginBtn = page.locator("button").filter(new Locator.FilterOptions().setHasText("Sign In"));
        this.errorMsg = page.locator(".error-message");
        this.dashboardTitle = page.locator(".dashboard, .sidebar");
    }

    public void navigateToRoot() {
        page.navigate("/");
        page.waitForLoadState(com.microsoft.playwright.options.LoadState.NETWORKIDLE);
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginBtn.click();
    }

    public void selectAdminTab() {
        if(adminTab.isVisible()) adminTab.click();
    }

    public void selectEmployeeTab() {
        if(employeeTab.isVisible()) employeeTab.click();
    }
}
