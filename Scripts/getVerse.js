document.addEventListener("DOMContentLoaded", async () => {
    const verseElement = document.getElementById("verse");

    // the random verse comes from somewhere, and here it is 
    async function fetchVerse() {
        try {
            const response = await fetch('https://book-of-mormon-api.vercel.app/random');
            const data = await response.json();
            verseElement.textContent = `${data.reference} - ${data.text}`;
        } catch (error) {
            verseElement.textContent = "Failed to load verse. Please try again.";
            console.error("Error fetching verse:", error);
        }
    }

    fetchVerse();
});
