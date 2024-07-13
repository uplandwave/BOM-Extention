document.addEventListener("DOMContentLoaded", () => {
    const infoIcon = document.getElementById("info-icon");
    const tooltip = document.getElementById("tooltip");

    // this little piece looks for the user to click on the info button 
    infoIcon.addEventListener("click", () => {
        tooltip.style.display = tooltip.style.display === "block" ? "none" : "block";
    });
});

