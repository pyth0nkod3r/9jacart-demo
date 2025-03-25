// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Utility Functions
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getProductsPerPage() {
    return window.innerWidth >= 1200
      ? 4
      : window.innerWidth >= 992
      ? 3
      : window.innerWidth >= 768
      ? 2
      : 1;
  }

  // Initialize Common UI Elements
  function initializeCommonUI() {
    // Language selector dropdowns
    const languageSelectors = document.querySelectorAll(
      ".language-selector, .nav-language-selector"
    );
    languageSelectors.forEach((selector) => {
      selector.addEventListener("click", () =>
        console.log("Language selector clicked")
      );
    });

    // Category dropdown in search bar
    const categoryDropdown = document.querySelector(".category-dropdown");
    if (categoryDropdown) {
      categoryDropdown.addEventListener("click", () =>
        console.log("Category dropdown clicked")
      );
    }

    // Account dropdown
    const accountDropdown = document.querySelector(".account-dropdown");
    if (accountDropdown) {
      accountDropdown.addEventListener("click", () =>
        console.log("Account dropdown clicked")
      );
    }

    // Search functionality
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.querySelector(".search-input");
    if (searchButton && searchInput) {
      const handleSearch = () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) console.log("Search term:", searchTerm);
      };

      searchButton.addEventListener("click", handleSearch);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSearch();
      });
    }

    // Shop Now and Cart interactions
    const shopNowLink = document.querySelector(".shop-now");
    if (shopNowLink) {
      shopNowLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Shop Now clicked");
      });
    }

    const cartSection = document.querySelector(".cart-section");
    if (cartSection) {
      cartSection.addEventListener("click", () => console.log("Cart clicked"));
    }
  }

  // Initialize Tooltips
  function initializeTooltips(container) {
    const tooltipTriggerList = container.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
      const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
        delay: { hide: 2000 },
      });

      tooltipTriggerEl.addEventListener("mouseenter", () => {
        tooltipList.forEach((t) => {
          if (t._element !== tooltipTriggerEl) t.hide();
        });
      });

      return tooltip;
    });
    return tooltipList;
  }

  // Initialize Category Cards
  function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Remove active class from all cards
        categoryCards.forEach((c) => c.classList.remove("active"));
        // Add active class to clicked card
        this.classList.add("active");
      });
    });
  }

  // Initialize Product Interactions
  function initializeProductInteractions(container) {
    // Wishlist functionality
    const wishlistButtons = container.querySelectorAll(".wishlist-btn");
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const icon = this.querySelector("i");
        const tooltip = bootstrap.Tooltip.getInstance(this);
        const productName =
          this.closest(".product-card").querySelector(
            ".product-name"
          ).textContent;
        const isAdding = icon.classList.contains("far");

        icon.classList.toggle("far", !isAdding);
        icon.classList.toggle("fas", isAdding);
        this.setAttribute(
          "data-bs-title",
          isAdding ? "Added to Wishlist" : "Add to Wishlist"
        );
        tooltip.setContent({
          ".tooltip-inner": isAdding
            ? "Added to Wishlist"
            : "Removed from Wishlist",
        });
        this.classList.toggle("added", isAdding);

        console.log(
          `${isAdding ? "Added" : "Removed"} ${productName} ${
            isAdding ? "to" : "from"
          } wishlist`
        );

        // Animation
        icon.classList.add("animate__animated", "animate__bounceIn");
        icon.addEventListener(
          "animationend",
          () => {
            icon.classList.remove("animate__animated", "animate__bounceIn");
          },
          { once: true }
        );

        setTimeout(() => tooltip.hide(), 2000);
      });
    });

    // Quick view functionality
    const quickViewButtons = container.querySelectorAll(".quick-view");
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const productName =
          this.closest(".product-card").querySelector(
            ".product-name"
          ).textContent;
        const tooltip = bootstrap.Tooltip.getInstance(this);

        tooltip.show();
        console.log(`Quick view for ${productName}`);
        setTimeout(() => tooltip.hide(), 2000);
      });
    });

    // Add to cart functionality
    const addToCartButtons = container.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const tooltip = bootstrap.Tooltip.getInstance(this);
        const productName =
          this.closest(".product-card").querySelector(
            ".product-name"
          ).textContent;
        const isAdding = !this.classList.contains("added");

        this.classList.toggle("added", isAdding);
        this.textContent = isAdding ? "Remove from Cart" : "Add To Cart";
        this.setAttribute(
          "data-bs-title",
          isAdding ? "Added to Cart" : "Add to Cart"
        );
        tooltip.setContent({
          ".tooltip-inner": isAdding ? "Added to Cart" : "Removed from Cart",
        });

        this.classList.add("animate__animated", "animate__pulse");
        this.addEventListener(
          "animationend",
          () => {
            this.classList.remove("animate__animated", "animate__pulse");
          },
          { once: true }
        );

        console.log(
          `${isAdding ? "Added" : "Removed"} ${productName} ${
            isAdding ? "to" : "from"
          } cart`
        );
        setTimeout(() => tooltip.hide(), 2000);
      });
    });
  }

  // Initialize Product Navigation
  function initializeProductNavigation(container, options = {}) {
    const prevBtn = container.querySelector(".nav-arrow.prev");
    const nextBtn = container.querySelector(".nav-arrow.next");
    const productGrid = container.querySelector(".product-grid");
    const productCards = container.querySelectorAll(".product-card");

    if (!prevBtn || !nextBtn || !productGrid || !productCards.length) return;

    let currentPage = 0;
    const productsPerPage = getProductsPerPage();
    const totalPages = Math.ceil(productCards.length / productsPerPage);

    function updateNavigation() {
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage >= totalPages - 1;
      productGrid.style.transform = `translateX(-${
        currentPage * (100 / productsPerPage)
      }%)`;
      productGrid.style.transition = "transform 0.3s ease";
    }

    prevBtn.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        updateNavigation();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateNavigation();
      }
    });

    updateNavigation();

    // Update on window resize
    window.addEventListener("resize", () => {
      const newProductsPerPage = getProductsPerPage();
      if (productsPerPage !== newProductsPerPage) {
        currentPage = 0;
        updateNavigation();
      }
    });

    // Add hover effects if enabled
    if (options.enableHoverEffects) {
      productCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-5px)";
          card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
        });
      });
    }
  }

  // Initialize Countdown Timer
  function initializeCountdownTimer(endDate) {
    const elements = {
      days: document.querySelector("[data-days]"),
      hours: document.querySelector("[data-hours]"),
      minutes: document.querySelector("[data-minutes]"),
      seconds: document.querySelector("[data-seconds]"),
    };

    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;

      if (diff < 0) {
        clearInterval(timerInterval);
        Object.values(elements).forEach((el) => {
          if (el) el.textContent = "00";
        });
        return;
      }

      const times = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };

      Object.entries(times).forEach(([key, value]) => {
        if (elements[key]) {
          elements[key].textContent = String(value).padStart(2, "0");
        }
      });
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
  }

  // Initialize Star Rating
  function initializeStarRating() {
    const starContainers = document.querySelectorAll(".stars");
    starContainers.forEach((container) => {
      const stars = container.querySelectorAll("i");
      let currentRating = parseInt(container.dataset.rating) || 5;
      const reviewCount =
        container.parentElement.querySelector(".review-count");
      const originalReviewText = reviewCount.textContent;

      function updateStars(rating, isHover = false) {
        stars.forEach((star, index) => {
          star.classList.toggle("fas", index < rating);
          star.classList.toggle("far", index >= rating);
          star.classList.toggle("hovered", isHover && index <= rating);
        });

        if (!isHover) {
          reviewCount.textContent = `${rating} out of 5 stars ${originalReviewText}`;
        }
      }

      stars.forEach((star, index) => {
        star.addEventListener("mouseenter", () => updateStars(index + 1, true));
        star.addEventListener("mouseleave", () => updateStars(currentRating));
        star.addEventListener("click", () => {
          currentRating = index + 1;
          container.dataset.rating = currentRating;
          updateStars(currentRating);

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

      updateStars(currentRating);
      container.addEventListener("mouseleave", () =>
        updateStars(currentRating)
      );
    });
  }

  // Initialize Footer
  function initializeFooter() {
    const mainFooter = document.querySelector(".main-footer");
    if (!mainFooter) return;

    // Email Subscription
    const subscribeForm = mainFooter.querySelector(".subscribe-form");
    if (subscribeForm) {
      subscribeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
          console.log("Subscribing email:", email);
          emailInput.value = "";

          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-2";
          successMessage.textContent = "Thank you for subscribing!";
          this.appendChild(successMessage);

          setTimeout(() => successMessage.remove(), 3000);
        }
      });
    }

    // Social Media Links
    mainFooter.querySelectorAll(".social-links a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(
          `Opening ${this.getAttribute("href").replace("#", "")} profile`
        );
      });
    });

    // App Store Buttons
    mainFooter.querySelectorAll(".app-btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(
          `Opening ${this.getAttribute("href").replace("#", "")} download page`
        );
      });
    });

    // Footer Links Hover Effect
    mainFooter.querySelectorAll(".footer-links a").forEach((link) => {
      link.addEventListener(
        "mouseenter",
        () => (link.style.paddingLeft = "5px")
      );
      link.addEventListener("mouseleave", () => (link.style.paddingLeft = "0"));
    });

    // Smooth Scroll
    mainFooter.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.getElementById(
          this.getAttribute("href").slice(1)
        );
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // Initialize Categories Page
  function initializeCategories() {
    const categoriesContent = document.querySelector(".categories-content");
    if (!categoriesContent) return;

    // Category List Functionality
    const categoryLinks = document.querySelectorAll(".categories-list a");
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        categoryLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
        console.log(`Selected category: ${this.textContent.trim()}`);
      });
    });

    // Filter Dropdowns
    const sortByBtn = document.querySelector(
      ".filter-section button:nth-child(1)"
    );
    const priceRangeBtn = document.querySelector(
      ".filter-section button:nth-child(2)"
    );

    if (sortByBtn) {
      sortByBtn.addEventListener("click", function () {
        const options = [
          "Newest First",
          "Price: Low to High",
          "Price: High to Low",
          "Most Popular",
        ];
        const currentOption = this.textContent.trim();
        const nextOption =
          options[(options.indexOf(currentOption) + 1) % options.length];
        this.textContent = nextOption;
        console.log(`Sorting by: ${nextOption}`);
      });
    }

    if (priceRangeBtn) {
      priceRangeBtn.addEventListener("click", function () {
        const ranges = ["$0 - $100", "$100 - $500", "$500 - $1000", "$1000+"];
        const currentRange = this.textContent.trim();
        const nextRange =
          ranges[(ranges.indexOf(currentRange) + 1) % ranges.length];
        this.textContent = nextRange;
        console.log(`Price range: ${nextRange}`);
      });
    }

    // Initialize Product Cards
    const productsContainer = categoriesContent.querySelector(".row.g-4");
    if (productsContainer) {
      // Initialize tooltips
      initializeTooltips(productsContainer);

      // Initialize product interactions
      initializeProductInteractions(productsContainer);

      // Add hover effects and click handling for product cards
      const productCards = productsContainer.querySelectorAll(".product-card");
      productCards.forEach((card) => {
        // Add hover effect
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-5px)";
          card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
        });

        // Add click handler for product navigation
        card.addEventListener("click", () => {
          const productName = card.querySelector(".product-name").textContent;
          console.log(`Navigating to product: ${productName}`);
          // You can add actual navigation here
          window.location.href = "product-details.html";
        });
      });

      // Initialize color selection
      const colorDots = productsContainer.querySelectorAll(".color-dot");
      colorDots.forEach((dot) => {
        dot.addEventListener("click", function (e) {
          e.stopPropagation(); // Prevent card click
          const colorDots =
            this.closest(".color-options").querySelectorAll(".color-dot");
          colorDots.forEach((d) => d.classList.remove("active"));
          this.classList.add("active");
        });
      });
    }
  }

  // Initialize all sections
  function initializeAllSections() {
    // Initialize common UI elements
    initializeCommonUI();

    // Initialize Category Cards
    initializeCategoryCards();

    // Initialize Categories Page
    initializeCategories();

    // Initialize Flash Sales Section
    const flashSalesSection = document.querySelector(".flash-sales");
    if (flashSalesSection) {
      initializeTooltips(flashSalesSection);
      initializeProductInteractions(flashSalesSection);
      initializeProductNavigation(flashSalesSection, {
        enableHoverEffects: true,
      });

      // Set countdown end date to 5 days from now
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 5);
      initializeCountdownTimer(endDate);
    }

    // Initialize Best Selling Section
    const bestSellingSection = document.querySelector(".best-selling");
    if (bestSellingSection) {
      initializeTooltips(bestSellingSection);
      initializeProductInteractions(bestSellingSection);
    }

    // Initialize Product Display Section
    const productDisplaySection = document.querySelector(".product-display");
    if (productDisplaySection) {
      initializeTooltips(productDisplaySection);
      initializeProductInteractions(productDisplaySection);
      initializeProductNavigation(productDisplaySection);
    }

    // Initialize Star Rating
    initializeStarRating();

    // Initialize Footer
    initializeFooter();

    // Initialize Product Details Page
    initializeProductDetails();
  }

  // Initialize Product Details Page
  function initializeProductDetails() {
    const productDetails = document.querySelector(".product-details");
    if (!productDetails) return;

    // Thumbnail and Main Image Handling
    const thumbnailItems = document.querySelectorAll(".thumbnail-item");
    const mainImage = document.querySelector(".main-image img");

    thumbnailItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Update active state
        thumbnailItems.forEach((thumb) => thumb.classList.remove("active"));
        this.classList.add("active");

        // Update main image
        const newImageSrc = this.querySelector("img").src;
        mainImage.src = newImageSrc;

        // Add animation
        mainImage.classList.add("animate__animated", "animate__fadeIn");
        mainImage.addEventListener(
          "animationend",
          () => {
            mainImage.classList.remove("animate__animated", "animate__fadeIn");
          },
          { once: true }
        );
      });
    });

    // Color Selection
    const colorDots = document.querySelectorAll(".color-dot");
    colorDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        colorDots.forEach((d) => d.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Size Selection
    const sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        sizeBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Quantity Selector
    const quantityInput = document.querySelector(".quantity-input");
    const minusBtn = document.querySelector(".quantity-btn.minus");
    const plusBtn = document.querySelector(".quantity-btn.plus");

    function updateQuantity(newValue) {
      const value = parseInt(newValue);
      if (isNaN(value) || value < 1) return;
      quantityInput.value = value;
      minusBtn.disabled = value <= 1;
    }

    minusBtn.addEventListener("click", () => {
      updateQuantity(parseInt(quantityInput.value) - 1);
    });

    plusBtn.addEventListener("click", () => {
      updateQuantity(parseInt(quantityInput.value) + 1);
    });

    // Initialize minus button state
    minusBtn.disabled = parseInt(quantityInput.value) <= 1;

    // Buy Now Button
    const buyNowBtn = document.querySelector(".buy-now-btn");
    buyNowBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Add animation
      this.classList.add("animate__animated", "animate__pulse");
      this.addEventListener(
        "animationend",
        () => {
          this.classList.remove("animate__animated", "animate__pulse");
        },
        { once: true }
      );

      // Show tooltip or feedback
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(this, {
        title: "Processing your order...",
        trigger: "manual",
      });
      tooltip.show();
      setTimeout(() => tooltip.hide(), 2000);

      console.log("Buy Now clicked:", {
        product: document.querySelector(".product-title").textContent,
        quantity: quantityInput.value,
        color: document
          .querySelector(".color-dot.active")
          .getAttribute("style")
          .match(/background-color: (#[a-f0-9]{6}|[a-z]+)/i)[1],
        size: document.querySelector(".size-btn.active").textContent,
      });
    });

    // Wishlist Button
    const wishlistBtn = document.querySelector(".add-to-wishlist");
    wishlistBtn.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const isAdding = icon.classList.contains("far");

      // Toggle icon
      icon.classList.toggle("far", !isAdding);
      icon.classList.toggle("fas", isAdding);

      // Add animation
      icon.classList.add("animate__animated", "animate__bounceIn");
      icon.addEventListener(
        "animationend",
        () => {
          icon.classList.remove("animate__animated", "animate__bounceIn");
        },
        { once: true }
      );

      // Show tooltip
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(this, {
        title: isAdding ? "Added to Wishlist" : "Removed from Wishlist",
        trigger: "manual",
      });
      tooltip.show();
      setTimeout(() => tooltip.hide(), 2000);

      console.log(
        `${isAdding ? "Added to" : "Removed from"} wishlist:`,
        document.querySelector(".product-title").textContent
      );
    });

    // Initialize tooltips for delivery info
    const deliveryOptions = document.querySelectorAll(".delivery-option");
    deliveryOptions.forEach((option) => {
      const tooltip = new bootstrap.Tooltip(option, {
        title: option.querySelector("p").textContent,
        placement: "top",
        trigger: "hover",
      });
    });

    // Initialize Related Items Section
    const relatedItemsSection = document.querySelector(
      ".container-fluid .row.g-4"
    );
    if (relatedItemsSection) {
      // Initialize tooltips for related items
      initializeTooltips(relatedItemsSection);

      // Initialize product interactions for related items
      initializeProductInteractions(relatedItemsSection);

      // Add hover effects for related product cards
      const relatedProducts =
        relatedItemsSection.querySelectorAll(".product-card");
      relatedProducts.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-5px)";
          card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
        });

        // Add click handler for product navigation
        card.addEventListener("click", () => {
          const productName = card.querySelector(".product-name").textContent;
          console.log(`Navigating to product: ${productName}`);
          // You can add actual navigation here
        });
      });
    }
  }

  // Add mobile menu handling
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      const navContent = document.querySelector(".nav-content");
      navContent.classList.toggle("show-mobile-menu");
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      const navContent = document.querySelector(".nav-content");
      navContent.classList.remove("show-mobile-menu");
    }
  });

  // Start initialization
  initializeAllSections();
});
