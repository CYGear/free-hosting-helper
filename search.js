// Example list of websites (this will later be dynamically fetched or updated)
const websites = [
    { name: "MyCoolSite", id: 1, url: "https://cygear.github.io/free-hosting-helper/websites/MyCoolSite_1/" },
    { name: "AnotherSite", id: 2, url: "https://cygear.github.io/free-hosting-helper/websites/AnotherSite_2/" },
    { name: "TestWebsite", id: 3, url: "https://cygear.github.io/free-hosting-helper/websites/TestWebsite_3/" },
];

// Populate the list of websites
const websiteList = document.getElementById("websiteList");
function populateList(sites) {
    websiteList.innerHTML = ""; // Clear existing list
    sites.forEach((site) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${site.url}" target="_blank">${site.name} (ID: ${site.id})</a>`;
        websiteList.appendChild(li);
    });
}

// Initial population
populateList(websites);

// Search functionality
document.getElementById("search").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredWebsites = websites.filter(
        (site) =>
            site.name.toLowerCase().includes(query) ||
            site.id.toString().includes(query)
    );
    populateList(filteredWebsites);
});
