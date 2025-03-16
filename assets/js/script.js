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

  // Promotional Banner Countdown Timer
  function initPromoCountdown() {
    const daysEl = document.querySelector("[data-days]");
    const hoursEl = document.querySelector("[data-hours]");
    const minutesEl = document.querySelector("[data-minutes]");
    const secondsEl = document.querySelector("[data-seconds]");

    // Set the end date to 5 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 5);

    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;

      // Convert to days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Update the DOM with a smooth transition
      if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

      // If countdown is finished
      if (diff < 0) {
        clearInterval(timerInterval);
        // Reset countdown or show expired message
        [daysEl, hoursEl, minutesEl, secondsEl].forEach((el) => {
          if (el) el.textContent = "00";
        });
      }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
  }

  // Initialize promo countdown
  initPromoCountdown();

  // Buy Now Button Click Handler
  const buyNowBtn = document.querySelector(".buy-now-btn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Add your purchase logic here
      console.log("Buy Now clicked - JBL Boombox");
    });
  }

  // Initialize tooltips with consistent behavior
  function initializeTooltips(container) {
    const tooltipTriggerList = container.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
      const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
        delay: { hide: 2000 },
      });

      // Add mouseenter event to hide other tooltips
      tooltipTriggerEl.addEventListener("mouseenter", () => {
        tooltipList.forEach((t) => {
          if (t._element !== tooltipTriggerEl) {
            t.hide();
          }
        });
      });

      return tooltip;
    });
    return tooltipList;
  }

  // Initialize wishlist functionality
  function initializeWishlist(container) {
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

        if (icon.classList.contains("far")) {
          icon.classList.remove("far");
          icon.classList.add("fas");
          this.setAttribute("data-bs-title", "Added to Wishlist");
          tooltip.setContent({ ".tooltip-inner": "Added to Wishlist" });
          this.classList.add("added");
          console.log(`Added ${productName} to wishlist`);
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
          this.setAttribute("data-bs-title", "Add to Wishlist");
          tooltip.setContent({ ".tooltip-inner": "Removed from Wishlist" });
          this.classList.remove("added");
          console.log(`Removed ${productName} from wishlist`);
        }

        // Add animation
        icon.classList.add("animate__animated", "animate__bounceIn");
        icon.addEventListener(
          "animationend",
          () => {
            icon.classList.remove("animate__animated", "animate__bounceIn");
          },
          { once: true }
        );

        // Hide tooltip after 2 seconds
        setTimeout(() => {
          tooltip.hide();
        }, 2000);
      });
    });
  }

  // Initialize quick view functionality
  function initializeQuickView(container) {
    const quickViewButtons = container.querySelectorAll(".quick-view");
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const productCard = this.closest(".product-card");
        const productName =
          productCard.querySelector(".product-name").textContent;
        const tooltip = bootstrap.Tooltip.getInstance(this);

        // Show quick view tooltip
        this.setAttribute("data-bs-title", "Quick View");
        tooltip.show();

        // Hide tooltip after 2 seconds
        setTimeout(() => {
          tooltip.hide();
        }, 2000);

        console.log(`Quick view for ${productName}`);
      });
    });
  }

  // Initialize add to cart functionality
  function initializeAddToCart(container) {
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

        if (!this.classList.contains("added")) {
          this.classList.add("added");
          this.setAttribute("data-bs-title", "Added to Cart");
          tooltip.setContent({ ".tooltip-inner": "Added to Cart" });
        } else {
          this.classList.remove("added");
          this.setAttribute("data-bs-title", "Add to Cart");
          tooltip.setContent({ ".tooltip-inner": "Removed from Cart" });
        }

        // Add animation
        this.classList.add("animate__animated", "animate__pulse");
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

        console.log(
          `${
            this.classList.contains("added") ? "Added" : "Removed"
          } ${productName} ${
            this.classList.contains("added") ? "to" : "from"
          } cart`
        );
      });
    });
  }

  // Flash Sales Section
  const flashSalesSection = document.querySelector(".flash-sales");
  if (flashSalesSection) {
    // Initialize all interactive features
    initializeTooltips(flashSalesSection);
    initializeWishlist(flashSalesSection);
    initializeQuickView(flashSalesSection);
    initializeAddToCart(flashSalesSection);

    // Flash Sales Navigation
    const prevBtn = flashSalesSection.querySelector(".nav-arrow.prev");
    const nextBtn = flashSalesSection.querySelector(".nav-arrow.next");
    const productGrid = flashSalesSection.querySelector(".product-grid");
    const productCards = flashSalesSection.querySelectorAll(".product-card");

    if (prevBtn && nextBtn && productGrid) {
      let currentPage = 0;
      const productsPerPage =
        window.innerWidth >= 1200
          ? 4
          : window.innerWidth >= 992
          ? 3
          : window.innerWidth >= 768
          ? 2
          : 1;
      const totalPages = Math.ceil(productCards.length / productsPerPage);

      function updateFlashSalesNavigation() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= totalPages - 1;

        // Update grid transform with smooth transition
        productGrid.style.transform = `translateX(-${
          currentPage * (100 / productsPerPage)
        }%)`;
        productGrid.style.transition = "transform 0.3s ease";
      }

      prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          updateFlashSalesNavigation();
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
          currentPage++;
          updateFlashSalesNavigation();
        }
      });

      // Initialize navigation
      updateFlashSalesNavigation();

      // Update on window resize
      window.addEventListener("resize", () => {
        const newProductsPerPage =
          window.innerWidth >= 1200
            ? 4
            : window.innerWidth >= 992
            ? 3
            : window.innerWidth >= 768
            ? 2
            : 1;
        if (productsPerPage !== newProductsPerPage) {
          currentPage = 0;
          updateFlashSalesNavigation();
        }
      });
    }

    // Discount Tag Animation
    const discountTags = flashSalesSection.querySelectorAll(".discount-tag");
    discountTags.forEach((tag) => {
      tag.classList.add("animate__animated", "animate__fadeIn");
      tag.style.animationDuration = "1s";
    });

    // Product Card Hover Effects
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.transition = "transform 0.3s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });

    // View All Button
    const viewAllBtn = flashSalesSection.querySelector(".view-all-btn");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", () => {
        console.log("Navigating to all flash sales products");
      });

      // Add hover effect
      viewAllBtn.addEventListener("mouseenter", () => {
        viewAllBtn.style.transform = "translateY(-2px)";
        viewAllBtn.style.transition = "all 0.3s ease";
      });

      viewAllBtn.addEventListener("mouseleave", () => {
        viewAllBtn.style.transform = "translateY(0)";
      });
    }

    // Flash Sales Timer Update
    function updateFlashSalesTimer() {
      const timerUnits = flashSalesSection.querySelectorAll(".timer-unit");
      timerUnits.forEach((unit) => {
        const valueEl = unit.querySelector(".unit-value");
        if (valueEl) {
          // Add pulse animation when value changes
          valueEl.classList.add("animate__animated", "animate__pulse");
          valueEl.addEventListener(
            "animationend",
            () => {
              valueEl.classList.remove("animate__animated", "animate__pulse");
            },
            { once: true }
          );
        }
      });
    }

    // Update timer display every second
    setInterval(updateFlashSalesTimer, 1000);
  }

  // Best Selling Products Section
  const bestSellingSection = document.querySelector(".best-selling");
  if (bestSellingSection) {
    initializeTooltips(bestSellingSection);
    initializeWishlist(bestSellingSection);
    initializeQuickView(bestSellingSection);
    initializeAddToCart(bestSellingSection);
  }

  // Product Display Section
  const productDisplaySection = document.querySelector(".product-display");
  if (productDisplaySection) {
    initializeTooltips(productDisplaySection);
    initializeWishlist(productDisplaySection);
    initializeQuickView(productDisplaySection);
    initializeAddToCart(productDisplaySection);

    // Navigation Arrows
    const prevBtn = productDisplaySection.querySelector(".nav-arrow.prev");
    const nextBtn = productDisplaySection.querySelector(".nav-arrow.next");
    const productGrid = productDisplaySection.querySelector(".product-grid");
    const productCards =
      productDisplaySection.querySelectorAll(".product-card");

    if (prevBtn && nextBtn && productGrid) {
      let currentPage = 0;
      const productsPerPage =
        window.innerWidth >= 1200
          ? 4
          : window.innerWidth >= 992
          ? 3
          : window.innerWidth >= 768
          ? 2
          : 1;
      const totalPages = Math.ceil(productCards.length / productsPerPage);

      function updateProductNavigation() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= totalPages - 1;

        // Update grid transform
        productGrid.style.transform = `translateX(-${
          currentPage * (100 / productsPerPage)
        }%)`;
        productGrid.style.transition = "transform 0.3s ease";
      }

      prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          updateProductNavigation();
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
          currentPage++;
          updateProductNavigation();
        }
      });

      // Initialize navigation
      updateProductNavigation();

      // Update on window resize
      window.addEventListener("resize", () => {
        const newProductsPerPage =
          window.innerWidth >= 1200
            ? 4
            : window.innerWidth >= 992
            ? 3
            : window.innerWidth >= 768
            ? 2
            : 1;
        if (productsPerPage !== newProductsPerPage) {
          currentPage = 0;
          updateProductNavigation();
        }
      });
    }

    // Color Selection
    const colorDots = productDisplaySection.querySelectorAll(".color-dot");
    colorDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        // Remove active class from all dots in the same product card
        const productCard = this.closest(".product-card");
        productCard.querySelectorAll(".color-dot").forEach((d) => {
          d.classList.remove("active");
        });

        // Add active class to clicked dot
        this.classList.add("active");

        // Add animation
        this.style.animation = "popScale 0.3s ease-out";
        this.addEventListener(
          "animationend",
          () => {
            this.style.animation = "";
          },
          { once: true }
        );
      });
    });

    // View All Products Button
    const viewAllBtn = productDisplaySection.querySelector(".view-all-btn");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", () => {
        console.log("Navigating to all products page");
      });
    }
  }

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

  // Category Browsing Navigation
  const categoryContainer = document.querySelector(".categories-container");
  const categoryWrapper = document.querySelector(".categories-wrapper");
  const categoryPrevBtn = document.querySelector(
    ".category-browse .nav-arrow.prev"
  );
  const categoryNextBtn = document.querySelector(
    ".category-browse .nav-arrow.next"
  );
  const categoryCards = document.querySelectorAll(".category-card");

  if (
    categoryContainer &&
    categoryWrapper &&
    categoryPrevBtn &&
    categoryNextBtn
  ) {
    let currentCategoryScroll = 0;
    const cardWidth = 224; // card width (200px) + gap (24px)
    const visibleCards = Math.floor(categoryContainer.offsetWidth / cardWidth);
    const maxScroll = (categoryCards.length - visibleCards) * cardWidth;

    function updateCategoryNavigation() {
      categoryPrevBtn.disabled = currentCategoryScroll <= 0;
      categoryNextBtn.disabled = currentCategoryScroll >= maxScroll;
    }

    categoryPrevBtn.addEventListener("click", () => {
      currentCategoryScroll = Math.max(currentCategoryScroll - cardWidth, 0);
      categoryWrapper.style.transform = `translateX(-${currentCategoryScroll}px)`;
      updateCategoryNavigation();
    });

    categoryNextBtn.addEventListener("click", () => {
      currentCategoryScroll = Math.min(
        currentCategoryScroll + cardWidth,
        maxScroll
      );
      categoryWrapper.style.transform = `translateX(-${currentCategoryScroll}px)`;
      updateCategoryNavigation();
    });

    // Category Card Click Handler
    categoryCards.forEach((card) => {
      card.addEventListener("click", () => {
        // Remove active class from all cards
        categoryCards.forEach((c) => c.classList.remove("active"));
        // Add active class to clicked card
        card.classList.add("active");

        // Get category name for navigation
        const categoryName = card.querySelector(".category-name").textContent;
        console.log(`Navigating to ${categoryName} category`);
      });
    });

    // Initialize navigation state
    updateCategoryNavigation();

    // Update navigation on window resize
    window.addEventListener("resize", () => {
      const newVisibleCards = Math.floor(
        categoryContainer.offsetWidth / cardWidth
      );
      const newMaxScroll = (categoryCards.length - newVisibleCards) * cardWidth;
      currentCategoryScroll = Math.min(currentCategoryScroll, newMaxScroll);
      categoryWrapper.style.transform = `translateX(-${currentCategoryScroll}px)`;
      updateCategoryNavigation();
    });
  }

  // Featured Products Section
  const featuredSection = document.querySelector(".featured-products");
  if (featuredSection) {
    // Initialize hover effects for shop now links
    const shopNowLinks = featuredSection.querySelectorAll(".shop-now-link");
    shopNowLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const arrow = link.querySelector("i");
        arrow.style.transform = "translateX(5px)";
      });

      link.addEventListener("mouseleave", () => {
        const arrow = link.querySelector("i");
        arrow.style.transform = "translateX(0)";
      });
    });

    // Add loading animation for images
    const productImages = featuredSection.querySelectorAll(".product-img");
    productImages.forEach((img) => {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.5s ease";

      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
    });

    // Add intersection observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const featuredCards = featuredSection.querySelectorAll(".featured-card");
    featuredCards.forEach((card) => {
      card.style.transform = "translateY(20px)";
      card.style.opacity = "0";
      card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      observer.observe(card);
    });

    // Add click handlers for cards
    featuredCards.forEach((card) => {
      card.addEventListener("click", () => {
        const productName = card.querySelector("h3").textContent;
        console.log(`Navigating to ${productName} details page`);
      });
    });
  }

  // Main Footer Functionality
  const mainFooter = document.querySelector(".main-footer");
  if (mainFooter) {
    // Email Subscription Form
    const subscribeForm = mainFooter.querySelector(".subscribe-form");
    if (subscribeForm) {
      subscribeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
          // Simulate subscription success
          console.log("Subscribing email:", email);
          emailInput.value = "";

          // Show success message
          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-2";
          successMessage.textContent = "Thank you for subscribing!";
          this.appendChild(successMessage);

          // Remove success message after 3 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }
      });
    }

    // Email validation helper function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Social Media Links
    const socialLinks = mainFooter.querySelectorAll(".social-links a");
    socialLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const platform = this.getAttribute("href").replace("#", "");
        console.log(`Opening ${platform} profile`);
      });
    });

    // App Store Buttons
    const appButtons = mainFooter.querySelectorAll(".app-btn");
    appButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const store = this.getAttribute("href").replace("#", "");
        console.log(`Opening ${store} download page`);
      });
    });

    // Footer Links Hover Effect
    const footerLinks = mainFooter.querySelectorAll(".footer-links a");
    footerLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.style.paddingLeft = "5px";
        this.style.transition = "padding-left 0.3s ease";
      });

      link.addEventListener("mouseleave", function () {
        this.style.paddingLeft = "0";
      });
    });

    // QR Code Loading Animation
    const qrCode = mainFooter.querySelector(".qr-code img");
    if (qrCode) {
      qrCode.style.opacity = "0";
      qrCode.style.transition = "opacity 0.5s ease";

      qrCode.addEventListener("load", function () {
        this.style.opacity = "1";
      });
    }

    // Smooth Scroll for Footer Links
    mainFooter.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
});
