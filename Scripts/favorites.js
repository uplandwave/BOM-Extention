// localStorage.removeItem('favorites');

// document.addEventListener("DOMContentLoaded", () => {
//     const settingsIcon = document.getElementById("settings-icon");
//     const settingsDialog = document.getElementById("settings-dialog");
//     const closeSettingsButton = document.getElementById("close-settings");
//     const saveSettingsButton = document.getElementById("save-settings");
//     const themeSelect = document.getElementById("theme");

//     const addFavoriteButton = document.getElementById("add-favorite");
//     const addFavoriteDialog = document.getElementById("add-favorite-dialog");
//     const saveFavoriteButton = document.getElementById("save-favorite");
//     const closeFavoriteButton = document.getElementById("close-favorite");

//     const favoriteNameInput = document.getElementById("favorite-name");
//     const favoriteUrlInput = document.getElementById("favorite-url");
//     const favoriteIconSelect = document.getElementById("favorite-icon");
//     const favoritesContainer = document.getElementById("favorites");

//     // Load saved theme from local storage
//     const savedTheme = localStorage.getItem("theme") || "default";
//     document.body.classList.add(savedTheme);
//     themeSelect.value = savedTheme;

//     settingsIcon.addEventListener("click", () => {
//         settingsDialog.style.display = "block";
//     });

//     closeSettingsButton.addEventListener("click", () => {
//         settingsDialog.style.display = "none";
//     });

//     saveSettingsButton.addEventListener("click", () => {
//         const selectedTheme = themeSelect.value;

//         // Remove the previous theme class and add the new one
//         document.body.classList.remove(savedTheme);
//         document.body.classList.add(selectedTheme);

//         // Save the new theme to local storage
//         localStorage.setItem("theme", selectedTheme);

//         settingsDialog.style.display = "none";
//     });

//     // Load saved favorites from local storage
//     const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     savedFavorites.forEach(favorite => {
//         addFavoriteToDOM(favorite);
//     });

//     addFavoriteButton.addEventListener("click", () => {
//         addFavoriteDialog.style.display = "block";
//     });

//     closeFavoriteButton.addEventListener("click", () => {
//         addFavoriteDialog.style.display = "none";
//     });

//     saveFavoriteButton.addEventListener("click", () => {
//         const favorite = {
//             name: favoriteNameInput.value,
//             url: favoriteUrlInput.value,
//             icon: favoriteIconSelect.value
//         };

//         // Save to local storage
//         savedFavorites.push(favorite);
//         localStorage.setItem("favorites", JSON.stringify(savedFavorites));

//         // Add to the DOM
//         addFavoriteToDOM(favorite);

//         // Clear inputs
//         favoriteNameInput.value = '';
//         favoriteUrlInput.value = '';
//         favoriteIconSelect.value = '';

//         addFavoriteDialog.style.display = "none";
//     });

//     function addFavoriteToDOM(favorite) {
//         const favoriteElement = document.createElement("div");
//         favoriteElement.className = "favorite";
//         favoriteElement.innerHTML = favorite.icon;
//         favoriteElement.title = favorite.name;
//         favoriteElement.onclick = () => {
//             window.open(favorite.url, "_blank");
//         };

//         const favoriteNameElement = document.createElement("div");
//         favoriteNameElement.className = "favorite-name";
//         favoriteNameElement.textContent = favorite.name;

//         favoriteElement.appendChild(favoriteNameElement);
//         favoritesContainer.insertBefore(favoriteElement, addFavoriteButton);
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const addFavoriteButton = document.getElementById("add-favorite");
    const addFavoriteDialog = document.getElementById("add-favorite-dialog");
    const saveFavoriteButton = document.getElementById("save-favorite");
    const closeFavoriteButton = document.getElementById("close-favorite");

    const favoriteNameInput = document.getElementById("favorite-name");
    const favoriteUrlInput = document.getElementById("favorite-url");
    const favoriteIconSelect = document.getElementById("favorite-icon");
    const favoritesContainer = document.getElementById("favorites");

    // Load saved favorites from local storage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    savedFavorites.forEach(favorite => {
        addFavoriteToDOM(favorite);
    });

    addFavoriteButton.addEventListener("click", () => {
        addFavoriteDialog.style.display = "block";
    });

    closeFavoriteButton.addEventListener("click", () => {
        addFavoriteDialog.style.display = "none";
    });

    saveFavoriteButton.addEventListener("click", () => {
        let url = favoriteUrlInput.value;
        
        // Ensure the URL is absolute
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
        }

        const favorite = {
            name: favoriteNameInput.value,
            url: url,
            icon: favoriteIconSelect.value
        };

        console.log("Saving favorite:", favorite);

        // Save to local storage
        savedFavorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(savedFavorites));

        // Add to the DOM
        addFavoriteToDOM(favorite);

        // Clear inputs
        favoriteNameInput.value = '';
        favoriteUrlInput.value = '';
        favoriteIconSelect.value = '';

        addFavoriteDialog.style.display = "none";
    });

    function addFavoriteToDOM(favorite) {
        const favoriteElement = document.createElement("div");
        favoriteElement.className = "favorite";
        favoriteElement.innerHTML = favorite.icon;
        favoriteElement.title = favorite.name;
        
        // Create a span for the remove button
        const removeButton = document.createElement("span");
        removeButton.className = "remove-favorite";
        removeButton.textContent = "X";
        removeButton.onclick = (e) => {
            e.stopPropagation();  // Prevent triggering the click event on the favorite
            removeFavorite(favorite, favoriteElement);
        };
        favoriteElement.appendChild(removeButton);
        
        // Add click event to change the current tab
        favoriteElement.onclick = () => {
            console.log("Opening URL:", favorite.url);
            window.location.href = favorite.url;
        };

        const favoriteNameElement = document.createElement("div");
        favoriteNameElement.className = "favorite-name";
        favoriteNameElement.textContent = favorite.name;

        favoriteElement.appendChild(favoriteNameElement);
        favoritesContainer.insertBefore(favoriteElement, addFavoriteButton);
    }

    function removeFavorite(favorite, favoriteElement) {
        const index = savedFavorites.indexOf(favorite);
        if (index > -1) {
            savedFavorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(savedFavorites));
            favoriteElement.remove();
        }
    }
});

