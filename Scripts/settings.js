// Add this line to your JavaScript file for testing purposes
// localStorage.removeItem('theme');

// Existing JavaScript code...
document.addEventListener("DOMContentLoaded", () => {
    const settingsIcon = document.getElementById("settings-icon");
    const settingsDialog = document.getElementById("settings-dialog");
    const closeSettingsButton = document.getElementById("close-settings");
    const saveSettingsButton = document.getElementById("save-settings");
    const themeSelect = document.getElementById("theme");

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem("theme") || "default";
    document.body.classList.add(savedTheme);
    themeSelect.value = savedTheme;

    settingsIcon.addEventListener("click", () => {
        settingsDialog.style.display = "block";
    });

    closeSettingsButton.addEventListener("click", () => {
        settingsDialog.style.display = "none";
    });

    saveSettingsButton.addEventListener("click", () => {
        const selectedTheme = themeSelect.value;

        // Remove the previous theme class and add the new one
        document.body.classList.remove(savedTheme);
        document.body.classList.add(selectedTheme);

        // Save the new theme to local storage
        localStorage.setItem("theme", selectedTheme);

        settingsDialog.style.display = "none";
    });
});
