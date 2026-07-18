package com.ems.base;

import com.microsoft.playwright.Page;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

public class TestFailureExtension implements TestWatcher {

    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        String testName = context.getDisplayName().replaceAll("[^a-zA-Z0-9.-]", "_");
        Path screenshotPath = Paths.get("target/screenshots/" + testName + ".png");

        try {
            Files.createDirectories(screenshotPath.getParent());
            BaseTest.page.screenshot(new Page.ScreenshotOptions().setPath(screenshotPath));
            System.out.println("Screenshot saved at: " + screenshotPath.toAbsolutePath());
        } catch (Exception e) {
            System.err.println("Failed to take screenshot: " + e.getMessage());
        }
    }
}
