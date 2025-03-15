// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Handle promotional banner close button if needed
  const promoBanner = document.querySelector(".promo-banner");
  if (promoBanner) {
    const closeButton = document.createElement("button");
    closeButton.className =
      "btn-close btn-close-white position-absolute end-0 me-3";
    closeButton.setAttribute("aria-label", "Close");

    closeButton.addEventListener("click", () => {
      promoBanner.style.display = "none";
    });

    promoBanner.style.position = "relative";
    promoBanner.appendChild(closeButton);
  }

  // Handle search functionality
  const searchForm = document.querySelector(".search-container .input-group");
  const searchInput = searchForm?.querySelector("input");
  const searchButton = searchForm?.querySelector(".btn-success");

  if (searchForm && searchInput && searchButton) {
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      // Add your search logic here
      console.log("Search query:", searchInput.value);
    });

    // Handle enter key in search input
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
      }
    });
  }

  // Initialize Bootstrap dropdowns
  const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
  const dropdownList = [...dropdownElementList].map((dropdownToggleEl) => {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });
});
