package com.ems.base;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

public class BaseTest {
    protected static Playwright playwright;
    protected static Browser browser;
    protected static BrowserContext context;
    protected static Page page;

    @BeforeAll
    public static void setUp() {
        if (playwright == null) {
            playwright = Playwright.create();
            // Using headless=false to observe the execution
            browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
            context = browser.newContext(new Browser.NewContextOptions().setViewportSize(1280, 720).setBaseURL("http://localhost:5173"));
            page = context.newPage();
        }
    }

    // Teardown is intentionally deferred to LogoutTest.java to maintain 
    // the single browser session across all sequentially executed tests.
}
