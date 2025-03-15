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

  // Flash Sales Countdown Timer
  function updateCountdown() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999); // End of today

    const diff = end - now;
    if (diff <= 0) {
      // Reset timer for next day
      end.setDate(end.getDate() + 1);
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update timer display
    document.querySelector(".timer-unit:nth-child(1) .unit-value").textContent =
      String(days).padStart(2, "0");
    document.querySelector(".timer-unit:nth-child(3) .unit-value").textContent =
      String(hours).padStart(2, "0");
    document.querySelector(".timer-unit:nth-child(5) .unit-value").textContent =
      String(minutes).padStart(2, "0");
    document.querySelector(".timer-unit:nth-child(7) .unit-value").textContent =
      String(seconds).padStart(2, "0");
  }

  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call

  // Initialize all tooltips with auto-hide
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) =>
      new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
        delay: { hide: 2000 }, // Hide tooltip after 2 seconds
      })
  );

  // Wishlist Button Toggle with Tooltip Update
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const tooltip = bootstrap.Tooltip.getInstance(this);

      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        tooltip.setContent({ ".tooltip-inner": "Added to Wishlist" });
        this.classList.add("added");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        tooltip.setContent({ ".tooltip-inner": "Removed from Wishlist" });
        this.classList.remove("added");
      }

      // Hide tooltip after 2 seconds
      setTimeout(() => {
        tooltip.hide();
      }, 2000);
    });
  });

  // Quick View Buttons
  const quickViewButtons = document.querySelectorAll(".quick-view");
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productName =
        productCard.querySelector(".product-name").textContent;
      // Placeholder for quick view modal
      alert(`Quick view for ${productName}`);
    });
  });

  // Add to Cart Button with Tooltip Update
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tooltip = bootstrap.Tooltip.getInstance(this);

      if (!this.classList.contains("added")) {
        this.classList.add("added");
        tooltip.setContent({ ".tooltip-inner": "Added to Cart" });
      } else {
        this.classList.remove("added");
        tooltip.setContent({ ".tooltip-inner": "Removed from Cart" });
      }

      // Add animation class
      this.classList.add("animate__animated", "animate__pulse");

      // Remove animation class after animation ends
      this.addEventListener(
        "animationend",
        () => {
          this.classList.remove("animate__animated", "animate__pulse");
        },
        { once: true }
      );

      // Hide tooltip after 2 seconds
      setTimeout(() => {
        tooltip.hide();
      }, 2000);
    });
  });

  // Product Navigation
  const prevButton = document.querySelector(".nav-arrow.prev");
  const nextButton = document.querySelector(".nav-arrow.next");
  const productGrid = document.querySelector(".product-grid");

  if (prevButton && nextButton && productGrid) {
    let currentPage = 0;
    const totalProducts = document.querySelectorAll(".product-card").length;
    const productsPerPage = 4;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    function updateNavigation() {
      // Update button states
      prevButton.style.opacity = currentPage === 0 ? "0.5" : "1";
      nextButton.style.opacity = currentPage >= totalPages - 1 ? "0.5" : "1";
    }

    prevButton.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        // Add slide animation here
        productGrid.style.transform = `translateX(-${currentPage * 100}%)`;
        updateNavigation();
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        // Add slide animation here
        productGrid.style.transform = `translateX(-${currentPage * 100}%)`;
        updateNavigation();
      }
    });

    // Initialize navigation state
    updateNavigation();
  }

  // View All Products Button
  const viewAllButton = document.querySelector(".view-all-btn");
  if (viewAllButton) {
    viewAllButton.addEventListener("click", function () {
      // Placeholder for view all products functionality
      console.log("View all products clicked");
    });
  }

  // Interactive Star Rating
  const starContainers = document.querySelectorAll(".stars");
  starContainers.forEach((container) => {
    const stars = container.querySelectorAll("i");
    let currentRating = parseInt(container.dataset.rating) || 5;
    const reviewCount = container.parentElement.querySelector(".review-count");
    const originalReviewText = reviewCount.textContent;

    // Update stars display based on rating
    function updateStars(rating, isHover = false) {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.remove("far");
          star.classList.add("fas");
        } else {
          star.classList.remove("fas");
          star.classList.add("far");
        }
        star.classList.toggle("hovered", isHover && index <= rating);
      });

      // Update review count text to show current rating
      if (!isHover) {
        reviewCount.textContent = `${rating} out of 5 stars ${originalReviewText}`;
      }
    }

    // Hover effect
    stars.forEach((star, index) => {
      star.addEventListener("mouseenter", () => {
        updateStars(index + 1, true);
      });

      star.addEventListener("mouseleave", () => {
        updateStars(currentRating);
      });

      star.addEventListener("click", () => {
        currentRating = index + 1;
        container.dataset.rating = currentRating;
        updateStars(currentRating);

        // Add click animation
        star.classList.add("animate__animated", "animate__bounceIn");
        star.addEventListener(
          "animationend",
          () => {
            star.classList.remove("animate__animated", "animate__bounceIn");
          },
          { once: true }
        );
      });
    });

    // Initialize stars with current rating
    updateStars(currentRating);

    // Mouse leave container
    container.addEventListener("mouseleave", () => {
      updateStars(currentRating);
    });
  });
});
