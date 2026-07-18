package com.ems.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class SettingsPage {
    private final Page page;

    public final Locator container;
    public final Locator profileTab;
    public final Locator companyTab;
    public final Locator notificationsTab;
    public final Locator appearanceTab;
    public final Locator securityTab;
    public final Locator rolesTab;
    
    // Profile form
    public final Locator nameInput;
    public final Locator emailInput;
    public final Locator phoneInput;
    public final Locator saveProfileBtn;
    public final Locator savedMessage;
    
    public final Locator signOutBtn;

    public SettingsPage(Page page) {
        this.page = page;
        this.container = page.locator(".settings-container, .settings-content");
        
        // Navigation tabs
        this.profileTab = page.locator("button, a").filter(new Locator.FilterOptions().setHasText("Profile Settings").setHasText(java.util.regex.Pattern.compile("(?i)profile")));
        this.companyTab = page.locator("button, a").filter(new Locator.FilterOptions().setHasText("Company"));
        this.notificationsTab = page.locator("button, a").filter(new Locator.FilterOptions().setHasText("Notifications"));
        this.appearanceTab = page.locator("button, a").filter(new Locator.FilterOptions().setHasText("Appearance"));
        this.securityTab = page.locator("button, a").filter(new Locator.FilterOptions().setHasText("Security"));
        this.rolesTab = page.locator("button, a").filter(new Locator.FilterOptions().setHasText(java.util.regex.Pattern.compile("(?i)roles")));

        // Profile Form Elements
        this.nameInput = page.locator("input[name='name'], input[placeholder*='Name']").first();
        this.emailInput = page.locator("input[name='email'], input[type='email']").first();
        this.phoneInput = page.locator("input[name='phone'], input[type='tel']").first();
        this.saveProfileBtn = page.locator("button").filter(new Locator.FilterOptions().setHasText("Save Changes"));
        this.savedMessage = page.locator(".alert-success, .toast-success");
        
        this.signOutBtn = page.locator("button").filter(new Locator.FilterOptions().setHasText(java.util.regex.Pattern.compile("(?i)sign out")));
    }

    public void waitForLoad() {
        container.waitFor();
    }

    public void clickRolesTab() {
        if(rolesTab.isVisible()) rolesTab.click();
    }
    
    public void clickSecurityTab() {
        if(securityTab.isVisible()) securityTab.click();
    }
    
    public void clickProfileTab() {
        if(profileTab.isVisible()) profileTab.click();
    }
}
