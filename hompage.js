async function fetchWebsites() {
  try {
    const response = await fetch('./websites.json'); // Adjust path if needed
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching websites:", error);
    return [];
  }
}

function createNavbar(genres) {
  const navbar = document.getElementById("genreNavbar");
  navbar.innerHTML = "";

  const allTab = document.createElement("a");
  allTab.textContent = "All";
  allTab.onclick = () => displayWebsitesByGenre("All");
  navbar.appendChild(allTab);

  genres.forEach((genre) => {
    const tab = document.createElement("a");
    tab.textContent = genre;
    tab.onclick = () => displayWebsitesByGenre(genre);
    navbar.appendChild(tab);
  });
}

function createWebsiteCard(website) {
  const card = document.createElement("div");
  card.className = "website-card";

  const thumbnail = document.createElement("img");
  thumbnail.src = website.image || "default-thumbnail.png"; // Use default if no thumbnail
  thumbnail.alt = `${website.name} thumbnail`;
  card.appendChild(thumbnail);

  const name = document.createElement("h3");
  name.textContent = website.name;
  card.appendChild(name);

  const link = document.createElement("a");
  link.href = website.url;
  link.target = "_blank";
  link.textContent = "Visit Website";
  card.appendChild(link);

  return card;
}

async function displayWebsitesByGenre(selectedGenre) {
  const websites = await fetchWebsites();
  const websiteContainer = document.getElementById("websiteContainer");
  websiteContainer.innerHTML = "";

  const filteredWebsites =
    selectedGenre === "All"
      ? websites
      : websites.filter((website) => website.genre === selectedGenre);

  if (filteredWebsites.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No websites found in this genre.";
    websiteContainer.appendChild(message);
  } else {
    filteredWebsites.forEach((website) => {
      const card = createWebsiteCard(website);
      websiteContainer.appendChild(card);
    });
  }
}

async function initializePage() {
  const websites = await fetchWebsites();
  const genres = Array.from(new Set(websites.map((website) => website.genre)));
  createNavbar(genres);
  displayWebsitesByGenre("All");
}

initializePage();

