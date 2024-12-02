// Fetch the websites.json file and populate the list
async function fetchWebsites() {
    try {
        const response = await fetch("https://cygear.github.io/free-hosting-helper/websites.json");
        const websites = await response.json();
        populateList(websites);
    } catch (error) {
        console.error("Failed to fetch websites.json:", error);
    }
}

// Populate the list of websites
function populateList(sites) {
    const websiteList = document.getElementById("websiteList");
    websiteList.innerHTML = ""; // Clear existing list
    sites.forEach((site) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${site.url}" target="_blank">${site.name} (ID: ${site.id})</a>`;
        websiteList.appendChild(li);
    });
}

// Search functionality
document.getElementById("search").addEventListener("input", async (event) => {
    const query = event.target.value.toLowerCase();
    const response = await fetch("https://cygear.github.io/free-hosting-helper/websites.json");
    const websites = await response.json();

    const filteredWebsites = websites.filter(
        (site) =>
            site.name.toLowerCase().includes(query) ||
            site.id.toString().includes(query)
    );

    populateList(filteredWebsites);
});

// Load websites on page load
fetchWebsites();
