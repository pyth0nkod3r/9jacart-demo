// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Language selector dropdowns
  const languageSelectors = document.querySelectorAll(
    ".language-selector, .nav-language-selector"
  );

  languageSelectors.forEach((selector) => {
    selector.addEventListener("click", function (e) {
      // Placeholder for language selection functionality
      console.log("Language selector clicked");
    });
  });

  // Category dropdown in search bar
  const categoryDropdown = document.querySelector(".category-dropdown");
  if (categoryDropdown) {
    categoryDropdown.addEventListener("click", function (e) {
      // Placeholder for category selection functionality
      console.log("Category dropdown clicked");
    });
  }

  // Account & Lists dropdown
  const accountDropdown = document.querySelector(".account-dropdown");
  if (accountDropdown) {
    accountDropdown.addEventListener("click", function (e) {
      // Placeholder for account dropdown functionality
      console.log("Account dropdown clicked");
    });
  }

  // Search functionality
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", function (e) {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // Placeholder for search functionality
        console.log("Search term:", searchTerm);
      }
    });

    // Enable search on Enter key
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          // Placeholder for search functionality
          console.log("Search term:", searchTerm);
        }
      }
    });
  }

  // Shop Now link
  const shopNowLink = document.querySelector(".shop-now");
  if (shopNowLink) {
    shopNowLink.addEventListener("click", function (e) {
      e.preventDefault();
      // Placeholder for shop now functionality
      console.log("Shop Now clicked");
    });
  }

  // Cart interaction
  const cartSection = document.querySelector(".cart-section");
  if (cartSection) {
    cartSection.addEventListener("click", function (e) {
      // Placeholder for cart functionality
      console.log("Cart clicked");
    });
  }

  // Banner Navigation Dots
  const dots = document.querySelectorAll(".banner-dots .dot");

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Remove active class from all dots
      dots.forEach((d) => d.classList.remove("active"));
      // Add active class to clicked dot
      dot.classList.add("active");

      // Here you would typically add logic to switch banner slides
      console.log("Switching to slide:", index + 1);
    });
  });
});
